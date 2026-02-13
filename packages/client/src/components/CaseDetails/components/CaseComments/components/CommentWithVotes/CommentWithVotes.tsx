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

      // Optimistically update the cache
      if (previousVotes) {
        const currentUserVote = previousVotes.userVote;
        let newVotes = { ...previousVotes };

        if (currentUserVote === variables.voteType) {
          // Toggle off: remove vote
          if (variables.voteType === 'UP') {
            newVotes.upVotes = {
              count: Math.max(0, previousVotes.upVotes.count - 1),
              voters: previousVotes.upVotes.voters.filter((v) => v.id !== previousVotes.upVotes.voters[0]?.id),
            };
          } else {
            newVotes.downVotes = {
              count: Math.max(0, previousVotes.downVotes.count - 1),
              voters: previousVotes.downVotes.voters.filter((v) => v.id !== previousVotes.downVotes.voters[0]?.id),
            };
          }
          newVotes.userVote = null;
        } else if (currentUserVote && currentUserVote !== variables.voteType) {
          // Change vote: remove from old, add to new
          if (currentUserVote === 'UP') {
            newVotes.upVotes = {
              count: Math.max(0, previousVotes.upVotes.count - 1),
              voters: previousVotes.upVotes.voters.filter((v) => v.id !== previousVotes.upVotes.voters[0]?.id),
            };
            newVotes.downVotes = {
              count: previousVotes.downVotes.count + 1,
              voters: previousVotes.downVotes.voters,
            };
          } else {
            newVotes.downVotes = {
              count: Math.max(0, previousVotes.downVotes.count - 1),
              voters: previousVotes.downVotes.voters.filter((v) => v.id !== previousVotes.downVotes.voters[0]?.id),
            };
            newVotes.upVotes = {
              count: previousVotes.upVotes.count + 1,
              voters: previousVotes.upVotes.voters,
            };
          }
          newVotes.userVote = variables.voteType;
        } else {
          // Add new vote
          if (variables.voteType === 'UP') {
            newVotes.upVotes = {
              count: previousVotes.upVotes.count + 1,
              voters: previousVotes.upVotes.voters,
            };
          } else {
            newVotes.downVotes = {
              count: previousVotes.downVotes.count + 1,
              voters: previousVotes.downVotes.voters,
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
      // Refetch to sync with server
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
