import figma from '@figma/code-connect';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './index';

figma.connect(
  Tooltip,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133:14788',
  {
    props: {
      side: figma.enum('Side', {
        Top: 'top',
        Bottom: 'bottom',
        Left: 'left',
        Right: 'right',
      }),
    },

    example: ({ side }) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>Hover me</TooltipTrigger>
          <TooltipContent side={side}>
            Tooltip text
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  }
);

figma.connect(
  TooltipContent,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133:14785',
  {
    props: {
      children: figma.string('Tooltip text'),
    },
    example: ({ children }) => (
      <TooltipContent side="top">
        {children}
      </TooltipContent>
    ),
  }
);

figma.connect(
  TooltipContent,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133:14787',
  {
    props: {
      children: figma.string('Tooltip text'),
    },
    example: ({ children }) => (
      <TooltipContent side="bottom">
        {children}
      </TooltipContent>
    ),
  }
);

figma.connect(
  TooltipContent,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133:14786',
  {
    props: {
      children: figma.string('Tooltip text'),
    },
    example: ({ children }) => (
      <TooltipContent side="left">
        {children}
      </TooltipContent>
    ),
  }
);

figma.connect(
  TooltipContent,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133:14784',
  {
    props: {
      children: figma.string('Tooltip text'),
    },
    example: ({ children }) => (
      <TooltipContent side="right">
        {children}
      </TooltipContent>
    ),
  }
);
