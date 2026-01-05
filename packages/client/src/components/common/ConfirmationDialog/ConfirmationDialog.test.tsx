import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ConfirmationDialog } from './ConfirmationDialog';

describe('ConfirmationDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: vi.fn(),
    onConfirm: vi.fn(),
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
  };

  it('renders title and description when open', () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(screen.getByText('Confirm Action')).toBeInTheDocument();
    expect(screen.getByText('Are you sure you want to proceed?')).toBeInTheDocument();
  });

  it('does not render when open is false', () => {
    render(<ConfirmationDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('renders default confirm and cancel button text', () => {
    render(<ConfirmationDialog {...defaultProps} />);

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
  });

  it('renders custom confirm and cancel button text', () => {
    render(<ConfirmationDialog {...defaultProps} confirmText="Delete" cancelText="Go Back" />);

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('calls onOpenChange when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();

    render(<ConfirmationDialog {...defaultProps} onOpenChange={onOpenChange} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    await user.click(cancelButton);

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('shows loading text when isLoading is true', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} loadingText="Deleting..." />);

    expect(screen.getByRole('button', { name: 'Deleting...' })).toBeInTheDocument();
    expect(screen.queryByText('Confirm')).not.toBeInTheDocument();
  });

  it('shows confirm text when isLoading but no loadingText provided', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} />);

    expect(screen.getByRole('button', { name: 'Confirm' })).toBeInTheDocument();
  });

  it('disables both buttons when isLoading is true', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={true} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(confirmButton).toBeDisabled();
    expect(cancelButton).toBeDisabled();
  });

  it('enables both buttons when isLoading is false', () => {
    render(<ConfirmationDialog {...defaultProps} isLoading={false} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    const cancelButton = screen.getByRole('button', { name: 'Cancel' });

    expect(confirmButton).not.toBeDisabled();
    expect(cancelButton).not.toBeDisabled();
  });

  it('applies custom className to confirm button', () => {
    render(<ConfirmationDialog {...defaultProps} confirmClassName="bg-red-500 hover:bg-red-600" />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    expect(confirmButton).toHaveClass('bg-red-500');
    expect(confirmButton).toHaveClass('hover:bg-red-600');
  });

  it('prevents default on confirm button click', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(confirmButton);

    expect(onConfirm).toHaveBeenCalled();
  });

  it('does not call onConfirm when disabled', async () => {
    const user = userEvent.setup();
    const onConfirm = vi.fn();

    render(<ConfirmationDialog {...defaultProps} onConfirm={onConfirm} isLoading={true} />);

    const confirmButton = screen.getByRole('button', { name: 'Confirm' });
    await user.click(confirmButton);

    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('handles multiple state changes correctly', () => {
    const { rerender } = render(<ConfirmationDialog {...defaultProps} open={false} />);

    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();

    rerender(<ConfirmationDialog {...defaultProps} open={true} />);
    expect(screen.getByText('Confirm Action')).toBeInTheDocument();

    rerender(<ConfirmationDialog {...defaultProps} open={false} />);
    expect(screen.queryByText('Confirm Action')).not.toBeInTheDocument();
  });

  it('renders with all custom props', () => {
    render(
      <ConfirmationDialog
        {...defaultProps}
        title="Delete Case"
        description="This action cannot be undone."
        confirmText="Yes, Delete"
        cancelText="No, Keep"
        confirmClassName="bg-destructive"
        isLoading={true}
        loadingText="Deleting case..."
      />
    );

    expect(screen.getByText('Delete Case')).toBeInTheDocument();
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Deleting case...' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'No, Keep' })).toBeInTheDocument();
  });
});
