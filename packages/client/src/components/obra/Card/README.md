# Card

A flexible Card component with automatic slot detection. Renders 1, 2, or 3 content areas based on which props you provide (header, main, footer).

## Figma Source

https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=179-29234&m=dev

**Node IDs:**
- 1 Slot variant: `55:4701`
- 2 Slots variant: `179:29232`
- 3 Slots variant: `179:29233`

## Design-to-Code Mapping

### Property Mappings

| Figma Property | Type | React Prop | Notes |
|----------------|------|------------|-------|
| mainSlot | Instance Swap | `main?: ReactNode` | Content for main/body area |
| headerSlot | Instance Swap | `header?: ReactNode` | Content for top slot (renders when provided) |
| footerSlot | Instance Swap | `footer?: ReactNode` | Content for bottom slot (renders when provided) |

**Note:** The Figma "Slot No." variant is not exposed as a prop. The component automatically determines the layout based on which slots are provided.

### Automatic Layout Detection

| Props Provided | Slots Rendered | Layout |
|----------------|----------------|--------|
| `main` only | 1 slot | main |
| `header` + `main` | 2 slots | header → main |
| `header` + `main` + `footer` | 3 slots | header → main → footer |
| `main` + `footer` | 2 slots | main → footer |

### Design Tokens

| Design Token | Value | CSS Variable | Usage |
|-------------|-------|--------------|-------|
| card/card | #ffffff | `--card` | Card background |
| general/border | #e2e8f0 | `--border` | Card border |
| semantic/rounded-lg | 8px | `--radius` | Border radius |
| semantic/xs | 8px | - | Slot padding |
| shadow-sm | - | - | Box shadow |

### Excluded Properties (Internal/CSS)

| Figma Element | Handling | Reason |
|---------------|----------|--------|
| Slot No. variant | Automatic detection | Inferred from provided props |
| Slot placeholder (purple dashed border) | Not rendered | Design aid only |
| "Slot" text | Not rendered | Design aid only |
| Fixed dimensions (328px × 384px) | Flexible | Allow responsive sizing |

## Accepted Design Differences

| Category | Figma | Implementation | File | Reason |
|----------|-------|----------------|------|--------|
| Slot count control | Explicit "Slot No." variant | Automatic detection | Card.tsx | Simpler API, less redundancy |
| Slot height | Fixed 40px | `min-h-[40px]` | Card.tsx | Allow content to expand |
| Card width | Fixed 328px | Flexible | Card.tsx | Responsive design |
| Empty slots | Purple placeholder | Not rendered | Card.tsx | Production behavior |

## Usage Example

```tsx
import { Card } from '@/components/obra/Card';

// 1-slot card (just main)
<Card main={<Content />} />

// 2-slots card (header + main)
<Card 
  header={<Header />}
  main={<Content />}
/>

// 3-slots card (header + main + footer)
<Card
  header={<Header />}
  main={<Content />}
  footer={<Footer />}
/>

// Also works with any combination
<Card main={<Content />} footer={<Actions />} />
```