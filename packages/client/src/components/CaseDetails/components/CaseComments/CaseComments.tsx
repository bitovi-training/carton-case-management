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

  const voteToggleMutation = trpc.commentVote.toggle.useMutation({
    onSuccess: () => {
      // Refetch case data to update vote counts
      utils.case.getById.invalidate({ id: caseData.id });
    },
  });

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    createCommentMutation.mutate({
      caseId: caseData.id,
      content: newComment.trim(),
    });
  };

  const handleVoteToggle = (commentId: string, voteType: 'UP' | 'DOWN') => {
    voteToggleMutation.mutate({
      commentId,
      voteType,
    });
  };

  const getVoteStats = (comment: NonNullable<typeof caseData.comments>[number]) => {
    if (!comment.votes || comment.votes.length === 0) {
      return {
        userVote: 'none' as const,
        upvotes: 0,
        downvotes: 0,
        upvoters: [],
        downvoters: [],
      };
    }

    const upvotes = comment.votes.filter((v: any) => v.voteType === 'UP');
    const downvotes = comment.votes.filter((v: any) => v.voteType === 'DOWN');
    const userVote = currentUser
      ? comment.votes.find((v: any) => v.userId === currentUser.id)
      : null;

    return {
      userVote: (userVote ? (userVote.voteType === 'UP' ? 'up' : 'down') : 'none') as 'none' | 'up' | 'down',
      upvotes: upvotes.length,
      downvotes: downvotes.length,
      upvoters: upvotes.map((v: any) => `${v.user.firstName} ${v.user.lastName}`),
      downvoters: downvotes.map((v: any) => `${v.user.firstName} ${v.user.lastName}`),
    };
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
            const voteStats = getVoteStats(comment);
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
                  userVote={voteStats.userVote}
                  upvotes={voteStats.upvotes}
                  downvotes={voteStats.downvotes}
                  upvoters={voteStats.upvoters}
                  downvoters={voteStats.downvoters}
                  onUpvote={() => handleVoteToggle(comment.id, 'UP')}
                  onDownvote={() => handleVoteToggle(comment.id, 'DOWN')}
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
