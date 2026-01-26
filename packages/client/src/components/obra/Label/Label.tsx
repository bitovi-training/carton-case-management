import * as React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import type { LabelProps } from './types';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  {
    variants: {
      layout: {
        inline: 'inline-flex',
        block: 'block',
      },
    },
    defaultVariants: {
      layout: 'inline',
    },
  }
);

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, layout = 'inline', children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ layout }), className)}
        {...props}
      >
        {children}
      </label>
    );
  }
);

Label.displayName = 'Label';

