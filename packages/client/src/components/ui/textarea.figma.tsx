import figma from '@figma/code-connect'
import { Textarea } from './textarea'

figma.connect(Textarea, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=16-1745', {
  props: {
    disabled: figma.enum('State', {
      'Disabled': true
    })
  },
  example: ({ disabled }) => (
    <Textarea placeholder="Enter text..." disabled={disabled} />
  )
})
