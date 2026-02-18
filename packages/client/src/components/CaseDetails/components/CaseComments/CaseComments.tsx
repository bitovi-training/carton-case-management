import { useState } from 'react';
import type { FormEvent } from 'react';
import { trpc } from '@/lib/trpc';
import { Textarea } from '@/components/obra';
import { ReactionStatistics } from '@/components/common/ReactionStatistics';
import type { CaseCommentsProps } from './types';

export function CaseComments({ caseData }: CaseCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const utils = trpc.useUtils();

  // Fetch first user to use as current user (in production this would come from auth)
  const { data: users } = trpc.user.list.useQuery();
  const currentUser = users?.[0];

  const createCommentMutation = trpc.comment.create.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.case.getById.cancel({ id: caseData.id });

      // Snapshot previous value
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically add comment to cache
      if (previousCase && currentUser) {
        const optimisticComment = {
          id: `temp-${Date.now()}`,
          content: variables.content,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          caseId: caseData.id,
          authorId: currentUser.id,
          author: {
            id: currentUser.id,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
          },
          upVoteCount: 0,
          downVoteCount: 0,
          upVoters: [],
          downVoters: [],
          userVote: null,
        };

        utils.case.getById.setData(
          { id: caseData.id },
          {
            ...previousCase,
            comments: [optimisticComment, ...(previousCase.comments || [])],
          }
        );
      }

      return { previousCase };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousCase) {
        utils.case.getById.setData({ id: caseData.id }, context.previousCase);
      }
    },
    onSuccess: () => {
      // Clear input on success
      setNewComment('');
    },
    onSettled: () => {
      // Refetch to sync with server
      utils.case.getById.invalidate({ id: caseData.id });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    createCommentMutation.mutate({
      caseId: caseData.id,
      content: newComment.trim(),
    });
  };

  const voteMutation = trpc.commentVote.vote.useMutation({
    onMutate: async (variables) => {
      await utils.case.getById.cancel({ id: caseData.id });
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments?.map((comment) => {
          if (comment.id === variables.commentId) {
            const currentVote = comment.userVote;
            const newVoteType = variables.voteType;

            let upVoteCount = comment.upVoteCount || 0;
            let downVoteCount = comment.downVoteCount || 0;
            let upVoters = [...(comment.upVoters || [])];
            let downVoters = [...(comment.downVoters || [])];
            const currentUserInfo = { id: currentUser.id, firstName: currentUser.firstName, lastName: currentUser.lastName };

            // Handle vote changes
            if (currentVote === newVoteType) {
              // Toggle off - remove vote
              if (newVoteType === 'UP') {
                upVoteCount--;
                upVoters = upVoters.filter((v) => v.id !== currentUser.id);
              } else {
                downVoteCount--;
                downVoters = downVoters.filter((v) => v.id !== currentUser.id);
              }
              return { ...comment, upVoteCount, downVoteCount, upVoters, downVoters, userVote: null };
            } else if (currentVote) {
              // Switch vote
              if (currentVote === 'UP') {
                upVoteCount--;
                upVoters = upVoters.filter((v) => v.id !== currentUser.id);
                downVoteCount++;
                downVoters = [currentUserInfo, ...downVoters];
              } else {
                downVoteCount--;
                downVoters = downVoters.filter((v) => v.id !== currentUser.id);
                upVoteCount++;
                upVoters = [currentUserInfo, ...upVoters];
              }
              return { ...comment, upVoteCount, downVoteCount, upVoters, downVoters, userVote: newVoteType };
            } else {
              // Add new vote
              if (newVoteType === 'UP') {
                upVoteCount++;
                upVoters = [currentUserInfo, ...upVoters];
              } else {
                downVoteCount++;
                downVoters = [currentUserInfo, ...downVoters];
              }
              return { ...comment, upVoteCount, downVoteCount, upVoters, downVoters, userVote: newVoteType };
            }
          }
          return comment;
        });

        utils.case.getById.setData({ id: caseData.id }, { ...previousCase, comments: updatedComments });
      }

      return { previousCase };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousCase) {
        utils.case.getById.setData({ id: caseData.id }, context.previousCase);
      }
    },
    onSettled: () => {
      utils.case.getById.invalidate({ id: caseData.id });
    },
  });

  const handleVote = (commentId: string, voteType: 'UP' | 'DOWN') => {
    voteMutation.mutate({ commentId, voteType });
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-1 lg:min-h-0">
      <h2 className="text-base font-semibold">Comments</h2>
      <form onSubmit={handleSubmit}>
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="min-h-[80px] resize-none"
          placeholder="Add a comment..."
          disabled={createCommentMutation.isPending}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
      </form>
      <div className="flex flex-col gap-4 md:overflow-y-auto md:flex-1 md:min-h-0">
        {caseData.comments && caseData.comments.length > 0 ? (
          caseData.comments.map((comment) => (
            <div key={comment.id} className="flex flex-col gap-2 py-2">
              <div className="flex gap-2 items-center">
                <div className="w-10 flex items-center justify-center text-sm font-semibold text-gray-900">
                  {comment.author.firstName[0]}{comment.author.lastName[0]}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{comment.author.firstName} {comment.author.lastName}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700">{comment.content}</p>
              <ReactionStatistics
                userVote={comment.userVote === 'UP' ? 'up' : comment.userVote === 'DOWN' ? 'down' : 'none'}
                upvotes={comment.upVoteCount || 0}
                upvoters={comment.upVoters?.map((v) => `${v.firstName} ${v.lastName}`)}
                downvotes={comment.downVoteCount || 0}
                downvoters={comment.downVoters?.map((v) => `${v.firstName} ${v.lastName}`)}
                onUpvote={() => handleVote(comment.id, 'UP')}
                onDownvote={() => handleVote(comment.id, 'DOWN')}
              />
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
}
