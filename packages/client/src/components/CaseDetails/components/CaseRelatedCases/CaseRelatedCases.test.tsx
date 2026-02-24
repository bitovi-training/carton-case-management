import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouterWrapper } from '@/test/utils';
import { CaseRelatedCases } from './CaseRelatedCases';

describe('CaseRelatedCases', () => {
  it('should render the component with expanded state by default', () => {
    const wrapper = createMemoryRouterWrapper(['/cases/test-case-id']);
    render(<CaseRelatedCases caseId="test-case-id" />, { wrapper });
    
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  it('should toggle expansion when clicking the header button', async () => {
    const user = userEvent.setup();
    const wrapper = createMemoryRouterWrapper(['/cases/test-case-id']);
    render(<CaseRelatedCases caseId="test-case-id" />, { wrapper });

    const expandButton = screen.getByRole('button', { name: /Related Cases/i });
    
    // Should be expanded by default
    expect(screen.getByText('Add')).toBeInTheDocument();
    
    // Click to collapse
    await user.click(expandButton);
    
    // Content should be hidden
    await waitFor(() => {
      expect(screen.queryByText('Add')).not.toBeInTheDocument();
    });
  });

  it('should open dialog when clicking Add button', async () => {
    const user = userEvent.setup();
    const wrapper = createMemoryRouterWrapper(['/cases/test-case-id']);
    render(<CaseRelatedCases caseId="test-case-id" />, { wrapper });

    const addButton = screen.getByRole('button', { name: /Add/i });
    await user.click(addButton);

    // Dialog should open
    await waitFor(() => {
      expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
    });
  });

  it('should display loading state while fetching related cases', () => {
    const wrapper = createMemoryRouterWrapper(['/cases/test-case-id']);
    render(<CaseRelatedCases caseId="test-case-id" />, { wrapper });

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display "No related cases" when there are none', async () => {
    const wrapper = createMemoryRouterWrapper(['/cases/test-case-id']);
    render(<CaseRelatedCases caseId="test-case-id" />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText('No related cases')).toBeInTheDocument();
    });
  });
});
