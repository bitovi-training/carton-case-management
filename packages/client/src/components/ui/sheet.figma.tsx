import figma from '@figma/code-connect'
import { Sheet } from './sheet'

figma.connect(Sheet, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=301-243831', {
  props: {
    children: figma.children('*')
  },
  example: ({ children }) => (
    <Sheet open={true} onOpenChange={() => {}}>
      {children}
    </Sheet>
  )
})
