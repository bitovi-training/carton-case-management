import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { TooltipProps } from './types';

export function Tooltip({ children, open, defaultOpen, onOpenChange }: TooltipProps) {
  return (
    <TooltipPrimitive.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      {children}
    </TooltipPrimitive.Root>
  );
}
