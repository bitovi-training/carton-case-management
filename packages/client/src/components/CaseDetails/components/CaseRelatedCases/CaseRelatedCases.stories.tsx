import type { Meta, StoryObj } from '@storybook/react';
import { CaseRelatedCases } from './CaseRelatedCases';

const meta: Meta<typeof CaseRelatedCases> = {
  component: CaseRelatedCases,
  title: 'CaseDetails/CaseRelatedCases',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof CaseRelatedCases>;

export const Default: Story = {
  args: {
    caseId: 'case-1',
    customerId: 'customer-1',
  },
};
