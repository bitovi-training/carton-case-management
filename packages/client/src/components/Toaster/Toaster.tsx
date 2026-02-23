import { Toaster as SonnerToaster } from 'sonner';
import type { ToasterProps } from './types';

export function Toaster({
  position = 'bottom-right',
  expand = false,
  richColors = true,
  closeButton = true,
  duration = 4000,
}: ToasterProps = {}) {
  return (
    <SonnerToaster
      position={position}
      expand={expand}
      richColors={richColors}
      closeButton={closeButton}
      duration={duration}
      toastOptions={{
        classNames: {
          toast: 'bg-white border border-gray-200 shadow-lg',
          title: 'text-sm font-medium',
          description: 'text-sm text-gray-600',
          actionButton: 'bg-primary text-white',
          cancelButton: 'bg-gray-100 text-gray-600',
          closeButton: 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50',
        },
      }}
    />
  );
}
