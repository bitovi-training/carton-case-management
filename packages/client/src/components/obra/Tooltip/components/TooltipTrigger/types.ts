import { ReactNode } from "react";

export interface TooltipTriggerProps {
  /**
   * The trigger element content
   * @figma Text: "Hover me"
   */
  children: ReactNode;
  
  /**
   * Merge props onto child instead of wrapping
   * @default false
   */
  asChild?: boolean;
}
