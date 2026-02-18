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
          votes: [],
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

  const voteMutation = trpc.comment.vote.useMutation({
    onMutate: async (variables) => {
      await utils.case.getById.cancel({ id: caseData.id });
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically update vote
      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments?.map((comment) => {
          if (comment.id === variables.commentId) {
            const existingVoteIndex = comment.votes.findIndex(
              (v) => v.userId === currentUser.id
            );
            
            let updatedVotes = [...comment.votes];
            if (existingVoteIndex >= 0) {
              // Update existing vote
              updatedVotes[existingVoteIndex] = {
                ...updatedVotes[existingVoteIndex],
                voteType: variables.voteType,
              };
            } else {
              // Add new vote
              updatedVotes.push({
                id: `temp-vote-${Date.now()}`,
                commentId: variables.commentId,
                userId: currentUser.id,
                voteType: variables.voteType,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                user: {
                  id: currentUser.id,
                  firstName: currentUser.firstName,
                  lastName: currentUser.lastName,
                },
              });
            }
            
            return { ...comment, votes: updatedVotes };
          }
          return comment;
        });

        utils.case.getById.setData(
          { id: caseData.id },
          { ...previousCase, comments: updatedComments }
        );
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

  const removeVoteMutation = trpc.comment.removeVote.useMutation({
    onMutate: async (variables) => {
      await utils.case.getById.cancel({ id: caseData.id });
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically remove vote
      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments?.map((comment) => {
          if (comment.id === variables.commentId) {
            const updatedVotes = comment.votes.filter(
              (v) => v.userId !== currentUser.id
            );
            return { ...comment, votes: updatedVotes };
          }
          return comment;
        });

        utils.case.getById.setData(
          { id: caseData.id },
          { ...previousCase, comments: updatedComments }
        );
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    createCommentMutation.mutate({
      caseId: caseData.id,
      content: newComment.trim(),
    });
  };

  const handleVote = (commentId: string, currentVote: 'none' | 'up' | 'down', newVote: 'up' | 'down') => {
    if (currentVote === newVote) {
      // Clicking the same vote button removes the vote
      removeVoteMutation.mutate({ commentId });
    } else {
      // Vote or change vote
      voteMutation.mutate({
        commentId,
        voteType: newVote === 'up' ? 'UP' : 'DOWN',
      });
    }
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
          caseData.comments.map((comment) => {
            const userVote = currentUser 
              ? comment.votes?.find((v) => v.userId === currentUser.id)?.voteType 
              : undefined;
            const upvotes = comment.votes?.filter((v) => v.voteType === 'UP').length || 0;
            const downvotes = comment.votes?.filter((v) => v.voteType === 'DOWN').length || 0;
            const upvoters = comment.votes
              ?.filter((v) => v.voteType === 'UP')
              .map((v) => `${v.user.firstName} ${v.user.lastName}`);
            const downvoters = comment.votes
              ?.filter((v) => v.voteType === 'DOWN')
              .map((v) => `${v.user.firstName} ${v.user.lastName}`);

            return (
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
                  userVote={
                    userVote === 'UP' ? 'up' : userVote === 'DOWN' ? 'down' : 'none'
                  }
                  upvotes={upvotes}
                  downvotes={downvotes}
                  upvoters={upvoters}
                  downvoters={downvoters}
                  onUpvote={() => handleVote(
                    comment.id, 
                    userVote === 'UP' ? 'up' : userVote === 'DOWN' ? 'down' : 'none',
                    'up'
                  )}
                  onDownvote={() => handleVote(
                    comment.id,
                    userVote === 'UP' ? 'up' : userVote === 'DOWN' ? 'down' : 'none',
                    'down'
                  )}
                />
              </div>
            );
          })
        ) : (
          <div className="text-sm text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
}
