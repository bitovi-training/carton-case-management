import figma from '@figma/code-connect'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from './tooltip'
import { Button } from './button'

figma.connect(TooltipContent, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=133-14788', {
  props: {
    side: figma.enum('Side', {
      'Top': 'top',
      'Bottom': 'bottom',
      'Left': 'left',
      'Right': 'right'
    }),
    content: figma.textContent('Tooltip text')
  },
  example: ({ side, content }) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p>{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
})
