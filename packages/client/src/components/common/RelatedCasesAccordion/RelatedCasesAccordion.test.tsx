import { describe, it, expect, beforeEach } from 'vitest';
import { screen, waitFor, render } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { RelatedCasesAccordion } from './RelatedCasesAccordion';
import { createTrpcWrapper } from '../../../test/utils';
import { server } from '@/../vitest.setup';

const mockRelatedCases = [
  {
    id: '2',
    title: 'Related Case One',
    status: 'TO_DO',
    priority: 'MEDIUM',
    createdAt: new Date(2024, 0, 1).toISOString(),
  },
];

const mockAllCases = [
  {
    id: '1',
    title: 'Current Case',
    status: 'TO_DO',
    priority: 'MEDIUM',
    createdAt: new Date(2024, 0, 1).toISOString(),
    customer: { id: '1', firstName: 'John', lastName: 'Doe' },
    creator: { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    assignee: null,
  },
  {
    id: '2',
    title: 'Related Case One',
    status: 'TO_DO',
    priority: 'MEDIUM',
    createdAt: new Date(2024, 0, 1).toISOString(),
    customer: { id: '1', firstName: 'John', lastName: 'Doe' },
    creator: { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com' },
    assignee: null,
  },
];

const setupMockHandlers = (relatedCases = mockRelatedCases) => {
  server.use(
    http.get('/trpc/case.getRelatedCases*', () => {
      return HttpResponse.json({ result: { data: relatedCases } });
    }),
    http.get('/trpc/case.list*', () => {
      return HttpResponse.json({ result: { data: mockAllCases } });
    })
  );
};

describe('RelatedCasesAccordion', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('renders the Related Cases accordion', async () => {
    setupMockHandlers([]);
    render(<RelatedCasesAccordion caseId="1" />, { wrapper: createTrpcWrapper() });
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });

  it('renders empty state when no related cases', async () => {
    setupMockHandlers([]);
    render(<RelatedCasesAccordion caseId="1" />, { wrapper: createTrpcWrapper() });

    await waitFor(() => {
      expect(screen.getByText('No related cases')).toBeInTheDocument();
    });
  });

  it('renders related cases when data loads', async () => {
    setupMockHandlers(mockRelatedCases);
    render(<RelatedCasesAccordion caseId="1" />, { wrapper: createTrpcWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Related Case One')).toBeInTheDocument();
    });
  });

  it('shows Add button', async () => {
    setupMockHandlers([]);
    render(<RelatedCasesAccordion caseId="1" />, { wrapper: createTrpcWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Add')).toBeInTheDocument();
    });
  });
});
