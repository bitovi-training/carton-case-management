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

  const voteMutation = trpc.commentVote.vote.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.case.getById.cancel({ id: caseData.id });

      // Snapshot previous value
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically update vote in cache
      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments?.map((comment) => {
          if (comment.id !== variables.commentId) return comment;

          const votes = comment.votes || [];
          const existingVoteIndex = votes.findIndex((v) => v.userId === currentUser.id);

          let newVotes = [...votes];

          if (variables.voteType === null) {
            // Remove vote
            newVotes = votes.filter((v) => v.userId !== currentUser.id);
          } else if (existingVoteIndex >= 0) {
            const existingVote = votes[existingVoteIndex];
            if (existingVote.voteType === variables.voteType) {
              // Same vote type - remove it
              newVotes = votes.filter((v) => v.userId !== currentUser.id);
            } else {
              // Different vote type - update it
              newVotes[existingVoteIndex] = {
                ...existingVote,
                voteType: variables.voteType,
              };
            }
          } else {
            // Add new vote
            newVotes.push({
              id: `temp-${Date.now()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              commentId: variables.commentId,
              voteType: variables.voteType,
              userId: currentUser.id,
              user: {
                id: currentUser.id,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName,
              },
            });
          }

          return {
            ...comment,
            votes: newVotes,
          };
        });

        utils.case.getById.setData(
          { id: caseData.id },
          {
            ...previousCase,
            comments: updatedComments,
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

  const handleVote = (commentId: string, voteType: 'UP' | 'DOWN' | null) => {
    voteMutation.mutate({
      commentId,
      voteType,
    });
  };

  const getCommentVoteData = (comment: NonNullable<CaseCommentsProps['caseData']['comments']>[number]) => {
    if (!comment.votes) {
      return {
        userVote: 'none' as const,
        upvotes: 0,
        downvotes: 0,
        upvoters: [] as string[],
        downvoters: [] as string[],
      };
    }

    const upvotes = comment.votes.filter((v) => v.voteType === 'UP');
    const downvotes = comment.votes.filter((v) => v.voteType === 'DOWN');
    const userVote = currentUser
      ? comment.votes.find((v) => v.userId === currentUser.id)?.voteType
      : undefined;

    return {
      userVote: (userVote === 'UP' ? 'up' : userVote === 'DOWN' ? 'down' : 'none') as 'up' | 'down' | 'none',
      upvotes: upvotes.length,
      downvotes: downvotes.length,
      upvoters: upvotes.map((v) => `${v.user.firstName} ${v.user.lastName}`),
      downvoters: downvotes.map((v) => `${v.user.firstName} ${v.user.lastName}`),
    };
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
            const voteData = getCommentVoteData(comment);
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
                  userVote={voteData.userVote}
                  upvotes={voteData.upvotes}
                  downvotes={voteData.downvotes}
                  upvoters={voteData.upvoters}
                  downvoters={voteData.downvoters}
                  onUpvote={() => {
                    const newVote = voteData.userVote === 'up' ? null : 'UP';
                    handleVote(comment.id, newVote);
                  }}
                  onDownvote={() => {
                    const newVote = voteData.userVote === 'down' ? null : 'DOWN';
                    handleVote(comment.id, newVote);
                  }}
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
