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

  // Fetch vote data for all comments
  const commentIds = caseData.comments?.map((c) => c.id) || [];
  const { data: votesData } = trpc.vote.getBatchCommentVotes.useQuery(
    { commentIds },
    { enabled: commentIds.length > 0 }
  );

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
      utils.vote.getBatchCommentVotes.invalidate({ commentIds });
    },
  });

  const voteMutation = trpc.vote.vote.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.vote.getBatchCommentVotes.cancel({ commentIds });

      // Snapshot previous value
      const previousVotes = utils.vote.getBatchCommentVotes.getData({ commentIds });

      // Optimistically update vote counts
      if (previousVotes && votesData) {
        const commentVotes = previousVotes[variables.commentId];
        if (commentVotes) {
          const newVotes = { ...previousVotes };
          const isToggleOff = commentVotes.userVote === (variables.voteType === 'UP' ? 'up' : 'down');
          
          if (isToggleOff) {
            // Toggling off - remove vote
            newVotes[variables.commentId] = {
              ...commentVotes,
              userVote: 'none',
              upvotes: variables.voteType === 'UP' ? commentVotes.upvotes - 1 : commentVotes.upvotes,
              downvotes: variables.voteType === 'DOWN' ? commentVotes.downvotes - 1 : commentVotes.downvotes,
            };
          } else {
            // Switching or adding vote
            const wasUp = commentVotes.userVote === 'up';
            const wasDown = commentVotes.userVote === 'down';
            const goingUp = variables.voteType === 'UP';
            
            newVotes[variables.commentId] = {
              ...commentVotes,
              userVote: goingUp ? 'up' : 'down',
              upvotes: goingUp
                ? (wasDown ? commentVotes.upvotes + 1 : commentVotes.upvotes + 1)
                : (wasUp ? commentVotes.upvotes - 1 : commentVotes.upvotes),
              downvotes: goingUp
                ? (wasDown ? commentVotes.downvotes - 1 : commentVotes.downvotes)
                : (wasUp ? commentVotes.downvotes + 1 : commentVotes.downvotes + 1),
            };
          }
          
          utils.vote.getBatchCommentVotes.setData({ commentIds }, newVotes);
        }
      }

      return { previousVotes };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        utils.vote.getBatchCommentVotes.setData({ commentIds }, context.previousVotes);
      }
    },
    onSettled: () => {
      // Refetch to sync with server
      utils.vote.getBatchCommentVotes.invalidate({ commentIds });
    },
  });

  const handleVote = (commentId: string, voteType: 'UP' | 'DOWN') => {
    if (!currentUser) return;
    voteMutation.mutate({ commentId, voteType });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    createCommentMutation.mutate({
      caseId: caseData.id,
      content: newComment.trim(),
    });
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
            const votes = votesData?.[comment.id];
            return (
              <div key={comment.id} className="flex flex-col gap-2 py-2">
                <div className="flex gap-2 items-center">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-900">
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
                {votes && (
                  <ReactionStatistics
                    userVote={votes.userVote}
                    upvotes={votes.upvotes}
                    upvoters={votes.upvoters}
                    downvotes={votes.downvotes}
                    downvoters={votes.downvoters}
                    onUpvote={() => handleVote(comment.id, 'UP')}
                    onDownvote={() => handleVote(comment.id, 'DOWN')}
                  />
                )}
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
