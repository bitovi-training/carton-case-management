import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('should render correctly', () => {
    render(<Textarea placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should render with roundness="default"', () => {
    render(<Textarea roundness="default" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('rounded-md');
  });

  it('should render with roundness="round"', () => {
    render(<Textarea roundness="round" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('rounded-lg');
  });

  it('should be resizable by default', () => {
    render(<Textarea placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('resize-vertical');
  });

  it('should not be resizable when showResizable=false', () => {
    render(<Textarea showResizable={false} placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('resize-none');
  });

  it('should apply error styling when error=true', () => {
    render(<Textarea error placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('!border-[#ef4444]');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });

  it('should not have aria-invalid when error=false', () => {
    render(<Textarea error={false} placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).not.toHaveAttribute('aria-invalid');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Textarea disabled placeholder="Disabled textarea" />);
    expect(screen.getByPlaceholderText('Disabled textarea')).toBeDisabled();
  });

  it('should apply custom className', () => {
    render(<Textarea className="custom-class" placeholder="Test" />);
    expect(screen.getByPlaceholderText('Test')).toHaveClass('custom-class');
  });

  it('should support defaultValue', () => {
    render(<Textarea defaultValue="Initial value" />);
    expect(screen.getByDisplayValue('Initial value')).toBeInTheDocument();
  });

  it('should support placeholder', () => {
    render(<Textarea placeholder="Type your message here." />);
    expect(screen.getByPlaceholderText('Type your message here.')).toBeInTheDocument();
  });

  it('should combine roundness, error, and resize props', () => {
    render(<Textarea roundness="round" error showResizable={false} placeholder="Test" />);
    const textarea = screen.getByPlaceholderText('Test');
    expect(textarea).toHaveClass('rounded-lg');
    expect(textarea).toHaveClass('!border-[#ef4444]');
    expect(textarea).toHaveClass('resize-none');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
  });
});

