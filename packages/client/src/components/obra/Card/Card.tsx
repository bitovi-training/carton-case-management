import { cn } from '@/lib/utils';
import type { CardProps } from './types';

export function Card({ header, main, footer, className }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 rounded-lg border border-border bg-card p-6 shadow-sm',
        className
      )}
    >
      {header && (
        <div className="min-h-[40px] w-full rounded-lg p-2">
          {header}
        </div>
      )}
      {main && (
        <div className="min-h-[40px] w-full rounded-lg p-2">
          {main}
        </div>
      )}
      {footer && (
        <div className="min-h-[40px] w-full rounded-lg p-2">
          {footer}
        </div>
      )}
    </div>
  );
}
