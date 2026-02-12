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
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      customerId: '1',
      createdBy: '1',
      assignedTo: null,
      customer: { id: '1', firstName: 'John', lastName: 'Doe' },
      creator: { id: '1', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com' },
      assignee: null,
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });
});
