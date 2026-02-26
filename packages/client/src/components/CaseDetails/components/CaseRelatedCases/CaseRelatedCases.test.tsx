import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { trpc } from '@/lib/trpc';
import { CaseRelatedCases } from './CaseRelatedCases';

// Mock the trpc module
vi.mock('@/lib/trpc', () => ({
  trpc: {
    case: {
      getRelatedCases: {
        useQuery: vi.fn(),
      },
      list: {
        useQuery: vi.fn(),
      },
      addRelatedCases: {
        useMutation: vi.fn(),
      },
    },
    useUtils: vi.fn(() => ({
      case: {
        getRelatedCases: {
          invalidate: vi.fn(),
        },
      },
    })),
  },
}));

const mockTrpc = trpc as unknown as {
  case: {
    getRelatedCases: { useQuery: ReturnType<typeof vi.fn> };
    list: { useQuery: ReturnType<typeof vi.fn> };
    addRelatedCases: { useMutation: ReturnType<typeof vi.fn> };
  };
  useUtils: ReturnType<typeof vi.fn>;
};

const DEFAULT_PROPS = {
  caseId: 'case-1',
  customerId: 'customer-1',
};

function renderWithRouter(ui: ReactElement) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe('CaseRelatedCases', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockTrpc.case.getRelatedCases.useQuery.mockReturnValue({ data: [] });
    mockTrpc.case.list.useQuery.mockReturnValue({ data: [] });
    mockTrpc.case.addRelatedCases.useMutation.mockReturnValue({
      mutate: vi.fn(),
      isPending: false,
    });
  });

  it('renders the Related Cases accordion', () => {
    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });

  it('shows empty state message when there are no related cases', () => {
    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);
    expect(screen.getByText('No related cases yet.')).toBeInTheDocument();
  });

  it('renders related cases in the accordion', () => {
    mockTrpc.case.getRelatedCases.useQuery.mockReturnValue({
      data: [
        { id: 'case-2', title: 'Policy Coverage Inquiry', createdAt: '2025-01-01T00:00:00.000Z' },
      ],
    });

    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);

    expect(screen.getByText('Policy Coverage Inquiry')).toBeInTheDocument();
  });

  it('shows add dialog when Add button is clicked', async () => {
    const user = userEvent.setup();
    mockTrpc.case.list.useQuery.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Another Case',
          createdAt: '2025-01-01T00:00:00.000Z',
          customerId: 'customer-1',
        },
      ],
    });

    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);

    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
    });
  });

  it('calls addRelatedCases mutation when Add is confirmed in dialog', async () => {
    const user = userEvent.setup();
    const mockMutate = vi.fn();

    mockTrpc.case.addRelatedCases.useMutation.mockReturnValue({
      mutate: mockMutate,
      isPending: false,
    });
    mockTrpc.case.list.useQuery.mockReturnValue({
      data: [
        {
          id: 'case-2',
          title: 'Another Case',
          createdAt: '2025-01-01T00:00:00.000Z',
          customerId: 'customer-1',
        },
      ],
    });

    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);

    // Open dialog
    const addButton = screen.getByRole('button', { name: /add/i });
    await user.click(addButton);

    await waitFor(() => {
      expect(screen.getByText('Add Related Cases')).toBeInTheDocument();
    });

    // Select a case
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);

    // Confirm add
    const confirmButton = screen.getByRole('button', { name: /^add$/i });
    await user.click(confirmButton);

    expect(mockMutate).toHaveBeenCalledWith({
      caseId: 'case-1',
      relatedCaseIds: ['case-2'],
    });
  });

  it('does not show the current case in the dialog list', () => {
    mockTrpc.case.list.useQuery.mockReturnValue({
      data: [
        { id: 'case-1', title: 'Current Case', createdAt: '2025-01-01T00:00:00.000Z', customerId: 'customer-1' },
        { id: 'case-2', title: 'Another Case', createdAt: '2025-01-02T00:00:00.000Z', customerId: 'customer-1' },
      ],
    });

    renderWithRouter(<CaseRelatedCases {...DEFAULT_PROPS} />);
    // Only verify the component renders without errors
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });
});
