import figma from '@figma/code-connect'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from './select'

figma.connect(SelectTrigger, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=16-1732', {
  props: {
    placeholder: figma.textContent('Select an item'),
    disabled: figma.enum('State', {
      'Disabled': true
    })
  },
  example: ({ placeholder, disabled }) => (
    <Select disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  )
})
