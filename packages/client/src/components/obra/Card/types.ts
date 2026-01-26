import { ReactNode } from "react";


export interface CardProps {
  /**
   * Top slot content
   * @figma Instance: headerSlot
   */
  header?: ReactNode;

  /**
   * Main content slot
   * @figma Instance: mainSlot
   */
  main?: ReactNode;

  /**
   * Bottom slot content
   * @figma Instance: footerSlot
   */
  footer?: ReactNode;

  /**
   * Additional CSS classes for the card container
   */
  className?: string;
}
