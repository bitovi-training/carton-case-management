import figma from '@figma/code-connect';
import { Label } from './Label';

figma.connect(
  Label,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=103-9453&m=dev',
  {
    props: {
      layout: figma.enum('Layout', {
        Inline: 'inline',
        Block: 'block',
      }),
      children: figma.textContent('Label'),
    },
    example: ({ layout, children }) => <Label layout={layout}>{children}</Label>,
  }
);

