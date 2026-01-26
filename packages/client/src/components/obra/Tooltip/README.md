# Tooltip

A compound component system that displays contextual information in a popover when hovering over a trigger element. The tooltip can be positioned on any of the four sides (top, bottom, left, right) relative to its trigger, with an arrow pointing to the trigger element.

## Figma Source

https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133-14788&m=dev

## Component Structure

This is a compound component pattern with four sub-components:

1. **TooltipProvider** - Context provider for managing tooltip state
2. **Tooltip** - Main container that coordinates trigger and content  
3. **TooltipTrigger** - The interactive element that triggers the tooltip
4. **TooltipContent** - The actual tooltip popover with positioning

## Accepted Design Differences

| Category | Figma | Implementation | File | Reason |
|----------|-------|----------------|------|--------|
| Background | Solid black | `bg-popover` | TooltipContent.tsx | Use theme color tokens |
| Text | White | `text-popover-foreground` | TooltipContent.tsx | Use theme color tokens |
| Animation | Not specified | Fade + zoom + slide | TooltipContent.tsx | Better UX with entrance animations |

## Design-to-Code Mapping

### TooltipContent - Variant Mappings

| Figma Variant | Figma Value | React Prop | React Value | Notes |
|---------------|-------------|------------|-------------|-------|
| Side | Top | `side` | `'top'` | Tooltip appears above trigger (default) |
| Side | Bottom | `side` | `'bottom'` | Tooltip appears below trigger |
| Side | Left | `side` | `'left'` | Tooltip appears to the left of trigger |
| Side | Right | `side` | `'right'` | Tooltip appears to the right of trigger |

### TooltipContent - Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| Tooltip text | Text | `children` | Content to display |
| (positioning) | N/A | `sideOffset` | Distance from trigger (4px default) |
| (positioning) | N/A | `align` | Alignment along side axis |
| (positioning) | N/A | `avoidCollisions` | Auto-adjust to stay in viewport |

### TooltipTrigger - Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| Hover me | Text | `children` | Trigger element content |
| (integration) | N/A | `asChild` | Merge props onto child element |

### TooltipProvider - Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| (timing) | N/A | `delayDuration` | Delay before showing (700ms default) |
| (timing) | N/A | `skipDelayDuration` | Skip delay between tooltips (300ms) |
| (behavior) | N/A | `disableHoverableContent` | Prevent hovering over tooltip |

### Excluded Properties (Built-in Behavior)

| Figma Property | Handling | Reason |
|----------------|----------|--------|
| Hover interaction | Radix UI behavior | Built into Tooltip.Trigger |
| Arrow direction | Automatic | Determined by `side` prop |
| Open/close animation | CSS animations | data-[state] selectors |
| Portal rendering | Radix UI Portal | Prevents z-index issues |

## Typography & Styling

Based on Figma design tokens:

- **Font**: Inter Regular
- **Font size**: 12px (`text-xs`)
- **Line height**: 16px
- **Letter spacing**: 0.18px (handled by design system)
- **Background**: Dark/black (`bg-popover`)
- **Text color**: White (`text-popover-foreground`)
- **Border radius**: Rounded (`rounded-md`)
- **Padding**: `px-3 py-1.5`
- **Shadow**: `shadow-md`

## Usage Examples

### Basic Tooltip

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>Hover me</TooltipTrigger>
    <TooltipContent side="top">
      Tooltip text
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Tooltip on Button

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">
        <InfoIcon />
      </Button>
    </TooltipTrigger>
    <TooltipContent side="bottom">
      More information about this action
    </TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Multiple Tooltips (Shared Provider)

```tsx
<TooltipProvider>
  <Tooltip>
    <TooltipTrigger>First</TooltipTrigger>
    <TooltipContent>First tooltip</TooltipContent>
  </Tooltip>
  
  <Tooltip>
    <TooltipTrigger>Second</TooltipTrigger>
    <TooltipContent side="right">Second tooltip</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Controlled Tooltip

```tsx
<TooltipProvider>
  <Tooltip open={isOpen} onOpenChange={setIsOpen}>
    <TooltipTrigger>Controlled</TooltipTrigger>
    <TooltipContent>This tooltip is controlled</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

## Accessibility

- Supports keyboard navigation (focus on trigger shows tooltip)
- Includes proper ARIA attributes
- Screen reader compatible
- ESC key dismisses tooltip
- Works with `asChild` for semantic HTML

## Related Components

- [Button](/packages/client/src/components/obra/Button) - Often used as trigger element
- All obra components that might need tooltips for additional context
