import figma from '@figma/code-connect';
import { Card } from './Card';

figma.connect(
  Card,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=179-29234',
  {
    props: {
      main: figma.instance('mainSlot'),
      header: figma.instance('headerSlot'),
      footer: figma.instance('footerSlot'),
    },
    example: ({ main, header, footer }) => (
      <Card header={header} main={main} footer={footer} />
    ),
  }
);
