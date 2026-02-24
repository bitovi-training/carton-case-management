import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRelatedCasesDialog } from './AddRelatedCasesDialog';
import { createTrpcWrapper } from '@/test/utils';

const mockCases = [
  {
    id: '1',
    title: 'Case 1',
    status: 'TO_DO' as const,
    priority: 'MEDIUM' as const,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    customerId: 'customer-1',
    customer: { id: 'customer-1', firstName: 'John', lastName: 'Doe' },
    creator: { id: 'user-1', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    assignee: null,
    description: 'Description 1',
    createdBy: 'user-1',
    assignedTo: null,
  },
  {
    id: '2',
    title: 'Case 2',
    status: 'IN_PROGRESS' as const,
    priority: 'HIGH' as const,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    customerId: 'customer-1',
    customer: { id: 'customer-1', firstName: 'John', lastName: 'Doe' },
    creator: { id: 'user-1', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
    assignee: null,
    description: 'Description 2',
    createdBy: 'user-1',
    assignedTo: null,
  },
];

describe('AddRelatedCasesDialog', () => {
  it('renders dialog when open', () => {
    const onSave = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={onOpenChange}
        currentCaseId="current-case"
        existingRelatedCaseIds={[]}
        onSave={onSave}
      />,
      { wrapper: createTrpcWrapper({ cases: mockCases }) }
    );

    expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
  });

  it('filters out current case from list', () => {
    const onSave = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={onOpenChange}
        currentCaseId="1"
        existingRelatedCaseIds={[]}
        onSave={onSave}
      />,
      { wrapper: createTrpcWrapper({ cases: mockCases }) }
    );

    expect(screen.queryByText('Case 1')).not.toBeInTheDocument();
    expect(screen.getByText('Case 2')).toBeInTheDocument();
  });

  it('pre-checks existing related cases', () => {
    const onSave = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={onOpenChange}
        currentCaseId="current-case"
        existingRelatedCaseIds={['1']}
        onSave={onSave}
      />,
      { wrapper: createTrpcWrapper({ cases: mockCases }) }
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes[0]).toBeChecked();
    expect(checkboxes[1]).not.toBeChecked();
  });

  it('calls onSave with selected case IDs', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={onOpenChange}
        currentCaseId="current-case"
        existingRelatedCaseIds={[]}
        onSave={onSave}
      />,
      { wrapper: createTrpcWrapper({ cases: mockCases }) }
    );

    // Select first case
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // Click Add button
    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(onSave).toHaveBeenCalledWith(['1']);
  });

  it('resets selection on cancel', async () => {
    const user = userEvent.setup();
    const onSave = vi.fn();
    const onOpenChange = vi.fn();

    render(
      <AddRelatedCasesDialog
        open={true}
        onOpenChange={onOpenChange}
        currentCaseId="current-case"
        existingRelatedCaseIds={['1']}
        onSave={onSave}
      />,
      { wrapper: createTrpcWrapper({ cases: mockCases }) }
    );

    // Uncheck the pre-selected case
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);

    // Click close button
    const closeButton = screen.getByRole('button', { name: '' }); // X button has no text
    await user.click(closeButton);

    expect(onSave).not.toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
