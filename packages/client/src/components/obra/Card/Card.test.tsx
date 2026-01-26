import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

describe('Card', () => {
  describe('1-slot layout', () => {
    it('renders with main content only', () => {
      render(<Card main={<div>Main content</div>} />);
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('does not render header or footer when only main provided', () => {
      const { container } = render(<Card main={<div>Main</div>} />);
      const slots = container.querySelectorAll('[class*="min-h"]');
      expect(slots).toHaveLength(1);
    });
  });

  describe('2-slots layout', () => {
    it('renders header and main when both provided', () => {
      render(
        <Card
          header={<div>Header content</div>}
          main={<div>Main content</div>}
        />
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
    });

    it('renders 2 slots when both are provided', () => {
      const { container } = render(
        <Card header={<div>Header</div>} main={<div>Main</div>} />
      );
      const slots = container.querySelectorAll('[class*="min-h"]');
      expect(slots).toHaveLength(2);
    });

    it('handles missing header gracefully', () => {
      render(<Card main={<div>Main only</div>} />);
      expect(screen.getByText('Main only')).toBeInTheDocument();
    });
  });

  describe('3-slots layout', () => {
    it('renders all three slots when provided', () => {
      render(
        <Card
          header={<div>Header content</div>}
          main={<div>Main content</div>}
          footer={<div>Footer content</div>}
        />
      );
      expect(screen.getByText('Header content')).toBeInTheDocument();
      expect(screen.getByText('Main content')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('renders 3 slots when all are provided', () => {
      const { container } = render(
        <Card
          header={<div>H</div>}
          main={<div>M</div>}
          footer={<div>F</div>}
        />
      );
      const slots = container.querySelectorAll('[class*="min-h"]');
      expect(slots).toHaveLength(3);
    });

    it('handles missing slots gracefully', () => {
      render(<Card main={<div>Main only</div>} />);
      expect(screen.getByText('Main only')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Card main={<div>Content</div>} className="custom-class" />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('custom-class');
    });

    it('applies base card styling', () => {
      const { container } = render(<Card main={<div>Content</div>} />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-lg');
      expect(card).toHaveClass('border');
      expect(card).toHaveClass('bg-card');
      expect(card).toHaveClass('shadow-sm');
    });

    it('applies flex layout', () => {
      const { container } = render(
        <Card header={<div>H</div>} main={<div>M</div>} />
      );
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('flex');
      expect(card).toHaveClass('flex-col');
    });
  });

  describe('slot content', () => {
    it('renders complex React nodes in slots', () => {
      render(
        <Card
          header={
            <div>
              <h1>Title</h1>
              <p>Subtitle</p>
            </div>
          }
          main={
            <div>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          }
          footer={<button>Action</button>}
        />
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Subtitle')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders string content in slots', () => {
      render(<Card main="Simple text" />);
      expect(screen.getByText('Simple text')).toBeInTheDocument();
    });
  });

  describe('empty card', () => {
    it('renders card container even with no slots', () => {
      const { container } = render(<Card />);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass('rounded-lg');
    });
  });
});
