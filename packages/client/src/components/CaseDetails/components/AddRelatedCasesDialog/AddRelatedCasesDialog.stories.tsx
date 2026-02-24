import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AddRelatedCasesDialog } from './AddRelatedCasesDialog';

const meta: Meta<typeof AddRelatedCasesDialog> = {
  component: AddRelatedCasesDialog,
  title: 'CaseDetails/AddRelatedCasesDialog',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    onOpenChange: fn(),
    onSave: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof AddRelatedCasesDialog>;

export const Default: Story = {
  args: {
    open: true,
    currentCaseId: 'current-case-id',
    existingRelatedCaseIds: [],
  },
};

export const WithExistingRelationships: Story = {
  args: {
    open: true,
    currentCaseId: 'current-case-id',
    existingRelatedCaseIds: ['1', '2'],
  },
};

export const Closed: Story = {
  args: {
    open: false,
    currentCaseId: 'current-case-id',
    existingRelatedCaseIds: [],
  },
};
