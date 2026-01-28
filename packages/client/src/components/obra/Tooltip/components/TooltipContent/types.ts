import { ReactNode } from "react";

export interface TooltipContentProps {
  /**
   * Tooltip content
   * @figma Text: "Tooltip text"
   */
  children: ReactNode;
  
  /**
   * Side where tooltip appears
   * @default 'top'
   * @figma Variant: Side (Top, Bottom, Left, Right)
   */
  side?: 'top' | 'bottom' | 'left' | 'right';
  
  /**
   * Distance from trigger
   * @default 4
   */
  sideOffset?: number;
  
  /**
   * Alignment along the side axis
   * @default 'center'
   */
  align?: 'start' | 'center' | 'end';
  
  /**
   * Offset from alignment position
   * @default 0
   */
  alignOffset?: number;
  
  /**
   * Auto-adjust position to avoid viewport edges
   * @default true
   */
  avoidCollisions?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
