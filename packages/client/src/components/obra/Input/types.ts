import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /**
   * Size variant
   * @default 'regular'
   * @figma Variant: Size
   */
  size?: 'mini' | 'small' | 'regular' | 'large';

  /**
   * Roundness variant
   * @default 'default'
   * @figma Variant: Roundness
   */
  roundness?: 'default' | 'round';

  /**
   * Error state - applies error styling and red focus ring
   * @default false
   * @figma State: Error, Error Focus
   */
  error?: boolean;

  /**
   * Optional left-side decoration (icon, prefix, etc.)
   * @figma Boolean: showDecorationLeft
   */
  leftDecoration?: React.ReactNode;

  /**
   * Optional right-side decoration (icon, suffix, etc.)
   * @figma Boolean: showDecorationRight
   */
  rightDecoration?: React.ReactNode;
}
