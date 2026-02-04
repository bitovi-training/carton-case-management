import figma from '@figma/code-connect';
import { AddRelatedCasesDialog } from './AddRelatedCasesDialog';

figma.connect(
  AddRelatedCasesDialog,
  'https://www.figma.com/design/7QW0kJ07DcM36mgQUJ5Dtj/Carton-Case-Management?node-id=1043-1742',
  {
    props: {},
    example: () => (
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={() => {}}
        cases={[
          {
            id: '1',
            title: 'Policy Coverage Inquiry',
            caseNumber: '#CAS-242315-2125',
          },
          {
            id: '2',
            title: 'Premium Adjustment Request',
            caseNumber: '#CAS-242315-2126',
          },
        ]}
        selectedCases={['1']}
        onSelectionChange={() => {}}
        onAdd={() => {}}
      />
    ),
  }
);
