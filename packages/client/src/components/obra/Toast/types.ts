import type { ToasterProps } from 'sonner';

export interface ToastProps extends ToasterProps {
  /**
   * Position of the toast container
   * @default 'top-right'
   */
  position?: ToasterProps['position'];

  /**
   * Whether toasts should expand on hover
   * @default false
   */
  expand?: boolean;

  /**
   * Whether to use rich colors for toast types
   * @default true
   */
  richColors?: boolean;

  /**
   * Default duration for toasts in milliseconds
   * @default 5000
   */
  duration?: number;

  /**
   * Whether to show close button on toasts
   * @default true
   */
  closeButton?: boolean;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';
