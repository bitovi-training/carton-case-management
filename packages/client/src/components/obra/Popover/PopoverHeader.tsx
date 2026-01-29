import * as React from 'react';
import { cn } from '@/lib/utils';

export interface PopoverHeaderProps {
  /** Title text for the header */
  title: string;
  /** Optional description text below the title */
  description?: string;
  /** Additional CSS classes */
  className?: string;
}

export const PopoverHeader = React.forwardRef<
  HTMLDivElement,
  PopoverHeaderProps
>(({ title, description, className }, ref) => {

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 pb-4 w-full",
        className
      )}
      data-testid="popover-header"
    >
      <h3 className="text-base font-semibold text-foreground">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
});

PopoverHeader.displayName = 'PopoverHeader';