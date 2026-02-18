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
      customerId: 'customer-1',
      status: 'TO_DO' as const,
      priority: 'MEDIUM' as const,
      createdBy: 'user-1',
      assignedTo: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        id: 'customer-1',
        firstName: 'John',
        lastName: 'Doe',
      },
      creator: {
        id: 'user-1',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
      },
      assignee: null,
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });
});
