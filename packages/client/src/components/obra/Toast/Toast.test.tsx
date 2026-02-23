import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Toast } from './Toast';

describe('Toast', () => {
  it('should render success toast with title and description', () => {
    render(
      <Toast
        variant="success"
        title="Success!"
        description="A new claim has been created."
      />
    );

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('A new claim has been created.')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('should render destructive toast', () => {
    render(
      <Toast
        variant="destructive"
        title="Deleted"
        description='"Test Case" case has been successfully deleted.'
      />
    );

    expect(screen.getByText('Deleted')).toBeInTheDocument();
    expect(screen.getByText('"Test Case" case has been successfully deleted.')).toBeInTheDocument();
  });

  it('should call onDismiss when Dismiss button is clicked', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();

    render(
      <Toast
        variant="success"
        title="Success!"
        description="Test message"
        onDismiss={handleDismiss}
      />
    );

    const dismissButton = screen.getByRole('button', { name: /dismiss/i });
    await user.click(dismissButton);

    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('should render with custom icon', () => {
    const CustomIcon = () => <span data-testid="custom-icon">🎉</span>;

    render(
      <Toast
        variant="success"
        title="Success!"
        description="Test message"
        icon={<CustomIcon />}
      />
    );

    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('should render default success icon when no icon provided', () => {
    const { container } = render(
      <Toast
        variant="success"
        title="Success!"
        description="Test message"
      />
    );

    // CheckCircle2 icon should be rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should render default destructive icon when no icon provided', () => {
    const { container } = render(
      <Toast
        variant="destructive"
        title="Deleted"
        description="Test message"
      />
    );

    // Trash2 icon should be rendered
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(
      <Toast
        variant="success"
        title="Success!"
        description="Test message"
      />
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveAttribute('aria-live', 'polite');
    expect(alert).toHaveAttribute('aria-atomic', 'true');
  });
});
