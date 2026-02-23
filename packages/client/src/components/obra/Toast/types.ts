import { ReactNode } from 'react';

export interface ToastProps {
  /**
   * Toast variant
   * @default 'success'
   */
  variant?: 'success' | 'error' | 'info';
  
  /**
   * Toast title
   */
  title: string;
  
  /**
   * Toast message/description
   */
  message?: string;
  
  /**
   * Optional icon to display
   */
  icon?: ReactNode;
  
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 5000
   */
  duration?: number;
}

export interface ToasterProps {
  /**
   * Position of the toasts
   * @default 'bottom-center'
   */
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  
  /**
   * Duration in milliseconds before auto-dismiss
   * @default 5000
   */
  duration?: number;
}
