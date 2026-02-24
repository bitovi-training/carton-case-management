import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './toast';

function TestComponent() {
  const { showToast } = useToast();
  
  return (
    <div>
      <button
        onClick={() =>
          showToast({
            type: 'success',
            title: 'Success!',
            message: 'A new claim has been created.',
          })
        }
      >
        Show Success Toast
      </button>
      <button
        onClick={() =>
          showToast({
            type: 'error',
            title: 'Deleted',
            message: 'Test case has been successfully deleted.',
          })
        }
      >
        Show Error Toast
      </button>
    </div>
  );
}

describe('Toast System', () => {
  it('should throw error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => render(<TestComponent />)).toThrow(
      'useToast must be used within a ToastProvider'
    );
    
    consoleError.mockRestore();
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
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  it('should show error toast when triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const button = screen.getByText('Show Error Toast');
    await user.click(button);

    expect(screen.getByText('Deleted')).toBeInTheDocument();
    expect(screen.getByText('Test case has been successfully deleted.')).toBeInTheDocument();
    expect(screen.getByText('Dismiss')).toBeInTheDocument();
  });

  it('should manually dismiss toast when Dismiss button is clicked', async () => {
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

  it('should stack multiple toasts vertically', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Show success toast
    const successButton = screen.getByText('Show Success Toast');
    await user.click(successButton);

    // Show error toast
    const errorButton = screen.getByText('Show Error Toast');
    await user.click(errorButton);

    // Both toasts should be visible
    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Deleted')).toBeInTheDocument();
    expect(screen.getAllByText('Dismiss')).toHaveLength(2);
  });

  it('should dismiss individual toasts in a stack', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    // Show two toasts
    await user.click(screen.getByText('Show Success Toast'));
    await user.click(screen.getByText('Show Error Toast'));

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByText('Deleted')).toBeInTheDocument();

    // Dismiss first toast (success)
    const dismissButtons = screen.getAllByText('Dismiss');
    await user.click(dismissButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Success!')).not.toBeInTheDocument();
    });

    // Error toast should still be visible
    expect(screen.getByText('Deleted')).toBeInTheDocument();
  });
});
