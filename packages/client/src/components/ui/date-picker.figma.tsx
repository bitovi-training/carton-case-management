import figma from '@figma/code-connect'
import { DatePicker } from './date-picker'

figma.connect(DatePicker, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=288-119954', {
  example: () => (
    <DatePicker
      placeholder="Select date"
      onChange={(date) => console.log(date)}
    />
  )
})
