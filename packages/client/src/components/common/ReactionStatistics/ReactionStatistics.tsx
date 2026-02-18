import { cn } from '@/lib/utils';
import { VoteButton } from '../VoteButton';
import type { ReactionStatisticsProps } from './types';

export function ReactionStatistics({
  userVote: _userVote = 'none',
  upvotes = 0,
  upvoters,
  downvotes = 0,
  downvoters,
  onUpvote,
  onDownvote,
  className
}: ReactionStatisticsProps) {
  // According to CAR-11: Active state when votes exist from ANY user, not just current user
  // Count displayed when > 0, hidden when = 0
  const upvoteActive = upvotes > 0;
  const downvoteActive = downvotes > 0;

  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <VoteButton
        type="up"
        active={upvoteActive}
        showCount={upvotes > 0}
        count={upvotes}
        voters={upvoters}
        onClick={onUpvote}
      />
      <VoteButton
        type="down"
        active={downvoteActive}
        showCount={downvotes > 0}
        count={downvotes}
        voters={downvoters}
        onClick={onDownvote}
      />
    </div>
  );
}

