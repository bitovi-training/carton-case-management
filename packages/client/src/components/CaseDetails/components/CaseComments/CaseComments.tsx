import { useState } from 'react';
import type { FormEvent } from 'react';
import { trpc } from '@/lib/trpc';
import { Textarea } from '@/components/obra';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CaseCommentsProps } from './types';

export function CaseComments({ caseData }: CaseCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [hoveredVote, setHoveredVote] = useState<{ commentId: string; type: 'up' | 'down' } | null>(null);
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
          upvoteCount: 0,
          downvoteCount: 0,
          userVoteType: null,
          upvotes: [],
          downvotes: [],
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

  const voteToggleMutation = trpc.vote.toggle.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.case.getById.cancel({ id: caseData.id });

      // Snapshot previous value
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      // Optimistically update vote in cache
      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments.map((comment) => {
          if (comment.id !== variables.commentId) return comment;

          const currentUserVote = comment.userVoteType;
          const newVoteType = variables.voteType;

          let upvoteCount = comment.upvoteCount;
          let downvoteCount = comment.downvoteCount;
          let userVoteType = comment.userVoteType;
          let upvotes = [...comment.upvotes];
          let downvotes = [...comment.downvotes];

          // Remove user from current vote lists
          upvotes = upvotes.filter((v) => v.userId !== currentUser.id);
          downvotes = downvotes.filter((v) => v.userId !== currentUser.id);

          if (currentUserVote === newVoteType) {
            // Toggle off
            userVoteType = null;
            if (newVoteType === 'UPVOTE') {
              upvoteCount = Math.max(0, upvoteCount - 1);
            } else {
              downvoteCount = Math.max(0, downvoteCount - 1);
            }
          } else {
            // Add or switch vote
            userVoteType = newVoteType;
            const userName = `${currentUser.firstName} ${currentUser.lastName}`;

            if (currentUserVote === 'UPVOTE') {
              upvoteCount = Math.max(0, upvoteCount - 1);
            } else if (currentUserVote === 'DOWNVOTE') {
              downvoteCount = Math.max(0, downvoteCount - 1);
            }

            if (newVoteType === 'UPVOTE') {
              upvoteCount += 1;
              upvotes.push({ userId: currentUser.id, userName });
            } else {
              downvoteCount += 1;
              downvotes.push({ userId: currentUser.id, userName });
            }
          }

          return {
            ...comment,
            upvoteCount,
            downvoteCount,
            userVoteType,
            upvotes,
            downvotes,
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

  const handleVote = (commentId: string, voteType: 'UPVOTE' | 'DOWNVOTE') => {
    if (!currentUser) return;
    voteToggleMutation.mutate({ commentId, voteType });
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
              <div className="flex gap-4 items-center">
                {/* Thumbs Up Button */}
                <div className="relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 text-sm transition-colors',
                      comment.userVoteType === 'UPVOTE'
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-blue-600'
                    )}
                    onClick={() => handleVote(comment.id, 'UPVOTE')}
                    onMouseEnter={() => comment.upvoteCount > 0 && setHoveredVote({ commentId: comment.id, type: 'up' })}
                    onMouseLeave={() => setHoveredVote(null)}
                    disabled={voteToggleMutation.isPending}
                  >
                    <ThumbsUp
                      className={cn(
                        'h-4 w-4',
                        comment.userVoteType === 'UPVOTE' && 'fill-current'
                      )}
                    />
                    {comment.upvoteCount > 0 && (
                      <span className="font-medium">{comment.upvoteCount}</span>
                    )}
                  </button>
                  {hoveredVote?.commentId === comment.id &&
                    hoveredVote.type === 'up' &&
                    comment.upvotes.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                        {comment.upvotes.slice(0, 4).map((v) => v.userName).join(', ')}
                        {comment.upvotes.length > 4 && ` + ${comment.upvotes.length - 4} others`}
                      </div>
                    )}
                </div>

                {/* Thumbs Down Button */}
                <div className="relative">
                  <button
                    type="button"
                    className={cn(
                      'flex items-center gap-1 text-sm transition-colors',
                      comment.userVoteType === 'DOWNVOTE'
                        ? 'text-red-600'
                        : 'text-gray-500 hover:text-red-600'
                    )}
                    onClick={() => handleVote(comment.id, 'DOWNVOTE')}
                    onMouseEnter={() => comment.downvoteCount > 0 && setHoveredVote({ commentId: comment.id, type: 'down' })}
                    onMouseLeave={() => setHoveredVote(null)}
                    disabled={voteToggleMutation.isPending}
                  >
                    <ThumbsDown
                      className={cn(
                        'h-4 w-4',
                        comment.userVoteType === 'DOWNVOTE' && 'fill-current'
                      )}
                    />
                    {comment.downvoteCount > 0 && (
                      <span className="font-medium">{comment.downvoteCount}</span>
                    )}
                  </button>
                  {hoveredVote?.commentId === comment.id &&
                    hoveredVote.type === 'down' &&
                    comment.downvotes.length > 0 && (
                      <div className="absolute bottom-full left-0 mb-2 z-10 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                        {comment.downvotes.slice(0, 4).map((v) => v.userName).join(', ')}
                        {comment.downvotes.length > 4 && ` + ${comment.downvotes.length - 4} others`}
                      </div>
                    )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
}
