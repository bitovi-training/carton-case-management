import figma from '@figma/code-connect'
import { Label } from './label'

figma.connect(Label, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=103-9453', {
  props: {
    children: figma.textContent('Label')
  },
  example: ({ children }) => (
    <Label>{children}</Label>
  )
})
