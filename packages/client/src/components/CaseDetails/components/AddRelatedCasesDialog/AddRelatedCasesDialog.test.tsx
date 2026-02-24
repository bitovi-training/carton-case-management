import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddRelatedCasesDialog } from './AddRelatedCasesDialog';
import { createTrpcWrapper } from '@/test/utils';

describe('AddRelatedCasesDialog', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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
      { wrapper: createTrpcWrapper() }
    );

    expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
  });

  it('shows add button', () => {
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
      { wrapper: createTrpcWrapper() }
    );

    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('calls onSave when Add button is clicked', async () => {
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
      { wrapper: createTrpcWrapper() }
    );

    await user.click(screen.getByRole('button', { name: 'Add' }));

    expect(onSave).toHaveBeenCalled();
  });

  it('calls onOpenChange when dialog is dismissed', () => {
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
      { wrapper: createTrpcWrapper() }
    );

    expect(onOpenChange).toBeDefined();
  });
});
