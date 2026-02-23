export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastOptions {
  /**
   * Toast message content
   */
  message: string;
  
  /**
   * Optional toast description
   */
  description?: string;
  
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 4000 for success/warning/info, Infinity for error
   */
  duration?: number;
  
  /**
   * Custom action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
}
