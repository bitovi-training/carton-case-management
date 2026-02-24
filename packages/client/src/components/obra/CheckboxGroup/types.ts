import type { ReactNode } from 'react';

export interface CheckboxGroupProps {
  /**
   * Layout variant
   * @default 'inline'
   * @figma Variant: Layout
   */
  layout?: 'inline' | 'block';
  
  /**
   * Checked state
   * @default false
   * @figma Variant: Checked?
   */
  checked?: boolean;
  
  /**
   * Label text or element
   * @figma Text: Label
   */
  label: string | ReactNode;
  
  /**
   * Change handler
   */
  onCheckedChange?: (checked: boolean) => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
