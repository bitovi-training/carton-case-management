import { describe, it, expect } from 'vitest';
import { renderWithTrpc } from '@/test/utils';
import { screen } from '@testing-library/react';
import { CaseComments } from './CaseComments';

describe('CaseComments', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      id: '1',
      title: 'Test Case',
      description: 'Test Description',
      status: 'TO_DO' as const,
      priority: 'MEDIUM' as const,
      customerId: '1',
      createdBy: '1',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        id: '1',
        firstName: 'Test',
        lastName: 'Customer',
      },
      creator: {
        id: '1',
        firstName: 'Test',
        lastName: 'Creator',
        email: 'test@example.com',
      },
      assignee: null,
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });
});
