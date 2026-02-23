import { ReactNode } from "react";

export interface ToastProps {
  /**
   * Toast variant/type
   * @default 'success'
   */
  variant?: 'success' | 'destructive';
  
  /**
   * Toast title (bold heading)
   */
  title: string;
  
  /**
   * Toast description/message
   */
  description: string;
  
  /**
   * Icon to display on the left
   */
  icon?: ReactNode;
  
  /**
   * Callback when dismiss button is clicked
   */
  onDismiss?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export interface ToastState {
  id: string;
  variant: 'success' | 'destructive';
  title: string;
  description: string;
  icon?: ReactNode;
}

export interface ToastContextValue {
  toasts: ToastState[];
  addToast: (toast: Omit<ToastState, 'id'>) => void;
  removeToast: (id: string) => void;
}
