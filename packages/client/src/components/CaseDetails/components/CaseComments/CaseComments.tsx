import { useState } from 'react';
import type { FormEvent } from 'react';
import { trpc } from '@/lib/trpc';
import { Textarea } from '@/components/obra';
import { CommentItem } from './CommentItem';
import type { CaseCommentsProps } from './types';

export function CaseComments({ caseData }: CaseCommentsProps) {
  const [newComment, setNewComment] = useState('');
  const [votingCommentId, setVotingCommentId] = useState<string | null>(null);
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
      setVotingCommentId(variables.commentId);
      await utils.case.getById.cancel({ id: caseData.id });
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments.map((comment) => {
          if (comment.id !== variables.commentId) return comment;

          // Remove existing vote by current user
          const filteredVotes = comment.votes.filter((v) => v.userId !== currentUser.id);

          // Add new vote
          const newVote = {
            id: `temp-${Date.now()}`,
            commentId: variables.commentId,
            userId: currentUser.id,
            voteType: variables.voteType,
            isAnonymous: variables.isAnonymous || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            user: {
              id: currentUser.id,
              firstName: currentUser.firstName,
              lastName: currentUser.lastName,
            },
          };

          return {
            ...comment,
            votes: [...filteredVotes, newVote],
          };
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
      setVotingCommentId(null);
      utils.case.getById.invalidate({ id: caseData.id });
    },
  });

  const unvoteMutation = trpc.commentVote.unvote.useMutation({
    onMutate: async (variables) => {
      setVotingCommentId(variables.commentId);
      await utils.case.getById.cancel({ id: caseData.id });
      const previousCase = utils.case.getById.getData({ id: caseData.id });

      if (previousCase && currentUser) {
        const updatedComments = previousCase.comments.map((comment) => {
          if (comment.id !== variables.commentId) return comment;

          return {
            ...comment,
            votes: comment.votes.filter((v) => v.userId !== currentUser.id),
          };
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
      setVotingCommentId(null);
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
    if (!currentUser) {
      // TODO: Show login prompt
      alert('Please log in to vote on comments');
      return;
    }

    if (voteType === null) {
      // Remove vote
      unvoteMutation.mutate({ commentId });
    } else {
      // Add or update vote
      voteMutation.mutate({
        commentId,
        voteType,
        isAnonymous: false,
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
          caseData.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              currentUserId={currentUser?.id || null}
              onVote={handleVote}
              isVoting={
                votingCommentId === comment.id ||
                voteMutation.isPending ||
                unvoteMutation.isPending
              }
            />
          ))
        ) : (
          <div className="text-sm text-gray-500">No comments yet</div>
        )}
      </div>
    </div>
  );
}
