import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { CaseRelatedCases } from './CaseRelatedCases';

const meta: Meta<typeof CaseRelatedCases> = {
  component: CaseRelatedCases,
  title: 'CaseDetails/CaseRelatedCases',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="w-[200px] p-4">
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
type Story = StoryObj<typeof CaseRelatedCases>;

export const Default: Story = {
  args: {
    caseId: 'case-1',
  },
};
