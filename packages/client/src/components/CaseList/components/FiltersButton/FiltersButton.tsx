import { Button } from '@/components/obra/Button';
import { ListFilter } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FiltersButtonProps } from './types';

export function FiltersButton({ count = 0, onClick, className }: FiltersButtonProps) {
  const showBadge = count > 0;

  return (
    <Button
      variant="secondary"
      onClick={onClick}
      className={cn('w-full mb-2 relative', className)}
    >
      <ListFilter className="w-4 h-4 mr-2" />
      Filters
      {showBadge && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
    </Button>
  );
}
