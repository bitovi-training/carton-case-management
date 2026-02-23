# Toast

Toast notification component built on Sonner for displaying feedback messages.

## Design Reference

Based on ERIOT-28 Figma designs:
- [New Case Created](https://www.figma.com/design/zm8VZCEsJFFxJOiSC1HtUt?node-id=4179-9281)
- [Case Deleted](https://www.figma.com/design/zm8VZCEsJFFxJOiSC1HtUt?node-id=4179-9287)

## Usage

### Setup

Add the `Toaster` component to your app root:

```tsx
import { Toaster } from '@/components/obra/Toast';

function App() {
  return (
    <>
      <YourApp />
      <Toaster />
    </>
  );
}
```

### Show Toasts

Use the `toast` helper to display notifications:

```tsx
import { toast } from '@/components/obra/Toast';

toast.success('Success!', 'A new claim has been created.');

toast.error('Deleted', '"Fraud Investigation" case has been successfully deleted.');

toast.info('Information', 'This is an info message.');
```

## API

### Toaster Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| position | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'bottom-center'` | Position of toasts on screen |
| duration | `number` | `5000` | Duration in ms before auto-dismiss |

### toast Helpers

- `toast.success(title, message?, duration?)` - Show success toast with checkmark icon
- `toast.error(title, message?, duration?)` - Show error toast with trash icon and red accent
- `toast.info(title, message?, duration?)` - Show info toast with info icon
- `toast.custom(options)` - Show custom toast with full options

## Features

- ✅ Auto-dismiss after 5 seconds (configurable)
- ✅ Manual dismiss via Dismiss button
- ✅ Success variant with checkmark icon
- ✅ Error variant with red trash icon and red left accent line
- ✅ Accessible with screen reader support
- ✅ Positioned at bottom-center by default
- ✅ White background with drop shadow
- ✅ Non-modal (allows interaction with page content)

## Design-to-Code Mapping

| Figma Element | React Implementation |
|---------------|---------------------|
| Success toast with checkmark | `toast.success()` with CheckCircle2 icon |
| Delete toast with trash icon | `toast.error()` with Trash2 icon |
| Red left accent line | Border-left on error variant |
| Dismiss button | Sonner's built-in closeButton |
| Bottom-center position | `position="bottom-center"` prop |
