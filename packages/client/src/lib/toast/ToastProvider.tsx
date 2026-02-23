import { Toaster as SonnerToaster } from 'sonner';

export function ToastProvider() {
  return (
    <SonnerToaster
      position="top-right"
      expand={false}
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-950 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-gray-500',
          actionButton: 'group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50',
          cancelButton: 'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500',
          closeButton: 'group-[.toast]:bg-white group-[.toast]:border-gray-200',
        },
      }}
    />
  );
}
