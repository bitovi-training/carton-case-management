import { figma } from '@figma/code-connect';
import { Input } from './Input';

figma.connect(
  Input,
  'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=16-1738&m=dev',
  {
    props: {
      size: figma.enum('Size', {
        Mini: 'mini',
        Small: 'small',
        Regular: 'regular',
        Large: 'large',
      }),
      
      roundness: figma.enum('Roundness', {
        Default: 'default',
        Round: 'round',
      }),
      error: figma.enum('State', {
        Error: true,
        'Error Focus': true,
      }),
      
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      
      placeholder: figma.enum('State', {
        Empty: '',
        Placeholder: figma.string('Placeholder text'),
      }),
    },
    
    example: (props) => <Input {...props} />,
  }
);
