import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import type { ReactElement } from 'react';
import { RelationshipManagerAccordion } from './RelationshipManagerAccordion';

const renderWithRouter = (ui: ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
};

const mockItems = [
  {
    id: '1',
    title: 'Policy Coverage Inquiry',
    subtitle: '#CAS-242315-2125',
    to: '/cases/1',
  },
  {
    id: '2',
    title: 'Premium Adjustment Request',
    subtitle: '#CAS-242315-2126',
    to: '/cases/2',
  },
];

describe('RelationshipManagerAccordion', () => {
  it('renders with items', () => {
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} />);
    expect(screen.getByText('Relationships')).toBeInTheDocument();
  });

  it('starts closed by default', () => {
     renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} />);
    const itemTitle = screen.queryByText('Policy Coverage Inquiry');
    if (itemTitle) {
      expect(itemTitle).not.toBeVisible();
    } else {
      expect(itemTitle).not.toBeInTheDocument();
    }
  });

  it('starts open when defaultOpen is true', () => {
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} defaultOpen />);
    expect(screen.getByText('Policy Coverage Inquiry')).toBeVisible();
  });

  it('expands when clicked', async () => {
    const user = userEvent.setup();
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} />);

    await user.click(screen.getByText('Relationships'));
    expect(screen.getByText('Policy Coverage Inquiry')).toBeVisible();
  });

  it('displays all items', () => {
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} defaultOpen />);
    expect(screen.getByText('Policy Coverage Inquiry')).toBeInTheDocument();
    expect(screen.getByText('#CAS-242315-2125')).toBeInTheDocument();
    expect(screen.getByText('Premium Adjustment Request')).toBeInTheDocument();
    expect(screen.getByText('#CAS-242315-2126')).toBeInTheDocument();
  });

  it('calls onAddClick when add button is clicked', async () => {
    const user = userEvent.setup();
    const onAddClick = vi.fn();
    renderWithRouter(
      <RelationshipManagerAccordion
        accordionTitle="Relationships"
        items={mockItems}
        defaultOpen
        onAddClick={onAddClick}
      />
    );

    await user.click(screen.getByText('Add'));
    expect(onAddClick).toHaveBeenCalledOnce();
  });

  it('does not show add button when onAddClick is not provided', () => {
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} defaultOpen />);
    expect(screen.queryByText('Add')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = renderWithRouter(
      <RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('shows empty state when no items', () => {
    renderWithRouter(<RelationshipManagerAccordion accordionTitle="Relationships" items={[]} defaultOpen />);
    expect(screen.getByText('No related cases')).toBeInTheDocument();
  });

  it('shows 3-dot menu on hover when onRemoveItem is provided', async () => {
    const user = userEvent.setup();
    const onRemoveItem = vi.fn();
    renderWithRouter(
      <RelationshipManagerAccordion
        accordionTitle="Relationships"
        items={mockItems}
        defaultOpen
        onRemoveItem={onRemoveItem}
      />
    );

    await user.hover(screen.getByText('Policy Coverage Inquiry'));
    const moreOptionsButton = screen.getByLabelText('Options for Policy Coverage Inquiry');
    expect(moreOptionsButton).toBeInTheDocument();
  });

  it('calls onRemoveItem when remove option is clicked', async () => {
    const user = userEvent.setup();
    const onRemoveItem = vi.fn();
    renderWithRouter(
      <RelationshipManagerAccordion
        accordionTitle="Relationships"
        items={mockItems}
        defaultOpen
        onRemoveItem={onRemoveItem}
      />
    );

    await user.click(screen.getAllByLabelText(/Options for/)[0]);
    await user.click(screen.getByText('Remove linked case'));
    expect(onRemoveItem).toHaveBeenCalledWith('1');
  });

  it('does not show remove menu when onRemoveItem is not provided', () => {
    renderWithRouter(
      <RelationshipManagerAccordion accordionTitle="Relationships" items={mockItems} defaultOpen />
    );
    expect(screen.queryByLabelText(/Options for/)).not.toBeInTheDocument();
  });
});
