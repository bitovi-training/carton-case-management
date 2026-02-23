# Toaster Component

A toast notification system built on top of [Sonner](https://sonner.emilkowal.ski/), providing a simple and elegant way to display notifications in the application.

## Features

- ✅ Multiple toast types: success, error, info, warning
- ✅ Auto-dismiss with configurable duration
- ✅ Manual dismiss with close button
- ✅ Multiple toast stacking
- ✅ Smooth animations
- ✅ Customizable positioning
- ✅ Rich colors for visual distinction
- ✅ TypeScript support

## Installation

The Toaster component is already integrated into the application at the `App.tsx` level.

## Usage

### Basic Example

```tsx
import { useToast } from '@/components/Toaster';

function MyComponent() {
  const toast = useToast();

  const handleSuccess = () => {
    toast.success('Operation completed successfully!');
  };

  const handleError = () => {
    toast.error('An error occurred');
  };

  return (
    <div>
      <button onClick={handleSuccess}>Show Success</button>
      <button onClick={handleError}>Show Error</button>
    </div>
  );
}
```

### With Description

```tsx
const toast = useToast();

toast.success(
  'Case created successfully',
  'Case #12345 has been created and assigned'
);

toast.error(
  'Failed to save',
  'Please check your network connection and try again'
);
```

### Toast Types

```tsx
const toast = useToast();

// Success (4s duration, green)
toast.success('Changes saved successfully');

// Error (6s duration, red)
toast.error('Failed to update');

// Info (4s duration, blue)
toast.info('New comment added');

// Warning (4s duration, yellow/orange)
toast.warning('This action cannot be undone');

// Loading (persists until dismissed or updated)
const loadingToastId = toast.loading('Saving changes...');
// Later, dismiss or update it
toast.dismiss(loadingToastId);
```

### Promise-based Actions

For async operations, use the promise method:

```tsx
const toast = useToast();

toast.promise(
  fetch('/api/data').then(res => res.json()),
  {
    loading: 'Loading data...',
    success: 'Data loaded successfully!',
    error: 'Failed to load data',
  }
);
```

## Configuration

The Toaster component is configured at the application level in `App.tsx`:

```tsx
<Toaster
  position="bottom-right"  // Position on screen
  expand={false}           // Expand on hover
  richColors={true}        // Use rich colors for types
  closeButton={true}       // Show close button
  duration={4000}          // Default duration (ms)
/>
```

### Available Positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right` (default)

## Implementation Examples

### Case Creation (CreateCasePage.tsx)

```tsx
import { useToast } from '@/components/Toaster';

const toast = useToast();

const createCase = trpc.case.create.useMutation({
  onSuccess: (data) => {
    toast.success(
      'Case created successfully',
      `Case #${data.caseNumber} has been created`
    );
    navigate(`/cases/${data.id}`);
  },
  onError: (error) => {
    toast.error(
      'Failed to create case',
      error.message || 'An unexpected error occurred'
    );
  },
});
```

### Comment Addition (CaseComments.tsx)

```tsx
import { useToast } from '@/components/Toaster';

const toast = useToast();

const createCommentMutation = trpc.comment.create.useMutation({
  onSuccess: () => {
    toast.success('Comment added');
    setNewComment('');
  },
  onError: () => {
    toast.error('Failed to add comment', 'Please try again.');
  },
});
```

### Case Update (CaseInformation.tsx)

```tsx
import { useToast } from '@/components/Toaster';

const toast = useToast();

const updateCase = trpc.case.update.useMutation({
  onSuccess: () => {
    toast.success('Case updated');
  },
  onError: (error) => {
    toast.error('Failed to update case', error.message);
  },
});
```

## API Reference

### useToast Hook

The `useToast` hook provides convenient methods for displaying toasts:

```typescript
const toast = useToast();

// Methods
toast.success(message: string, description?: string)
toast.error(message: string, description?: string)
toast.info(message: string, description?: string)
toast.warning(message: string, description?: string)
toast.loading(message: string)
toast.promise(promise, { loading, success, error })
toast.dismiss(toastId?: string)
```

### Toaster Props

```typescript
interface ToasterProps {
  position?: 'top-left' | 'top-center' | 'top-right' 
           | 'bottom-left' | 'bottom-center' | 'bottom-right';
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  duration?: number;  // in milliseconds
}
```

## Duration Defaults

- **Success/Info/Warning**: 4 seconds
- **Error**: 6 seconds (longer for users to read error messages)
- **Loading**: Persists until manually dismissed

## Accessibility

The toast system is built on Sonner, which handles accessibility automatically:

- Proper ARIA attributes
- Keyboard navigation support
- Screen reader announcements
- Focus management

## Testing

The component includes comprehensive tests:

```bash
npm run test -- Toaster
```

## Storybook

View all toast variants in Storybook:

```bash
npm run storybook
```

Navigate to: `Components > Toaster`

## Best Practices

1. **Success toasts**: Use for completed actions (create, update, delete)
2. **Error toasts**: Include actionable error messages when possible
3. **Info toasts**: Use for informational updates that don't require action
4. **Warning toasts**: Use for actions that might have consequences
5. **Loading toasts**: Use for long-running operations, update or dismiss when complete
6. **Descriptions**: Add descriptions for complex operations or errors
7. **Consistency**: Use the same toast types for similar actions throughout the app

## File Structure

```
Toaster/
├── index.ts                 # Public exports
├── Toaster.tsx              # Main component
├── Toaster.test.tsx         # Component tests
├── Toaster.stories.tsx      # Storybook stories
├── types.ts                 # TypeScript types
├── useToast.ts              # Custom hook
├── useToast.test.ts         # Hook tests
└── README.md                # This file
```

## Related Resources

- [Sonner Documentation](https://sonner.emilkowal.ski/)
- [Toast UX Best Practices](https://www.nngroup.com/articles/toast-notifications/)
