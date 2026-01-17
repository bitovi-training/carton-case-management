import figma from '@figma/code-connect'
import { Calendar } from './calendar'

figma.connect(Calendar, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=288-119954', {
  props: {
    numberOfMonths: figma.enum('Months', {
      '1 Month': 1,
      '2 months': 2,
      '3 months': 3
    })
  },
  example: ({ numberOfMonths }) => (
    <Calendar
      mode="single"
      numberOfMonths={numberOfMonths}
    />
  )
})
