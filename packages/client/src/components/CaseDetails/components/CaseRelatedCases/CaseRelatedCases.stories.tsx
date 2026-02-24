import type { Meta, StoryObj } from '@storybook/react';
import { CaseRelatedCases } from './CaseRelatedCases';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof CaseRelatedCases> = {
  component: CaseRelatedCases,
  title: 'CaseDetails/CaseRelatedCases',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div className="w-[200px] p-4 bg-gray-50">
          <Story />
        </div>
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CaseRelatedCases>;

export const Default: Story = {
  args: {
    caseId: 'test-case-id',
  },
};

export const Expanded: Story = {
  args: {
    caseId: 'test-case-id',
  },
};

export const WithRelatedCases: Story = {
  args: {
    caseId: 'test-case-id',
  },
};
