import { ReactNode } from "react";

export interface TooltipProviderProps {
  /**
   * Child components (Tooltip instances)
   */
  children: ReactNode;
  
  /**
   * Delay before showing tooltip (ms)
   * @default 700
   */
  delayDuration?: number;
  
  /**
   * Duration to skip delay when moving between tooltips (ms)
   * @default 300
   */
  skipDelayDuration?: number;
  
  /**
   * Prevent tooltip from remaining open when hovering over it
   * @default false
   */
  disableHoverableContent?: boolean;
}
