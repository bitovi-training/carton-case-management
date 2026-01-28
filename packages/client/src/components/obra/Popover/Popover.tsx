
import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '@/lib/utils';
import type { PopoverProps, PopoverTriggerProps, PopoverContentProps } from './types';

export function Popover({ open, onOpenChange, modal = true, children }: PopoverProps) {
  return (
    <PopoverPrimitive.Root 
      open={open} 
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </PopoverPrimitive.Root>
  );
}

export const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  PopoverTriggerProps
>(({ children, asChild = false, className, ...props }, ref) => (
  <PopoverPrimitive.Trigger
    ref={ref}
    asChild={asChild}
    className={className}
    {...props}
  >
    {children}
  </PopoverPrimitive.Trigger>
));

PopoverTrigger.displayName = 'PopoverTrigger';


export const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(({ 
  children, 
  className, 
  align = 'center',
  side = 'bottom',
  sideOffset = 8,
  alignOffset = 0,
  ...props 
}, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      side={side}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(
        'z-50 min-w-[200px] max-w-[400px]',
        'bg-white border border-slate-200',
        'rounded-lg shadow-lg',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    >
      {children}
    </PopoverPrimitive.Content>
  </PopoverPrimitive.Portal>
));

PopoverContent.displayName = 'PopoverContent';