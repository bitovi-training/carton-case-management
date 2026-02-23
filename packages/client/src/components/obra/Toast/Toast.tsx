import { Toaster as Sonner } from 'sonner';
import type { ToastProps } from './types';

export function Toast({
  position = 'top-right',
  expand = false,
  richColors = true,
  duration = 5000,
  closeButton = true,
  ...props
}: ToastProps) {
  return (
    <Sonner
      position={position}
      expand={expand}
      richColors={richColors}
      duration={duration}
      closeButton={closeButton}
      {...props}
    />
  );
}
