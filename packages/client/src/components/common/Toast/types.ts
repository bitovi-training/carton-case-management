export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastOptions {
  /**
   * Toast type/variant
   * @default 'info'
   */
  type?: ToastType;
  
  /**
   * Duration before auto-dismiss in milliseconds
   * @default 5000
   */
  duration?: number;
  
  /**
   * Custom description text
   */
  description?: string;
  
  /**
   * Custom action element
   */
  action?: {
    label: string;
    onClick: () => void;
  };
}
