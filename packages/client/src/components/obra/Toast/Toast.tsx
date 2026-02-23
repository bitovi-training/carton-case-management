import { CheckCircle2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ToastProps } from './types';

export function Toast({
  variant = 'success',
  title,
  description,
  icon,
  onDismiss,
  className,
}: ToastProps) {
  const variantStyles = {
    success: {
      container: 'bg-card border-border',
      text: 'text-foreground',
      description: 'text-muted-foreground',
    },
    destructive: {
      container: 'bg-card border-border',
      text: 'text-foreground',
      description: 'text-muted-foreground',
    },
  };

  const styles = variantStyles[variant];

  // Default icons based on variant
  const defaultIcon = variant === 'success' ? (
    <CheckCircle2 className="h-5 w-5 text-green-600" />
  ) : (
    <Trash2 className="h-5 w-5 text-destructive" />
  );

  const displayIcon = icon ?? defaultIcon;

  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-lg border bg-white p-4 shadow-lg',
        styles.container,
        'min-w-[320px] max-w-[480px]',
        className
      )}
      role="alert"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex shrink-0 items-center">
        {displayIcon}
      </div>

      <div className="flex flex-1 flex-col gap-0.5">
        <p className={cn('text-sm font-semibold leading-[21px]', styles.text)}>
          {title}
        </p>
        <p className={cn('text-sm font-normal leading-[21px]', styles.description)}>
          {description}
        </p>
      </div>

      <button
        onClick={onDismiss}
        className={cn(
          'shrink-0 rounded-md border border-border px-3 py-1.5',
          'text-sm font-medium text-foreground',
          'transition-colors hover:bg-accent hover:text-accent-foreground',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
        aria-label="Dismiss notification"
      >
        Dismiss
      </button>
    </div>
  );
}
