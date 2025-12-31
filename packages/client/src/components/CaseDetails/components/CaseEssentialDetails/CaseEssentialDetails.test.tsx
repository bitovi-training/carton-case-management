import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { renderWithTrpc } from '@/test/utils';
import { CaseEssentialDetails } from './CaseEssentialDetails';

describe('CaseEssentialDetails', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      customer: { name: 'Test Customer' },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignee: { name: 'Test Assignee' },
    };

    renderWithTrpc(<CaseEssentialDetails caseId="1" caseData={mockCaseData} />);
    expect(screen.getByText('Essential Details')).toBeInTheDocument();
    expect(screen.getByText('Test Customer')).toBeInTheDocument();
  });
});
