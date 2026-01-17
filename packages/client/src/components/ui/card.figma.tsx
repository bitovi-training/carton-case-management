import figma from '@figma/code-connect'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './card'

figma.connect(Card, 'https://figma.com/design/MQUbIrlfuM8qnr9XZ7jc82?node-id=179-29234', {
  props: {
    children: figma.children('*')
  },
  example: ({ children }) => (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter>
        Footer content
      </CardFooter>
    </Card>
  )
})
