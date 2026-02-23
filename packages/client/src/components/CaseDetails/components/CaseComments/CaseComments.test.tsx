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
      customerId: 'customer-1',
      createdBy: 'user-1',
      assignedTo: 'user-2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customer: {
        id: 'customer-1',
        firstName: 'John',
        lastName: 'Doe',
      },
      creator: {
        id: 'user-1',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
      },
      assignee: {
        id: 'user-2',
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
