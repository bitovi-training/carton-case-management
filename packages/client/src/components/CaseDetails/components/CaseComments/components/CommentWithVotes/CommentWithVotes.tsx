import { trpc } from '@/lib/trpc';
import { VoteButton } from '@/components/common/VoteButton';
import type { CommentWithVotesProps } from './types';

export function CommentWithVotes({ comment }: CommentWithVotesProps) {
  const utils = trpc.useUtils();
  const { data: votesData } = trpc.comment.getVotes.useQuery({ commentId: comment.id });
  
  const voteMutation = trpc.comment.vote.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.comment.getVotes.cancel({ commentId: comment.id });

      // Snapshot the previous value
      const previousVotes = utils.comment.getVotes.getData({ commentId: comment.id });

      // Optimistically update the cache (counts only, voters will be synced on refetch)
      if (previousVotes) {
        const currentUserVote = previousVotes.userVote;
        let newVotes = { ...previousVotes };

        if (currentUserVote === variables.voteType) {
          // Toggle off: remove vote
          if (variables.voteType === 'UP') {
            newVotes.upVotes = {
              ...previousVotes.upVotes,
              count: Math.max(0, previousVotes.upVotes.count - 1),
            };
          } else {
            newVotes.downVotes = {
              ...previousVotes.downVotes,
              count: Math.max(0, previousVotes.downVotes.count - 1),
            };
          }
          newVotes.userVote = null;
        } else if (currentUserVote && currentUserVote !== variables.voteType) {
          // Change vote: decrement old, increment new
          if (currentUserVote === 'UP') {
            newVotes.upVotes = {
              ...previousVotes.upVotes,
              count: Math.max(0, previousVotes.upVotes.count - 1),
            };
            newVotes.downVotes = {
              ...previousVotes.downVotes,
              count: previousVotes.downVotes.count + 1,
            };
          } else {
            newVotes.downVotes = {
              ...previousVotes.downVotes,
              count: Math.max(0, previousVotes.downVotes.count - 1),
            };
            newVotes.upVotes = {
              ...previousVotes.upVotes,
              count: previousVotes.upVotes.count + 1,
            };
          }
          newVotes.userVote = variables.voteType;
        } else {
          // Add new vote
          if (variables.voteType === 'UP') {
            newVotes.upVotes = {
              ...previousVotes.upVotes,
              count: previousVotes.upVotes.count + 1,
            };
          } else {
            newVotes.downVotes = {
              ...previousVotes.downVotes,
              count: previousVotes.downVotes.count + 1,
            };
          }
          newVotes.userVote = variables.voteType;
        }

        utils.comment.getVotes.setData({ commentId: comment.id }, newVotes);
      }

      return { previousVotes };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        utils.comment.getVotes.setData({ commentId: comment.id }, context.previousVotes);
      }
    },
    onSettled: () => {
      // Refetch to sync with server (including updated voters list)
      utils.comment.getVotes.invalidate({ commentId: comment.id });
    },
  });

  const handleVote = (voteType: 'UP' | 'DOWN') => {
    voteMutation.mutate({
      commentId: comment.id,
      voteType,
    });
  };

  const upVoteActive = votesData?.userVote === 'UP';
  const downVoteActive = votesData?.userVote === 'DOWN';
  const upVoteCount = votesData?.upVotes.count ?? 0;
  const downVoteCount = votesData?.downVotes.count ?? 0;

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-900">
          {comment.author.firstName[0]}{comment.author.lastName[0]}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">
            {comment.author.firstName} {comment.author.lastName}
          </p>
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
        <VoteButton
          type="up"
          active={upVoteActive}
          count={upVoteCount}
          showCount={upVoteCount > 0}
          voters={votesData?.upVotes.voters.map((v) => v.name) ?? []}
          onClick={() => handleVote('UP')}
        />
        <VoteButton
          type="down"
          active={downVoteActive}
          count={downVoteCount}
          showCount={downVoteCount > 0}
          voters={votesData?.downVotes.voters.map((v) => v.name) ?? []}
          onClick={() => handleVote('DOWN')}
        />
      </div>
    </div>
  );
}
