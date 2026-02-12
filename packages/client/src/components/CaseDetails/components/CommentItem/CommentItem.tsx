import { trpc } from '@/lib/trpc';
import { VoteButton } from '@/components/common/VoteButton';
import type { CommentItemProps } from './types';

export function CommentItem({ comment, currentUserId }: CommentItemProps) {
  const utils = trpc.useUtils();

  // Get vote data
  const { data: voteData } = trpc.comment.getVotes.useQuery(
    { commentId: comment.id },
    {
      // Initialize with data from comment.votes if available
      initialData: comment.votes
        ? (() => {
            const upVotes = comment.votes.filter((v) => v.voteType === 'UP');
            const downVotes = comment.votes.filter((v) => v.voteType === 'DOWN');
            return {
              upCount: upVotes.length,
              downCount: downVotes.length,
              upVoters: [],
              downVoters: [],
              userVote: currentUserId
                ? comment.votes.find((v) => v.userId === currentUserId)?.voteType || null
                : null,
            };
          })()
        : undefined,
    }
  );

  const voteMutation = trpc.comment.vote.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.comment.getVotes.cancel({ commentId: comment.id });

      // Snapshot previous value
      const previousVotes = utils.comment.getVotes.getData({ commentId: comment.id });

      // Optimistically update vote counts
      if (previousVotes) {
        const currentUserVote = previousVotes.userVote;
        let newUpCount = previousVotes.upCount;
        let newDownCount = previousVotes.downCount;
        let newUserVote: 'UP' | 'DOWN' | null = variables.voteType;

        if (currentUserVote === variables.voteType) {
          // Toggle off - removing vote
          if (variables.voteType === 'UP') {
            newUpCount = Math.max(0, newUpCount - 1);
          } else {
            newDownCount = Math.max(0, newDownCount - 1);
          }
          newUserVote = null;
        } else if (currentUserVote) {
          // Switching vote
          if (currentUserVote === 'UP') {
            newUpCount = Math.max(0, newUpCount - 1);
            newDownCount += 1;
          } else {
            newDownCount = Math.max(0, newDownCount - 1);
            newUpCount += 1;
          }
        } else {
          // Adding new vote
          if (variables.voteType === 'UP') {
            newUpCount += 1;
          } else {
            newDownCount += 1;
          }
        }

        utils.comment.getVotes.setData(
          { commentId: comment.id },
          {
            ...previousVotes,
            upCount: newUpCount,
            downCount: newDownCount,
            userVote: newUserVote,
          }
        );
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

  const handleVote = (type: 'up' | 'down') => {
    if (!currentUserId) return;

    voteMutation.mutate({
      commentId: comment.id,
      voteType: type === 'up' ? 'UP' : 'DOWN',
    });
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full bg-teal-200 flex items-center justify-center text-sm font-semibold text-gray-900">
          {comment.author.firstName[0]}
          {comment.author.lastName[0]}
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
      
      {/* Vote buttons */}
      <div className="flex items-center gap-4 mt-1">
        <VoteButton
          type="up"
          active={voteData?.userVote === 'UP'}
          count={voteData?.upCount ?? 0}
          voters={voteData?.upVoters}
          onClick={() => handleVote('up')}
        />
        <VoteButton
          type="down"
          active={voteData?.userVote === 'DOWN'}
          count={voteData?.downCount ?? 0}
          voters={voteData?.downVoters}
          onClick={() => handleVote('down')}
        />
      </div>
    </div>
  );
}
