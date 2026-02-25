import { describe, it, expect } from 'vitest';
import { renderWithTrpc } from '@/test/utils';
import { screen } from '@testing-library/react';
import { CaseComments } from './CaseComments';

describe('CaseComments', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      id: '1',
      title: 'Test Case',
      status: 'TO_DO' as const,
      description: 'Test description',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customerId: 'cust1',
      priority: 'MEDIUM' as const,
      createdBy: 'user1',
      assignedTo: null,
      customer: { id: 'cust1', firstName: 'John', lastName: 'Doe' },
      creator: { id: 'user1', firstName: 'Jane', lastName: 'Smith', email: 'jane@test.com' },
      assignee: null,
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });
});
