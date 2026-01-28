import { ReactNode } from "react";

export interface TooltipProps {
  /**
   * Must contain TooltipTrigger and TooltipContent
   */
  children: ReactNode;
  
  /**
   * Controlled open state
   */
  open?: boolean;
  
  /**
   * Initial open state (uncontrolled)
   * @default false
   */
  defaultOpen?: boolean;
  
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}
