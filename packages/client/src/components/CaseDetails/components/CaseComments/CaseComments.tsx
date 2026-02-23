import { useState } from 'react';
import type { FormEvent } from 'react';
import { trpc } from '@/lib/trpc';
import { Textarea } from '@/components/obra';
import { VoteButton } from '@/components/common/VoteButton';
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

  const toggleVoteMutation = trpc.comment.toggleVote.useMutation({
    onMutate: async ({ commentId, voteType }) => {
      // Cancel outgoing refetches
      await utils.case.getById.cancel({ id: caseData.id });

      // Snapshot previous value
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically update vote
      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments?.map((comment) => {
          if (comment.id !== commentId) return comment;

          const votes = comment.votes || [];
          const existingVote = votes.find((v) => v.userId === currentUser.id);

          if (existingVote && existingVote.voteType === voteType) {
            // Remove vote (toggle off)
            return {
              ...comment,
              votes: votes.filter((v) => v.userId !== currentUser.id),
            };
          } else if (existingVote && existingVote.voteType !== voteType) {
            // Switch vote
            return {
              ...comment,
              votes: votes.map((v) =>
                v.userId === currentUser.id ? { ...v, voteType } : v
              ),
            };
          } else {
            // Add new vote
            return {
              ...comment,
              votes: [
                ...votes,
                {
                  id: `temp-${Date.now()}`,
                  voteType,
                  userId: currentUser.id,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                  commentId: comment.id,
                  user: {
                    id: currentUser.id,
                    firstName: currentUser.firstName,
                    lastName: currentUser.lastName,
                  },
                },
              ],
            };
          }
        });

        utils.case.getById.setData(
          { id: caseData.id },
          { ...previousCase, comments: updatedComments }
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

  const handleVote = (commentId: string, voteType: 'UP' | 'DOWN') => {
    if (!currentUser) return;
    toggleVoteMutation.mutate({ commentId, voteType });
  };

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-4">
        {caseData.comments && caseData.comments.length > 0 ? (
          caseData.comments.map((comment) => {
            const votes = comment.votes || [];
            const upvotes = votes.filter((v) => v.voteType === 'UP');
            const downvotes = votes.filter((v) => v.voteType === 'DOWN');
            const currentUserVote = currentUser
              ? votes.find((v) => v.userId === currentUser.id)
              : null;
            const isUpvoteActive = currentUserVote?.voteType === 'UP';
            const isDownvoteActive = currentUserVote?.voteType === 'DOWN';

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
                <div className="inline-flex items-center gap-2">
                  <VoteButton
                    type="up"
                    active={isUpvoteActive}
                    showCount={true}
                    count={upvotes.length}
                    voters={upvotes.map((v) => `${v.user.firstName} ${v.user.lastName}`)}
                    onClick={() => handleVote(comment.id, 'UP')}
                  />
                  <VoteButton
                    type="down"
                    active={isDownvoteActive}
                    showCount={true}
                    count={downvotes.length}
                    voters={downvotes.map((v) => `${v.user.firstName} ${v.user.lastName}`)}
                    onClick={() => handleVote(comment.id, 'DOWN')}
                  />
                </div>
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
