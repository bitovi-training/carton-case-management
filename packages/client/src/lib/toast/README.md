# Toast Notifications

A toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/) for displaying temporary feedback messages to users.

## Features

- ✅ Four toast types: success, error, warning, info
- ✅ Auto-dismiss with configurable duration
- ✅ Manual dismissal with close button
- ✅ Stacking support for multiple toasts
- ✅ Icon indicators for each toast type
- ✅ Optional descriptions
- ✅ Optional action buttons
- ✅ Positioned at top-right
- ✅ Rich colors for visual distinction

## Installation

The toast system is already installed and configured. The `ToastProvider` is included in the root App component.

## Usage

### Basic Usage

Import the `useToast` hook in any component:

```tsx
import { useToast } from '@/lib/toast';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success({ message: 'Operation completed successfully!' });
  };

  const handleError = () => {
    toast.error({ message: 'Something went wrong' });
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}
```

### Toast Types

#### Success Toast
```tsx
toast.success({ message: 'Case created successfully' });
```
- **Icon**: Green checkmark (CheckCircle2)
- **Duration**: 4 seconds (default)
- **Use for**: Successful operations, confirmations

#### Error Toast
```tsx
toast.error({ message: 'Failed to save changes' });
```
- **Icon**: Red X (XCircle)
- **Duration**: Infinite (user must dismiss)
- **Use for**: Errors, failures, critical issues

#### Warning Toast
```tsx
toast.warning({ message: 'Please review your input' });
```
- **Icon**: Yellow triangle (AlertTriangle)
- **Duration**: 4 seconds (default)
- **Use for**: Warnings, cautions, non-critical issues

#### Info Toast
```tsx
toast.info({ message: 'System maintenance scheduled' });
```
- **Icon**: Blue info circle (Info)
- **Duration**: 4 seconds (default)
- **Use for**: Informational messages, tips, updates

### Advanced Usage

#### With Description
```tsx
toast.success({
  message: 'Case #12345 created',
  description: 'The case has been assigned to John Doe',
});
```

#### Custom Duration
```tsx
toast.info({
  message: 'Quick message',
  duration: 2000, // 2 seconds
});
```

#### With Action Button
```tsx
toast.success({
  message: 'Case deleted',
  action: {
    label: 'Undo',
    onClick: () => {
      // Handle undo action
    },
  },
});
```

#### Dismiss Toasts
```tsx
// Dismiss all toasts
toast.dismiss();

// Dismiss specific toast (save the return value from toast.success/error/etc)
const toastId = toast.success({ message: 'Processing...' });
toast.dismiss(toastId);
```

## API Reference

### `useToast()`

Returns an object with the following methods:

#### `success(options: ToastOptions)`
Shows a success toast.

#### `error(options: ToastOptions)`
Shows an error toast.

#### `warning(options: ToastOptions)`
Shows a warning toast.

#### `info(options: ToastOptions)`
Shows an info toast.

#### `dismiss(toastId?: string | number)`
Dismisses a specific toast or all toasts.

### `ToastOptions`

```typescript
interface ToastOptions {
  message: string;              // Required: Toast message
  description?: string;         // Optional: Additional description
  duration?: number;            // Optional: Duration in ms (default: 4000, error: Infinity)
  action?: {                    // Optional: Action button
    label: string;
    onClick: () => void;
  };
}
```

## Default Durations

| Toast Type | Default Duration | Rationale |
|-----------|------------------|-----------|
| Success | 4000ms (4s) | Quick confirmation, auto-dismiss |
| Error | Infinity | User must acknowledge error |
| Warning | 4000ms (4s) | Important but not critical |
| Info | 4000ms (4s) | Informational, can auto-dismiss |

## Examples

### Form Submission
```tsx
const handleSubmit = async (data: FormData) => {
  try {
    await createCase(data);
    toast.success({
      message: 'Case created',
      description: `Case #${data.caseNumber} has been created`,
    });
  } catch (error) {
    toast.error({
      message: 'Failed to create case',
      description: error.message,
    });
  }
};
```

### Delete with Undo
```tsx
const handleDelete = async (id: string) => {
  await deleteCase(id);
  toast.success({
    message: 'Case deleted',
    action: {
      label: 'Undo',
      onClick: async () => {
        await restoreCase(id);
        toast.success({ message: 'Case restored' });
      },
    },
  });
};
```

### Multiple Operations
```tsx
const handleBulkUpdate = async (ids: string[]) => {
  toast.info({ message: `Updating ${ids.length} cases...` });
  
  const results = await Promise.allSettled(ids.map(updateCase));
  
  const successful = results.filter(r => r.status === 'fulfilled').length;
  const failed = results.length - successful;
  
  if (failed === 0) {
    toast.success({ message: `All ${successful} cases updated` });
  } else {
    toast.warning({
      message: `${successful} cases updated`,
      description: `${failed} cases failed to update`,
    });
  }
};
```

## Position

Toasts appear in the **top-right** corner of the screen by default. This can be changed in `ToastProvider.tsx` if needed:

```tsx
<SonnerToaster
  position="top-right"  // Options: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  // ...
/>
```

## Stacking Behavior

- Toasts stack vertically
- New toasts appear at the top of the stack
- Toasts dismiss in FIFO order (first in, first out)
- Maximum of 3 toasts visible at once (Sonner default)
- Older toasts automatically adjust position as new ones appear

## Accessibility

- Close button included for manual dismissal
- Keyboard navigation supported (Tab to close button, Enter to dismiss)
- Screen reader announcements via `aria-live` regions
- Rich colors for visual distinction
- Icons provide additional visual cues

## Related Components

- **Alert** (`components/obra/Alert/`) - For persistent, inline alerts
- **AlertDialog** (`components/obra/AlertDialog/`) - For blocking confirmations

Use toasts for temporary feedback, alerts for persistent messages, and dialogs for critical confirmations.
