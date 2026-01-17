import figma from '@figma/code-connect'
import { Input } from './input'

figma.connect(Input, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=16-1738', {
  props: {
    disabled: figma.enum('State', {
      'Disabled': true
    })
  },
  example: ({ disabled }) => (
    <Input placeholder="Enter text..." disabled={disabled} />
  )
})
