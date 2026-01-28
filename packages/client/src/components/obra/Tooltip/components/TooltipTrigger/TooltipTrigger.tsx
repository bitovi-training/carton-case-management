import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { TooltipTriggerProps } from './types';

export function TooltipTrigger({ children, asChild = false }: TooltipTriggerProps) {
  return (
    <TooltipPrimitive.Trigger asChild={asChild}>
      {children}
    </TooltipPrimitive.Trigger>
  );
}
