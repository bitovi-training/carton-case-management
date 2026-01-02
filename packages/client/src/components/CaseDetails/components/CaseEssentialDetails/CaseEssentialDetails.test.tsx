import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithTrpc } from '@/test/utils';
import { CaseEssentialDetails } from './CaseEssentialDetails';

describe('CaseEssentialDetails', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      customer: { id: '1', name: 'Test Customer' },
      customerId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignee: { id: '2', name: 'Test Assignee', email: 'assignee@test.com' },
      assignedTo: '2',
      creator: { id: '3', name: 'Test Creator', email: 'creator@test.com' },
      createdBy: '3',
      updater: { id: '4', name: 'Test Updater', email: 'updater@test.com' },
      updatedBy: '4',
    };

    renderWithTrpc(<CaseEssentialDetails caseId="1" caseData={mockCaseData} />);
    expect(screen.getByText('Essential Details')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
  });
});
