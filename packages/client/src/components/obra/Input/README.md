# Input

A versatile text input component supporting multiple sizes, roundness styles, validation states, and optional decorative elements.

## Figma Source

https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1738&m=dev

## Accepted Design Differences

| Category | Figma | Implementation | File | Reason |
|----------|-------|----------------|------|--------|
| Decorations | Boolean props | ReactNode props | Input.tsx | Flexible content (icons, buttons, text) |
| State | Single "State" variant | Multiple props | Input.tsx | Matches HTML semantics (disabled, error separate) |

## Design-to-Code Mapping

### Variant Mappings

| Figma Variant | Figma Value | React Prop | React Value | Notes |
|---------------|-------------|------------|-------------|-------|
| Size | Mini | `size` | `'mini'` | Height 24px (h-6), padding 8px, text-xs |
| Size | Small | `size` | `'small'` | Height 32px (h-8), padding 12px, text-sm |
| Size | Regular | `size` | `'regular'` | Height 36px (h-9), padding 16px, text-sm (default) |
| Size | Large | `size` | `'large'` | Height 40px (h-10), padding 24px, text-sm |
| Roundness | Default | `roundness` | `'default'` | Rounded corners (rounded-lg) |
| Roundness | Round | `roundness` | `'round'` | Fully rounded (rounded-full) |

### State Mappings

| Figma State | React Props | Implementation | Notes |
|-------------|-------------|----------------|-------|
| Empty | (no value) | Native empty input | Default HTML behavior |
| Placeholder | `placeholder="text"` | Native HTML attribute | Shows placeholder text |
| Value | `value="text"` | Native HTML attribute | Shows input value |
| Focus | (focus state) | CSS `:focus-visible` | Browser focus state with ring |
| Error | `error={true}` | Conditional classes | Red border + error focus ring |
| Error Focus | `error={true}` + focus | Combined state | Red border + red focus ring |
| Disabled | `disabled={true}` | Native HTML attribute | Grayed out, no interaction |

### Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| showDecorationLeft | Boolean | `leftDecoration?: ReactNode` | Optional left-side content |
| showDecorationRight | Boolean | `rightDecoration?: ReactNode` | Optional right-side content |
| showCursor | Boolean | (internal) | Browser handles cursor visibility |

### Excluded Properties (CSS/Internal)

| Figma Property | Handling | Reason |
|----------------|----------|--------|
| State: Focus | CSS `:focus-visible` | Pseudo-state handled by browser |
| State: Hover | CSS `:hover` (if needed) | Pseudo-state |
| showCursor | Browser default | Internal browser behavior |

## Design Tokens

### Effects Used
- `shadow-xs`: Base input shadow
- `focus ring`: Blue/purple focus ring (3px spread)
- `focus ring error`: Red focus ring (3px spread)

### Typography
- Mini: `paragraph mini/regular` (1.5px letter-spacing)
- Small: `paragraph small/regular` (0.5px letter-spacing)
- Regular/Large: Standard body text

## Usage Examples

See [Input.stories.tsx](./Input.stories.tsx) for comprehensive examples of all variants.
