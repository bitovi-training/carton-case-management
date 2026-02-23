import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { Toaster, showSuccess, showError, showInfo, showWarning, showToast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Toaster component', () => {
    it('should render Toaster component', () => {
      const { container } = render(<Toaster />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('showSuccess', () => {
    it('should display success toast with message', async () => {
      render(<Toaster />);
      
      showSuccess('Operation completed successfully');
      
      await waitFor(() => {
        expect(screen.getByText('Operation completed successfully')).toBeInTheDocument();
      });
    });

    it('should display success toast with description', async () => {
      render(<Toaster />);
      
      showSuccess('Success', { description: 'Your changes have been saved' });
      
      await waitFor(() => {
        expect(screen.getByText('Success')).toBeInTheDocument();
        expect(screen.getByText('Your changes have been saved')).toBeInTheDocument();
      });
    });

    it('should display success toast with custom duration', async () => {
      render(<Toaster />);
      
      showSuccess('Quick message', { duration: 2000 });
      
      await waitFor(() => {
        expect(screen.getByText('Quick message')).toBeInTheDocument();
      });
    });
  });

  describe('showError', () => {
    it('should display error toast with message', async () => {
      render(<Toaster />);
      
      showError('An error occurred');
      
      await waitFor(() => {
        expect(screen.getByText('An error occurred')).toBeInTheDocument();
      });
    });

    it('should display error toast with description', async () => {
      render(<Toaster />);
      
      showError('Error', { description: 'Failed to save changes' });
      
      await waitFor(() => {
        expect(screen.getByText('Error')).toBeInTheDocument();
        expect(screen.getByText('Failed to save changes')).toBeInTheDocument();
      });
    });
  });

  describe('showInfo', () => {
    it('should display info toast with message', async () => {
      render(<Toaster />);
      
      showInfo('Information message');
      
      await waitFor(() => {
        expect(screen.getByText('Information message')).toBeInTheDocument();
      });
    });

    it('should display info toast with description', async () => {
      render(<Toaster />);
      
      showInfo('Info', { description: 'Additional information' });
      
      await waitFor(() => {
        expect(screen.getByText('Info')).toBeInTheDocument();
        expect(screen.getByText('Additional information')).toBeInTheDocument();
      });
    });
  });

  describe('showWarning', () => {
    it('should display warning toast with message', async () => {
      render(<Toaster />);
      
      showWarning('Warning message');
      
      await waitFor(() => {
        expect(screen.getByText('Warning message')).toBeInTheDocument();
      });
    });

    it('should display warning toast with description', async () => {
      render(<Toaster />);
      
      showWarning('Warning', { description: 'Please review your input' });
      
      await waitFor(() => {
        expect(screen.getByText('Warning')).toBeInTheDocument();
        expect(screen.getByText('Please review your input')).toBeInTheDocument();
      });
    });
  });

  describe('showToast', () => {
    it('should display info toast by default', async () => {
      render(<Toaster />);
      
      showToast('Default toast');
      
      await waitFor(() => {
        expect(screen.getByText('Default toast')).toBeInTheDocument();
      });
    });

    it('should display success toast when type is success', async () => {
      render(<Toaster />);
      
      showToast('Success toast', { type: 'success' });
      
      await waitFor(() => {
        expect(screen.getByText('Success toast')).toBeInTheDocument();
      });
    });

    it('should display error toast when type is error', async () => {
      render(<Toaster />);
      
      showToast('Error toast', { type: 'error' });
      
      await waitFor(() => {
        expect(screen.getByText('Error toast')).toBeInTheDocument();
      });
    });

    it('should display warning toast when type is warning', async () => {
      render(<Toaster />);
      
      showToast('Warning toast', { type: 'warning' });
      
      await waitFor(() => {
        expect(screen.getByText('Warning toast')).toBeInTheDocument();
      });
    });
  });

  describe('Toast actions', () => {
    it('should render action button when action is provided', async () => {
      render(<Toaster />);
      
      showSuccess('Success with action', {
        action: {
          label: 'Undo',
          onClick: vi.fn(),
        },
      });
      
      await waitFor(() => {
        expect(screen.getByText('Success with action')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
      });
    });
  });
});
