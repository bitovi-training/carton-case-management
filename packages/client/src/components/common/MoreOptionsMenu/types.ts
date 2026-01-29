import { ReactNode } from 'react';

export interface MoreOptionsMenuProps {
  /**
   * Flexible trigger - can be IconButton, Avatar, or custom element
   * If not provided, defaults to standard three-dots icon button
   */
  trigger?: ReactNode;
  
  /**
   * Menu items to display in the popover
   * Typically MenuItem components or custom content
   */
  children: ReactNode;
  
  /**
   * Popover positioning relative to trigger
   * @default 'bottom'
   */
  side?: 'top' | 'right' | 'bottom' | 'left';
  
  /**
   * Horizontal alignment for vertical sides
   * @default 'end'
   */
  align?: 'start' | 'center' | 'end';
  
  /**
   * Space between trigger and popover
   * @default 4
   */
  sideOffset?: number;
  
  /**
   * Screen reader label for trigger
   * @default 'More options'
   */
  'aria-label'?: string;
  
  /**
   * External control of open state (optional)
   */
  open?: boolean;
  
  /**
   * Callback when open state changes
   */
  onOpenChange?: (open: boolean) => void;
}

export interface MenuItemProps {
  /**
   * Text content of the menu item
   */
  children: ReactNode;
  
  /**
   * Click handler for the menu item
   */
  onClick?: () => void;
  
  /**
   * Whether the item represents a destructive action
   * @default false
   */
  destructive?: boolean;
  
  /**
   * Whether the item is disabled
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Optional icon to display before the text
   */
  icon?: ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
