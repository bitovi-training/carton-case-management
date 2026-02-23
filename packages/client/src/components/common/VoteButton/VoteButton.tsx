import { cn } from '@/lib/utils';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { VoterTooltip } from '../VoterTooltip';
import type { VoteButtonProps } from './types';

export function VoteButton({
  type,
  active = false,
  showCount = true,
  count,
  voters,
  onClick,
  className,
}: VoteButtonProps) {
  const Icon = type === 'up' ? ThumbsUp : ThumbsDown;
  
  const buttonClasses = cn(
    'inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    active
      ? 'bg-teal-500/20 text-teal-600 hover:bg-teal-500/30'
      : 'text-slate-700 hover:bg-slate-100',
    className
  );

  const button = (
    <button
      type="button"
      onClick={onClick}
      className={buttonClasses}
      aria-label={type === 'up' ? 'Upvote' : 'Downvote'}
      aria-pressed={active}
    >
      <Icon className="h-5 w-5 shrink-0" />
      {showCount && count !== undefined && (
        <span className="text-sm leading-[21px] tracking-[0.07px]">
          {count}
        </span>
      )}
    </button>
  );

  // If voters are provided and there's a count, wrap with tooltip
  if (voters && voters.length > 0 && count !== undefined && count > 0) {
    const displayVoters = voters.slice(0, 3);
    const remainingCount = voters.length - 3;

    return (
      <VoterTooltip type={type} trigger={button}>
        <div className="flex flex-col gap-1 text-left">
          {displayVoters.map((voter, index) => (
            <span key={index} className="text-sm font-semibold">
              {voter}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs font-semibold">
              +{remainingCount} more
            </span>
          )}
        </div>
      </VoterTooltip>
    );
  }

  return button;
}

