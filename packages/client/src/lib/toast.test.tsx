import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ToastProvider, useToast } from './toast';
import { act } from 'react';

// Helper component to test useToast hook
function ToastTestComponent() {
  const { showToast } = useToast();

  return (
    <div>
      <button onClick={() => showToast({ type: 'success', message: 'Success message' })}>
        Show Success
      </button>
      <button onClick={() => showToast({ type: 'error', message: 'Error message' })}>
        Show Error
      </button>
      <button onClick={() => showToast({ type: 'warning', message: 'Warning message' })}>
        Show Warning
      </button>
      <button onClick={() => showToast({ type: 'info', message: 'Info message' })}>
        Show Info
      </button>
      <button 
        onClick={() => showToast({ 
          type: 'success', 
          message: 'With description', 
          description: 'This is a description' 
        })}
      >
        Show With Description
      </button>
      <button 
        onClick={() => showToast({ 
          type: 'success', 
          message: 'Custom duration', 
          duration: 1000 
        })}
      >
        Show Custom Duration
      </button>
    </div>
  );
}

describe('ToastProvider and useToast', () => {
  it('should throw error when useToast is used outside ToastProvider', () => {
    // Suppress console.error for this test
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<ToastTestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');
    
    consoleError.mockRestore();
  });

  it('should display success toast when triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should display error toast when triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Error'));

    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should display warning toast when triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Warning'));

    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('should display info toast when triggered', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Info'));

    expect(screen.getByText('Info message')).toBeInTheDocument();
  });

  it('should display toast with description', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show With Description'));

    expect(screen.getByText('With description')).toBeInTheDocument();
    expect(screen.getByText('This is a description')).toBeInTheDocument();
  });

  it('should allow manual dismissal of toast', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));
    expect(screen.getByText('Success message')).toBeInTheDocument();

    const dismissButton = screen.getByLabelText('Dismiss notification');
    await user.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
  });

  it('should auto-dismiss toast after timeout', async () => {
    // This test uses a very short timeout and real timers
    render(
      <ToastProvider defaultDuration={100}>
        <ToastTestComponent />
      </ToastProvider>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Show Success'));
    
    expect(screen.getByText('Success message')).toBeInTheDocument();

    // Wait for auto-dismiss
    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    }, { timeout: 200 });
  });

  it('should display multiple toasts simultaneously', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider defaultDuration={10000}>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));
    await user.click(screen.getByText('Show Error'));
    await user.click(screen.getByText('Show Warning'));

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
    expect(screen.getByText('Warning message')).toBeInTheDocument();
  });

  it('should dismiss individual toasts independently', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider defaultDuration={10000}>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));
    await user.click(screen.getByText('Show Error'));

    expect(screen.getByText('Success message')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();

    // Dismiss only the first toast
    const dismissButtons = screen.getAllByLabelText('Dismiss notification');
    await user.click(dismissButtons[0]);

    await waitFor(() => {
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
    });
    
    // Error toast should still be visible
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', async () => {
    const user = userEvent.setup();
    
    render(
      <ToastProvider defaultDuration={10000}>
        <ToastTestComponent />
      </ToastProvider>
    );

    await user.click(screen.getByText('Show Success'));

    const toastContainer = screen.getByRole('status');
    expect(toastContainer).toHaveAttribute('aria-live', 'polite');
  });
});
