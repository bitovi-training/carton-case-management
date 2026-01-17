import figma from '@figma/code-connect'
import { Button } from './button'

figma.connect(Button, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=9-1071', {
  props: {
    variant: figma.enum('Variant', {
      'Primary': 'default',
      'Secondary': 'secondary',
      'Outline': 'outline',
      'Ghost': 'ghost',
      'Ghost Muted': 'ghost',
      'Destructive': 'destructive'
    }),
    size: figma.enum('Size', {
      'Regular': 'default',
      'Large': 'lg',
      'Small': 'sm',
      'Mini': 'sm'
    }),
    disabled: figma.enum('State', {
      'Disabled': true
    }),
    children: figma.textContent('Label')
  },
  example: ({ variant, size, disabled, children }) => (
    <Button variant={variant} size={size} disabled={disabled}>
      {children}
    </Button>
  )
})
