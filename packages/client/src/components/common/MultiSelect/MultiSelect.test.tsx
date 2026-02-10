import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MultiSelect } from './MultiSelect';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('MultiSelect', () => {
  it('should render with label and placeholder', () => {
    render(
      <MultiSelect
        label="Test Label"
        options={mockOptions}
        value={[]}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Test Label (0)')).toBeInTheDocument();
    expect(screen.getByText('None selected')).toBeInTheDocument();
  });
  
  it('should show count when options are selected', () => {
    render(
      <MultiSelect
        label="Status"
        options={mockOptions}
        value={['option1']}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Status (1)')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
  
  it('should show "N selected" when multiple options are selected', () => {
    render(
      <MultiSelect
        label="Priority"
        options={mockOptions}
        value={['option1', 'option2']}
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Priority (2)')).toBeInTheDocument();
    expect(screen.getByText('2 selected')).toBeInTheDocument();
  });
  
  it('should open popover on click', async () => {
    render(
      <MultiSelect
        label="Customer"
        options={mockOptions}
        value={[]}
        onChange={() => {}}
      />
    );
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      mockOptions.forEach(option => {
        expect(screen.getAllByText(option.label).length).toBeGreaterThan(0);
      });
    });
  });
  
  it('should call onChange when option is toggled', async () => {
    const onChange = vi.fn();
    
    render(
      <MultiSelect
        label="Status"
        options={mockOptions}
        value={[]}
        onChange={onChange}
      />
    );
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
    });
    
    expect(onChange).toHaveBeenCalledWith(['option1']);
  });
  
  it('should remove option when already selected', async () => {
    const onChange = vi.fn();
    
    render(
      <MultiSelect
        label="Priority"
        options={mockOptions}
        value={['option1', 'option2']}
        onChange={onChange}
      />
    );
    
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    
    await waitFor(() => {
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]);
    });
    
    expect(onChange).toHaveBeenCalledWith(['option2']);
  });
});
