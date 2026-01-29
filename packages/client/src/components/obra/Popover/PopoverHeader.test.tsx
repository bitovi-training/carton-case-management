import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PopoverHeader } from './PopoverHeader';

describe('PopoverHeader', () => {
  it('renders with title only', () => {
    render(<PopoverHeader title="Test Title" />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByTestId('popover-header')).toBeInTheDocument();
  });

  it('renders with title and description', () => {
    render(
      <PopoverHeader 
        title="Test Title" 
        description="Test description text" 
      />
    );
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(
      <PopoverHeader 
        title="Test Title" 
        className="custom-class" 
      />
    );
    
    const header = screen.getByTestId('popover-header');
    expect(header).toHaveClass('custom-class');
  });

  it('applies proper styling classes', () => {
    render(<PopoverHeader title="Test Title" />);
    
    const header = screen.getByTestId('popover-header');
    expect(header).toHaveClass('flex', 'flex-col', 'gap-2', 'pb-4', 'w-full');
  });

  it('title has correct styling', () => {
    render(<PopoverHeader title="Test Title" />);
    
    const title = screen.getByText('Test Title');
    expect(title.tagName).toBe('H3');
    expect(title).toHaveClass('text-base', 'font-semibold', 'text-foreground');
  });

  it('description has correct styling when provided', () => {
    render(
      <PopoverHeader 
        title="Test Title" 
        description="Test description" 
      />
    );
    
    const description = screen.getByText('Test description');
    expect(description.tagName).toBe('P');
    expect(description).toHaveClass('text-sm', 'text-muted-foreground');
  });
});