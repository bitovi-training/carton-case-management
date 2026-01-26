import * as React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Layout mode for the label
   * - 'inline': Renders label inline with form elements (default)
   * - 'block': Renders label as block element above form elements
   * @default 'inline'
   * @figma Variant: Layout
   */
  layout?: 'inline' | 'block';

  /**
   * Label text content
   * @figma Text: Label
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * ID of the form element this label is for
   * Standard HTML label attribute for accessibility
   */
  htmlFor?: string;
}

