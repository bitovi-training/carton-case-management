import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from '@/lib/toast';
import { CheckCircle, Trash } from 'lucide-react';

// Test component to trigger toasts
function TestComponent() {
  const { showToast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          showToast({
            type: 'Success',
            title: 'Success!',
            description: 'A new claim has been created.',
            icon: <CheckCircle className="h-4 w-4" />,
          })
        }
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          showToast({
            type: 'Error',
            title: 'Deleted',
            description: '"Test Case" case has been successfully deleted.',
            icon: <Trash className="h-4 w-4" />,
          })
        }
      >
        Show Delete Toast
      </button>
    </div>
  );
}

describe('Toast System', () => {
  it('should throw error when useToast is used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error;
    console.error = vi.fn();

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    console.error = originalError;
  });

  it('should show success toast when triggered', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success Toast');
    await user.click(button);

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('A new claim has been created.')).toBeInTheDocument();
  });

  it('should show delete toast with case name when triggered', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Delete Toast');
    await user.click(button);

    expect(screen.getByText('Deleted')).toBeInTheDocument();
    expect(
      screen.getByText('"Test Case" case has been successfully deleted.')
    ).toBeInTheDocument();
  });

  it('should dismiss toast when Dismiss button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const showButton = screen.getByText('Show Success Toast');
    await user.click(showButton);

    expect(screen.getByText('Success!')).toBeInTheDocument();

    const dismissButton = screen.getByText('Dismiss');
    await user.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });
  });

  it('should auto-dismiss toast after 5 seconds', async () => {
    vi.useFakeTimers();

    const user = userEvent.setup({ delay: null });
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Success Toast');
    await user.click(button);

    expect(screen.getByText('Success!')).toBeInTheDocument();

    // Fast-forward 5 seconds
    vi.advanceTimersByTime(5000);

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });

    vi.useRealTimers();
  });
});
