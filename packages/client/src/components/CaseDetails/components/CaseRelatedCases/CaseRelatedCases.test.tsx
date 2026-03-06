import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { CaseRelatedCases } from './CaseRelatedCases';

interface MockRelatedCase {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

interface MockFullCase extends MockRelatedCase {
  customer: { id: string; firstName: string; lastName: string };
  creator: { id: string; firstName: string; lastName: string; email: string };
  assignee: null | { id: string; firstName: string; lastName: string; email: string };
}

// Mock trpc
const mockGetRelatedCases = vi.fn();
const mockGetAllCases = vi.fn();
const mockAddRelatedCases = vi.fn();
const mockInvalidate = vi.fn();

vi.mock('@/lib/trpc', () => ({
  trpc: {
    case: {
      getRelatedCases: {
        useQuery: () => mockGetRelatedCases(),
      },
      list: {
        useQuery: () => mockGetAllCases(),
      },
      addRelatedCases: {
        useMutation: ({ onSuccess }: { onSuccess?: () => void }) => ({
          mutateAsync: async (args: unknown) => {
            await mockAddRelatedCases(args);
            onSuccess?.();
          },
        }),
      },
    },
    useUtils: () => ({
      case: {
        getRelatedCases: {
          invalidate: mockInvalidate,
        },
      },
    }),
  },
}));

const renderComponent = (caseId = 'case-1') =>
  render(
    <MemoryRouter>
      <CaseRelatedCases caseId={caseId} />
    </MemoryRouter>
  );

describe('CaseRelatedCases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetRelatedCases.mockReturnValue({ data: [] as MockRelatedCase[], isLoading: false });
    mockGetAllCases.mockReturnValue({ data: [] as MockFullCase[], isLoading: false });
  });

  it('renders the Related Cases accordion', () => {
    renderComponent();
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });

  it('renders related cases in the accordion', () => {
    const createdAt = new Date('2024-01-15').toISOString();
    mockGetRelatedCases.mockReturnValue({
      data: [
        {
          id: 'abc12345',
          title: 'Policy Coverage Inquiry',
          status: 'TO_DO',
          priority: 'HIGH',
          createdAt,
        },
      ],
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByText('Policy Coverage Inquiry')).toBeInTheDocument();
  });

  it('shows Add button in accordion', () => {
    renderComponent();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('opens dialog when Add button is clicked', async () => {
    const user = userEvent.setup();
    const createdAt = new Date('2024-02-01').toISOString();
    mockGetAllCases.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Other Case',
          status: 'TO_DO',
          priority: 'MEDIUM',
          createdAt,
          customer: { id: 'c1', firstName: 'Jane', lastName: 'Doe' },
          creator: { id: 'u1', firstName: 'Alex', lastName: 'M', email: '' },
          assignee: null,
        },
      ],
      isLoading: false,
    });

    renderComponent();

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
  });

  it('calls addRelatedCases mutation when new cases are added', async () => {
    const user = userEvent.setup();
    const createdAt = new Date('2024-02-01').toISOString();
    mockGetAllCases.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Other Case',
          status: 'TO_DO',
          priority: 'MEDIUM',
          createdAt,
          customer: { id: 'c1', firstName: 'Jane', lastName: 'Doe' },
          creator: { id: 'u1', firstName: 'Alex', lastName: 'M', email: '' },
          assignee: null,
        },
      ],
      isLoading: false,
    });

    renderComponent('case-1');

    // Open dialog
    await user.click(screen.getByRole('button', { name: /add/i }));

    // Select the case
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Click Add in dialog
    await user.click(screen.getByRole('button', { name: /^add$/i }));

    await waitFor(() => {
      expect(mockAddRelatedCases).toHaveBeenCalledWith({
        caseId: 'case-1',
        relatedCaseIds: ['case-2'],
      });
    });
  });

  it('pre-selects already related cases in dialog', async () => {
    const user = userEvent.setup();
    const createdAt = new Date('2024-01-01').toISOString();
    mockGetRelatedCases.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Existing Related',
          status: 'TO_DO',
          priority: 'LOW',
          createdAt,
        },
      ],
      isLoading: false,
    });
    mockGetAllCases.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Existing Related',
          status: 'TO_DO',
          priority: 'LOW',
          createdAt,
          customer: { id: 'c1', firstName: 'Jane', lastName: 'Doe' },
          creator: { id: 'u1', firstName: 'Alex', lastName: 'M', email: '' },
          assignee: null,
        },
      ],
      isLoading: false,
    });

    renderComponent('case-1');
    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
    // Already related case should be pre-checked
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});
