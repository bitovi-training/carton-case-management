import { ReactNode } from "react";

export interface PopoverProps {
  /** Whether the popover is open */
  open?: boolean;
  /** Callback when popover open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Modal behavior - whether clicking outside closes the popover */
  modal?: boolean;
  /** Children components (PopoverTrigger and PopoverContent) */
  children: ReactNode;
}

export interface PopoverTriggerProps {
  /** Children to render as the trigger */
  children: ReactNode;
  /** Whether to render as child element (for custom components) */
  asChild?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export interface PopoverContentProps {
  /** Content to display in the popover */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Alignment relative to trigger */
  align?: 'start' | 'center' | 'end';
  /** Side to position popover relative to trigger */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Offset from trigger */
  sideOffset?: number;
  /** Alignment offset */
  alignOffset?: number;
}