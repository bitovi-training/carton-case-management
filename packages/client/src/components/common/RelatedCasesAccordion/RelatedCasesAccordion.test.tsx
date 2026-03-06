import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import type { ComponentProps } from 'react';
import { RelatedCasesAccordion } from './RelatedCasesAccordion';

const mockCases = [
  {
    id: 'abc12345',
    title: 'Policy Coverage Inquiry',
    status: 'TO_DO',
    priority: 'HIGH',
    createdAt: new Date('2024-01-15').toISOString(),
  },
  {
    id: 'def67890',
    title: 'Premium Adjustment Request',
    status: 'IN_PROGRESS',
    priority: 'MEDIUM',
    createdAt: new Date('2024-02-20').toISOString(),
  },
];

const renderComponent = (props: Partial<ComponentProps<typeof RelatedCasesAccordion>> = {}) =>
  render(
    <MemoryRouter>
      <RelatedCasesAccordion cases={mockCases} {...props} />
    </MemoryRouter>
  );

describe('RelatedCasesAccordion', () => {
  it('renders the Related Cases accordion with title', () => {
    renderComponent();
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });

  it('renders all related case titles', () => {
    renderComponent();
    expect(screen.getByText('Policy Coverage Inquiry')).toBeInTheDocument();
    expect(screen.getByText('Premium Adjustment Request')).toBeInTheDocument();
  });

  it('renders case numbers as links', () => {
    renderComponent();
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  it('renders Add button when onAddClick is provided', () => {
    const handleAddClick = vi.fn();
    renderComponent({ onAddClick: handleAddClick });
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onAddClick when Add button is clicked', async () => {
    const user = userEvent.setup();
    const handleAddClick = vi.fn();
    renderComponent({ onAddClick: handleAddClick });

    await user.click(screen.getByRole('button', { name: /add/i }));
    expect(handleAddClick).toHaveBeenCalledTimes(1);
  });

  it('renders with empty cases array', () => {
    renderComponent({ cases: [] });
    expect(screen.getByText('Related Cases')).toBeInTheDocument();
  });
});
