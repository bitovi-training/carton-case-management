# Toast

Toast notification system for displaying temporary messages to users with success and destructive variants.

## Figma Source

- [New Case Created - Desktop](https://www.figma.com/design/zm8VZCEsJFFxJOiSC1HtUt?node-id=4179-10171)
- [Case Deleted](https://www.figma.com/design/zm8VZCEsJFFxJOiSC1HtUt?node-id=4179-10177)
- [New Case Created - Mobile](https://www.figma.com/design/zm8VZCEsJFFxJOiSC1HtUt?node-id=4179-10188)

## Implementation

This Toast system consists of three main components:

1. **Toast** - The individual toast UI component
2. **ToastProvider** - Context provider for managing toast state
3. **Toaster** - Container that renders active toasts at bottom-center

## Usage

### 1. Wrap your app with ToastProvider

```tsx
// App.tsx or main.tsx
import { ToastProvider, Toaster } from '@/components/obra/Toast';

function App() {
  return (
    <ToastProvider>
      <YourApp />
      <Toaster />
    </ToastProvider>
  );
}
```

### 2. Use the useToast hook to trigger toasts

```tsx
import { useToast } from '@/components/obra/Toast';

function CreateCasePage() {
  const { addToast } = useToast();

  const handleSuccess = () => {
    addToast({
      variant: 'success',
      title: 'Success!',
      description: 'A new claim has been created.',
    });
  };

  const handleDelete = (caseName: string) => {
    addToast({
      variant: 'destructive',
      title: 'Deleted',
      description: `"${caseName}" case has been successfully deleted.`,
    });
  };

  return (
    // Your component JSX
  );
}
```

## Component API

### Toast

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | `'success' \| 'destructive'` | `'success'` | Toast style variant |
| title | `string` | required | Bold heading text |
| description | `string` | required | Description/message text |
| icon | `ReactNode` | CheckCircle2 or Trash2 | Custom icon element |
| onDismiss | `() => void` | - | Callback when dismiss button clicked |
| className | `string` | - | Additional CSS classes |

### useToast Hook

Returns an object with:

| Property | Type | Description |
|----------|------|-------------|
| toasts | `ToastState[]` | Array of active toasts |
| addToast | `(toast: Omit<ToastState, 'id'>) => void` | Add a new toast |
| removeToast | `(id: string) => void` | Remove a toast by ID |

## Design Decisions

### Positioning
- Fixed at `bottom-4 left-1/2` with `-translate-x-1/2` for perfect bottom-center positioning
- Works consistently across desktop and mobile viewports
- z-index of 50 ensures toasts appear above other content

### Styling
- White background (`bg-white`) with shadow (`shadow-lg`) for elevation
- Border for subtle definition
- Min width of 320px, max width of 480px for readability
- Responsive to viewport width on mobile

### Animations
- Enter animation: `slide-in-from-bottom-4 fade-in` with 300ms duration
- Smooth transition for polished feel
- Uses Tailwind's `animate-in` utilities

### Accessibility
- `role="alert"` on individual toasts
- `aria-live="polite"` for screen reader announcements
- `aria-atomic="true"` for complete message reading
- Dismiss button has `aria-label="Dismiss notification"`

### Icons
- Success: CheckCircle2 (green)
- Destructive: Trash2 (destructive color)
- Custom icons supported via `icon` prop

## Accepted Design Differences

| Category | Figma | Implementation | Reason |
|----------|-------|----------------|--------|
| Auto-dismiss | Not specified | Manual dismiss only | Acceptance criteria only requires manual dismiss |
| Stacking | Not specified | Vertical stack with gap-2 | Handles multiple toasts gracefully |
| Max toasts | Not specified | Unlimited | Can be added later if needed |
| Animation timing | Not specified | 300ms enter | Standard smooth animation |

## Future Enhancements

Based on ticket questions that remain open:

- Auto-dismiss timer with configurable duration
- Hover/focus to pause auto-dismiss timer
- Maximum number of simultaneous toasts
- Additional variants (warning, info)
- Click outside to dismiss
- Swipe to dismiss on mobile
