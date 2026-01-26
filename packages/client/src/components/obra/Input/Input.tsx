import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import * as React from 'react';
import type { InputProps } from './types';

export const inputVariants = cva(
  'flex w-full bg-background text-foreground placeholder:text-muted-foreground border transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        mini: 'h-6 px-2 text-xs',
        small: 'h-8 px-3 text-sm',
        regular: 'h-9 px-4 text-sm',
        large: 'h-10 px-6 text-sm',
      },
      roundness: {
        default: 'rounded-lg',
        round: 'rounded-full',
      },
      error: {
        true: 'border-destructive focus-visible:shadow-[0_0_0_3px_var(--focus-ring-error,#FCA5A5)]',
        false: 'border-border focus-visible:shadow-[0_0_0_3px_var(--focus-ring,#CBD5E1)]',
      },
    },
    defaultVariants: {
      size: 'regular',
      roundness: 'default',
      error: false,
    },
  }
);

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'regular',
      roundness = 'default',
      error = false,
      leftDecoration,
      rightDecoration,
      className,
      type = 'text',
      ...props
    },
    ref
  ) => {
      return (
        <div className={cn('relative flex items-center', className)}>
          {leftDecoration && (
            <div className="absolute left-3 flex items-center pointer-events-none">
              {leftDecoration}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, roundness, error }),
              {
                'pl-10': leftDecoration,
                'pr-10': rightDecoration,
              }
            )}
            ref={ref}
            {...props}
          />
          {rightDecoration && (
            <div className="absolute right-3 flex items-center">
              {rightDecoration}
            </div>
          )}
        </div>
      );
    }


  
);

Input.displayName = 'Input';
