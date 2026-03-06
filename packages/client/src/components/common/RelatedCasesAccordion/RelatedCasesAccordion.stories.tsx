import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { RelatedCasesAccordion } from './RelatedCasesAccordion';

const meta: Meta<typeof RelatedCasesAccordion> = {
  component: RelatedCasesAccordion,
  title: 'Components/Common/RelatedCasesAccordion',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[300px] p-4">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof RelatedCasesAccordion>;

const mockCases = [
  {
    id: 'abc12345',
    title: 'Policy Coverage Inquiry',
    status: 'TO_DO',
    priority: 'HIGH',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'def67890',
    title: 'Premium Adjustment Request',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: new Date('2024-02-20').toISOString(),
  },
];

export const Default: Story = {
  args: {
    cases: mockCases,
  },
};

export const WithAddButton: Story = {
  args: {
    cases: mockCases,
    onAddClick: () => console.log('Add clicked'),
  },
};

export const Empty: Story = {
  args: {
    cases: [],
    onAddClick: () => console.log('Add clicked'),
  },
};
