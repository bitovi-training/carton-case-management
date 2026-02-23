# Toast Messages - Visual Guide

This guide shows what the toast notifications look like in the Carton Case Management application.

## Toast Appearance

### Success Toast
```
┌──────────────────────────────────────┐
│ ✓ Case created successfully      ✕  │
│   Case #12345 has been created       │
└──────────────────────────────────────┘
```
- **Color**: Green background
- **Icon**: Checkmark (✓)
- **Duration**: 4 seconds
- **Position**: Bottom-right

### Error Toast
```
┌──────────────────────────────────────┐
│ ✕ Failed to save                 ✕  │
│   Please check your network and      │
│   try again.                          │
└──────────────────────────────────────┘
```
- **Color**: Red background
- **Icon**: X mark (✕)
- **Duration**: 6 seconds (longer)
- **Position**: Bottom-right

### Info Toast
```
┌──────────────────────────────────────┐
│ ℹ New comment added               ✕  │
│   The comment has been posted.       │
└──────────────────────────────────────┘
```
- **Color**: Blue background
- **Icon**: Info icon (ℹ)
- **Duration**: 4 seconds
- **Position**: Bottom-right

### Warning Toast
```
┌──────────────────────────────────────┐
│ ⚠ This action cannot be undone    ✕  │
│   Please confirm before proceeding.  │
└──────────────────────────────────────┘
```
- **Color**: Yellow/Orange background
- **Icon**: Warning icon (⚠)
- **Duration**: 4 seconds
- **Position**: Bottom-right

## Multiple Toasts (Stacking)

When multiple toasts are shown, they stack vertically:

```
                                    ┌────────────────────────────┐
                                    │ ✓ Comment added        ✕  │
                                    └────────────────────────────┘
                                    
                                    ┌────────────────────────────┐
                                    │ ✓ Case updated         ✕  │
                                    └────────────────────────────┘
                                    
                                    ┌────────────────────────────┐
                                    │ ✓ Changes saved        ✕  │
                                    └────────────────────────────┘
```

## Toast with Action Button

```
┌──────────────────────────────────────────────┐
│ ✓ Changes saved                          ✕  │
│   [Undo]                                     │
└──────────────────────────────────────────────┘
```
- Action button is clickable
- Can trigger additional actions

## Loading Toast

```
┌──────────────────────────────────────┐
│ ⟳ Saving changes...              ✕  │
└──────────────────────────────────────┘
```
- **Icon**: Loading spinner (⟳)
- **Duration**: Persists until dismissed or updated
- Use for long-running operations

## Real-World Examples

### 1. Creating a Case (CreateCasePage.tsx)

**On Success:**
```
┌──────────────────────────────────────┐
│ ✓ Case created successfully      ✕  │
│   Case #10042 has been created       │
└──────────────────────────────────────┘
```

**On Error:**
```
┌──────────────────────────────────────┐
│ ✕ Failed to create case          ✕  │
│   Network connection lost. Please    │
│   try again.                          │
└──────────────────────────────────────┘
```

### 2. Adding a Comment (CaseComments.tsx)

**On Success:**
```
┌──────────────────────────────────────┐
│ ✓ Comment added                  ✕  │
└──────────────────────────────────────┘
```

**On Error:**
```
┌──────────────────────────────────────┐
│ ✕ Failed to add comment          ✕  │
│   Please try again.                  │
└──────────────────────────────────────┘
```

### 3. Updating Case Information (CaseInformation.tsx)

**On Update Success:**
```
┌──────────────────────────────────────┐
│ ✓ Case updated                   ✕  │
└──────────────────────────────────────┘
```

**On Delete Success:**
```
┌──────────────────────────────────────┐
│ ✓ Case deleted                   ✕  │
└──────────────────────────────────────┘
```

**On Error:**
```
┌──────────────────────────────────────┐
│ ✕ Failed to update case          ✕  │
│   An unexpected error occurred.      │
└──────────────────────────────────────┘
```

## Positioning Options

The toast can appear in 6 different positions:

```
top-left          top-center          top-right
   ┌────┐            ┌────┐            ┌────┐
   │    │            │    │            │    │
   └────┘            └────┘            └────┘





bottom-left       bottom-center       bottom-right (default)
   ┌────┐            ┌────┐            ┌────┐
   │    │            │    │            │    │
   └────┘            └────┘            └────┘
```

**Default**: bottom-right (least intrusive, common placement)

## Animation Behavior

### Appear Animation
1. Toast slides in from the right
2. Smooth easing transition (300ms)
3. Opacity fades from 0 to 1

### Dismiss Animation
1. Toast slides out to the right
2. Opacity fades from 1 to 0
3. Remaining toasts smoothly adjust position

### Stacking Behavior
- New toasts appear at the top
- Existing toasts shift down smoothly
- Maximum 3-5 toasts visible at once
- Older toasts auto-dismiss when limit reached

## Interactive States

### Default State
```
┌──────────────────────────────────────┐
│ ✓ Case created successfully      ✕  │
│   Case #12345 has been created       │
└──────────────────────────────────────┘
```

### Hover State
```
┌══════════════════════════════════════┐ (slight scale up)
│ ✓ Case created successfully      ✕  │
│   Case #12345 has been created       │
└══════════════════════════════════════┘
```
- Auto-dismiss timer pauses on hover
- Slight scale effect

### Close Button Hover
```
┌──────────────────────────────────────┐
│ ✓ Case created successfully     [✕] │ (button highlighted)
│   Case #12345 has been created       │
└──────────────────────────────────────┘
```
- Close button becomes more prominent
- Cursor changes to pointer

## Accessibility Features

### Screen Reader Announcement

When a toast appears, screen readers will announce:

**Success:**
> "Success: Case created successfully. Case #12345 has been created."

**Error:**
> "Error: Failed to save. Please check your network and try again."

**Info:**
> "Info: New comment added."

### Keyboard Navigation

- `Tab` - Move focus to close button
- `Enter` / `Space` - Dismiss toast
- `Escape` - Dismiss all toasts

## Styling Details

### Typography
- **Title**: 14px, medium weight, semibold
- **Description**: 14px, regular weight, gray-600
- **Font**: System font stack (inherits from app)

### Spacing
- **Padding**: 16px (all sides)
- **Gap between title/description**: 4px
- **Close button**: 24x24px hit area
- **Stack gap**: 12px between toasts

### Colors (Rich Colors Enabled)

**Success:**
- Background: Light green (#dcfce7)
- Text: Dark green (#166534)
- Icon: Green (#22c55e)

**Error:**
- Background: Light red (#fee2e2)
- Text: Dark red (#991b1b)
- Icon: Red (#ef4444)

**Info:**
- Background: Light blue (#dbeafe)
- Text: Dark blue (#1e40af)
- Icon: Blue (#3b82f6)

**Warning:**
- Background: Light yellow (#fef3c7)
- Text: Dark brown (#78350f)
- Icon: Yellow (#f59e0b)

### Shadows
- Box shadow: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- Elevation: Appears above all content (z-index: 9999)

## Performance

- **Render time**: < 16ms (60fps)
- **Animation duration**: 300ms
- **Memory footprint**: Minimal (< 1KB per toast)
- **Automatic cleanup**: Old toasts removed from DOM after dismissal

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Best Practices

### Do's ✅
- Use success toasts for completed actions
- Use error toasts with actionable messages
- Include descriptions for complex operations
- Keep messages concise (< 100 characters)
- Use consistent language and tone

### Don'ts ❌
- Don't show toasts for every minor action
- Don't use toasts for critical errors (use dialogs)
- Don't stack more than 3-5 toasts
- Don't use very long messages
- Don't override default durations without reason

## Testing the Toasts

### In Development
1. Start the app: `npm run dev`
2. Navigate to create case page
3. Create a case to see success toast
4. Or check Storybook: `npm run storybook`

### In Storybook
1. Run: `npm run storybook`
2. Navigate to: Components > Toaster
3. Click buttons to trigger different toast types
4. Test all 8 story variants

### In Tests
```bash
npm run test -- Toaster
```

All 14 tests should pass ✅

## Troubleshooting

### Toast doesn't appear
- Check that `<Toaster />` is in App.tsx
- Verify import: `import { useToast } from '@/components/Toaster'`
- Check browser console for errors

### Toast appears in wrong position
- Check `position` prop on `<Toaster />` component
- Default is `bottom-right`

### Toast disappears too quickly/slowly
- Success/Info/Warning: 4s default
- Errors: 6s default
- Can be overridden per toast:
  ```tsx
  toast.success('Message', { duration: 2000 });
  ```

---

For code examples and API documentation, see:
- `/packages/client/src/components/Toaster/README.md`
- `TOAST_IMPLEMENTATION_SUMMARY.md`
