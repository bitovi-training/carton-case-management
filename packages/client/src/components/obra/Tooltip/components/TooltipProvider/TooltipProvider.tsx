import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import type { TooltipProviderProps } from './types';

export function TooltipProvider({
  children,
  delayDuration = 700,
  skipDelayDuration = 300,
  disableHoverableContent = false,
}: TooltipProviderProps) {
  return (
    <TooltipPrimitive.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
      disableHoverableContent={disableHoverableContent}
    >
      {children}
    </TooltipPrimitive.Provider>
  );
}
