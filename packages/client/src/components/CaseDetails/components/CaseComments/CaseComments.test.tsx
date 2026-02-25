import { describe, it, expect } from 'vitest';
import { renderWithTrpc } from '@/test/utils';
import { screen } from '@testing-library/react';
import { CaseComments } from './CaseComments';

describe('CaseComments', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      id: '1',
      title: 'Test Case',
      description: 'Test description',
      status: 'TO_DO' as const,
      priority: 'MEDIUM' as const,
      customerId: '1',
      createdBy: '1',
      assignedTo: '1',
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
        lastName: 'User',
        email: 'test@example.com',
      },
      assignee: {
        id: '1',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
      },
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });
});
