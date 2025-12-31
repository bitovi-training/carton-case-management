import { describe, it, expect } from 'vitest';
import { renderWithTrpc } from '@/test/utils';
import { screen } from '@testing-library/react';
import { CaseInformation } from './CaseInformation';

describe('CaseInformation', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      id: '1',
      title: 'Test Case',
      status: 'TO_DO' as const,
      description: 'Test description',
      createdAt: new Date('2024-01-15').toISOString(),
    };

    renderWithTrpc(<CaseInformation caseId="1" caseData={mockCaseData} />);

    expect(screen.getAllByText('Test Case').length).toBeGreaterThan(0);
    // Case number is now computed from id and createdAt: #CAS-240115-{last 8 chars of id}
    const caseNumbers = screen.getAllByText((content, element) => {
      return element?.textContent?.startsWith('#CAS-240115') || false;
    });
    expect(caseNumbers.length).toBeGreaterThan(0);
  });
});
