import figma from '@figma/code-connect';
import { Textarea } from './Textarea';

figma.connect(
  Textarea,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1745',
  {
    props: {
      roundness: figma.enum('Roundness', {
        Default: 'default',
        Round: 'round',
      }),
      showResizable: figma.boolean('showResizable'),
      error: figma.enum('State', {
        Error: true,
        'Error Focus': true,
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      placeholder: figma.enum('State', {
        Placeholder: 'Type your message here.',
      }),
      defaultValue: figma.enum('State', {
        Value: 'Value',
        Focus: 'Value',
        Error: 'Value',
        'Error Focus': 'Value',
        Disabled: 'Value',
      }),
    },
    example: ({ roundness, showResizable, error, disabled, placeholder, defaultValue }) => (
      <Textarea
        roundness={roundness}
        showResizable={showResizable}
        error={error}
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    ),
  }
);

