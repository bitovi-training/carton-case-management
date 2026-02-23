import { toast as sonnerToast } from 'sonner';

export const useToast = () => {
  return {
    success: (message: string, description?: string) => {
      return sonnerToast.success(message, description ? { description } : undefined);
    },
    error: (message: string, description?: string) => {
      return sonnerToast.error(message, description ? { description, duration: 6000 } : { duration: 6000 });
    },
    info: (message: string, description?: string) => {
      return sonnerToast.info(message, description ? { description } : undefined);
    },
    warning: (message: string, description?: string) => {
      return sonnerToast.warning(message, description ? { description } : undefined);
    },
    loading: (message: string) => {
      return sonnerToast.loading(message);
    },
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
  };
};
