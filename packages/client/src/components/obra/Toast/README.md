# Toast

Toast notification component for displaying temporary messages to users. Built on top of Sonner for smooth animations and stacking behavior.

## Features

- **Multiple Types**: Success, error, warning, and info variants with appropriate colors and icons
- **Auto-dismiss**: Configurable duration (default 5 seconds)
- **Manual Dismiss**: Close button on each toast (can be disabled)
- **Vertical Stacking**: Multiple toasts stack naturally with smooth animations
- **Flexible Positioning**: Support for various positions (top-right, bottom-center, etc.)
- **Rich Colors**: Colored backgrounds for different toast types
- **Descriptions**: Optional secondary text for additional context

## Usage

### 1. Add Toast Component to App Root

Add the `<Toast />` component to your app's root layout:

```tsx
import { Toast } from '@/components/obra/Toast';

function App() {
  return (
    <>
      <Toast />
      {/* Your app content */}
    </>
  );
}
```

### 2. Trigger Toasts

Use the `toast` function anywhere in your app:

```tsx
import { toast } from '@/components/obra/Toast';

// Simple toast
toast('Event has been created');

// Success toast
toast.success('Successfully saved!');

// Error toast
toast.error('Something went wrong');

// Warning toast
toast.warning('Please review your changes');

// Info toast
toast.info('New updates available');

// With description
toast.success('Successfully saved!', {
  description: 'Your changes have been saved to the database.',
});
```

## Props

### Toast Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `position` | `'top-left' \| 'top-right' \| 'top-center' \| 'bottom-left' \| 'bottom-right' \| 'bottom-center'` | `'top-right'` | Position of the toast container |
| `expand` | `boolean` | `false` | Whether toasts should expand on hover |
| `richColors` | `boolean` | `true` | Whether to use rich colors for toast types |
| `duration` | `number` | `5000` | Default duration for toasts in milliseconds |
| `closeButton` | `boolean` | `true` | Whether to show close button on toasts |

## Examples

### Success Toast
```tsx
toast.success('Profile updated successfully');
```

### Error Toast with Description
```tsx
toast.error('Upload failed', {
  description: 'The file size exceeds the maximum allowed limit.',
});
```

### Custom Duration
```tsx
// Show for 10 seconds
toast('Important message', { duration: 10000 });
```

### Different Position
```tsx
// Configure at root level
<Toast position="bottom-center" />
```

### Multiple Toasts
```tsx
// Toasts will stack automatically
toast.success('First action completed');
toast.info('Processing second action');
toast.success('Second action completed');
```

## Acceptance Criteria Compliance

### Success Notifications
- ✅ Green background styling
- ✅ Checkmark icon
- ✅ Success message text
- ✅ Close button (X icon)
- ✅ Auto-dismiss after configured duration

### Error Notifications
- ✅ Red background styling
- ✅ Error/warning icon
- ✅ Error message text
- ✅ Close button (X icon)
- ✅ Auto-dismiss after configured duration

### Info and Warning Notifications
- ✅ Blue background for info
- ✅ Yellow/orange background for warning
- ✅ Appropriate icons for each type
- ✅ Message text
- ✅ Close button (X icon)
- ✅ Auto-dismiss after configured duration

### Manual Dismissal
- ✅ Click close button to immediately dismiss
- ✅ Auto-dismiss timer is cancelled

### Multiple Toasts
- ✅ Stack vertically in designated area
- ✅ Newer toasts appear at top
- ✅ Each toast has individual timer
- ✅ Each toast can be dismissed independently

## Technical Details

This component is a wrapper around [Sonner](https://sonner.emilkowal.ski/), a toast notification library designed for React. It provides:

- Smooth enter/exit animations
- Smart stacking with hover expansion
- Accessible with ARIA attributes
- Keyboard support (Escape to dismiss)
- Screen reader announcements
