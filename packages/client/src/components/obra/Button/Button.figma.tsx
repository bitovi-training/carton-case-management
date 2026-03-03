import figma from '@figma/code-connect';
import { Button } from './Button';

figma.connect(
  Button,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=9:1071',
  {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Outline: 'outline',
      Ghost: 'ghost',
      'Ghost Muted': 'ghost-muted',
      Destructive: 'destructive',
    }),

    size: figma.enum('Size', {
      Large: 'large',
      Regular: 'regular',
      Small: 'small',
      Mini: 'mini',
    }),

    roundness: figma.enum('Roundness', {
      Default: 'default',
      Round: 'round',
    }),

    disabled: figma.enum('State', {
      Disabled: true,
    }),

    children: figma.textContent('Label'),

    leftIcon: figma.boolean('Show left icon', {
      true: figma.instance('⮑ Left icon'),
      false: undefined,
    }),

    rightIcon: figma.boolean('Show right icon', {
      true: figma.instance('⮑ Right icon'),
      false: undefined,
    }),
  },

  example: ({ variant, size, roundness, disabled, children, leftIcon, rightIcon }) => (
    <Button
      variant={variant}
      size={size}
      roundness={roundness}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </Button>
  ),
}
);

// Riot Training version
// NOTE: Config must be duplicated inline - Figma Code Connect requires object literals.
// This connection will be removed once Riot training is complete.
figma.connect(
  Button,
  'https://www.figma.com/design/W2OPvGxXCtbFPP8wYxezX1/Riot-Games-Obra-shadcn-ui?node-id=9-1071',
  {
  props: {
    variant: figma.enum('Variant', {
      Primary: 'primary',
      Secondary: 'secondary',
      Outline: 'outline',
      Ghost: 'ghost',
      'Ghost Muted': 'ghost-muted',
      Destructive: 'destructive',
    }),

    size: figma.enum('Size', {
      Large: 'large',
      Regular: 'regular',
      Small: 'small',
      Mini: 'mini',
    }),

    roundness: figma.enum('Roundness', {
      Default: 'default',
      Round: 'round',
    }),

    disabled: figma.enum('State', {
      Disabled: true,
    }),

    children: figma.textContent('Label'),

    leftIcon: figma.boolean('Show left icon', {
      true: figma.instance('⮑ Left icon'),
      false: undefined,
    }),

    rightIcon: figma.boolean('Show right icon', {
      true: figma.instance('⮑ Right icon'),
      false: undefined,
    }),
  },

  example: ({ variant, size, roundness, disabled, children, leftIcon, rightIcon }) => (
    <Button
      variant={variant}
      size={size}
      roundness={roundness}
      disabled={disabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    >
      {children}
    </Button>
  ),
}
);

