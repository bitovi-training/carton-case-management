import figma from '@figma/code-connect';
import { EditableText } from './EditableText';

figma.connect(
  EditableText,
  'https://www.figma.com/design/7QW0kJ07DcM36mgQUJ5Dtj/Carton-Case-Management?node-id=1261-9396',
  {
    props: {
      label: figma.textContent('Label'),
      value: figma.textContent('Content area'),
    },
    example: ({ label, value }) => (
      <EditableText
        label={label}
        value={value}
        onSave={async (newValue) => {
          // Save handler
        }}
      />
    ),
  }
);
