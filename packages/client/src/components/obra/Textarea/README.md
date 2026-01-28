# Textarea

A multi-line text input component with support for different visual states (placeholder, value, error, focus, disabled), two roundness variants (default and round), and an optional resize handle.

## Figma Source

https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1745&m=dev

## Accepted Design Differences

| Category | Figma | Implementation | File | Reason |
|----------|-------|----------------|------|--------|
| States | Separate Focus/Error Focus variants | Handled by CSS pseudo-classes | Textarea.tsx | Browser handles focus automatically with :focus-visible |
| States | Separate Empty/Value/Placeholder | Controlled by value/placeholder props | Textarea.tsx | Standard React controlled component pattern |

## Design-to-Code Mapping

### Variant Mappings

| Figma Variant | Figma Value | React Prop | React Value | Notes |
|---------------|-------------|------------|-------------|-------|
| Roundness | Default | `roundness` | `'default'` | Standard border radius |
| Roundness | Round | `roundness` | `'round'` | Increased border radius |

### Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| showResizable | Boolean | `showResizable` | Controls CSS resize property (true = vertical, false = none) |
| State: Error | Boolean | `error` | Applies red border styling |
| State: Disabled | Boolean | `disabled` | Standard HTML disabled attribute |
| State: Placeholder | Text | `placeholder` | Standard HTML placeholder attribute |
| Value | Text | `value` or `defaultValue` | Content of textarea |

### Excluded Properties (CSS/Internal)

| Figma Property | Handling | Reason |
|----------------|----------|--------|
| State: Focus | CSS `:focus-visible` | Pseudo-state handled by browser |
| State: Error Focus | `error` prop + CSS `:focus-visible` | Combination of error styling and focus |
| State: Empty vs Value | Controlled by `value` prop | Standard React controlled component |

## Props API

```typescript
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  roundness?: 'default' | 'round';
  showResizable?: boolean;
  error?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  'aria-invalid'?: boolean;
  'aria-describedby'?: string;
}
```

## Usage Examples

```tsx
// Basic textarea
<Textarea placeholder="Type your message here." />

// With rounded corners
<Textarea roundness="round" placeholder="Type your message here." />

// Error state
<Textarea 
  error 
  aria-invalid={true}
  aria-describedby="error-message"
  placeholder="Type your message here."
/>

// Disabled
<Textarea disabled value="Value" />

// Non-resizable
<Textarea showResizable={false} placeholder="Fixed size textarea" />

// Controlled with error handling
<Textarea 
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  error={!!errors.message}
  roundness="round"
  placeholder="Enter your message"
/>
```

