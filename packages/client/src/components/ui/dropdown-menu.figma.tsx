import figma from '@figma/code-connect'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from './dropdown-menu'
import { Button } from './button'

figma.connect(DropdownMenuContent, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=176-27848', {
  props: {
    children: figma.children('*')
  },
  example: ({ children }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Item 1</DropdownMenuItem>
        <DropdownMenuItem>Item 2</DropdownMenuItem>
        <DropdownMenuItem>Item 3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
})
