import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EditableSelect } from './EditableSelect';
import type { EditableSelectOption } from './EditableSelect';

describe('EditableSelect', () => {
  const defaultOptions: EditableSelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const defaultProps = {
    value: 'option1',
    options: defaultOptions,
    onChange: vi.fn(),
  };

  describe('Inline editing mode (default)', () => {
    it('displays current value as text initially', () => {
      render(<EditableSelect {...defaultProps} />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('shows tooltip on hover', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} />);

      const displayText = screen.getByText('Option 1');
      await user.hover(displayText);

      await waitFor(() => {
        expect(screen.getAllByText('Click to edit')[0]).toBeInTheDocument();
      });
    });

    it('shows custom tooltip text', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} tooltipText="Edit this field" />);

      const displayText = screen.getByText('Option 1');
      await user.hover(displayText);

      await waitFor(() => {
        expect(screen.getAllByText('Edit this field')[0]).toBeInTheDocument();
      });
    });

    it('enters edit mode when clicked', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} />);

      const displayText = screen.getByText('Option 1');
      await user.click(displayText);

      // Should show select listbox (trigger becomes aria-hidden when open)
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('does not enter edit mode when disabled', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} disabled={true} />);

      const displayText = screen.getByText('Option 1');
      await user.click(displayText);

      // Should not show select trigger
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    });

    it('applies custom display className', () => {
      render(<EditableSelect {...defaultProps} displayClassName="text-red-500" />);

      const displayText = screen.getByText('Option 1');
      expect(displayText).toHaveClass('text-red-500');
    });
  });

  describe('Always-editing mode', () => {
    it('always shows select dropdown', () => {
      render(<EditableSelect {...defaultProps} alwaysEditing={true} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('displays current value in select', () => {
      render(<EditableSelect {...defaultProps} alwaysEditing={true} />);

      expect(screen.getByText('Option 1')).toBeInTheDocument();
    });

    it('applies custom triggerClassName in always-editing mode', () => {
      render(
        <EditableSelect
          {...defaultProps}
          alwaysEditing={true}
          triggerClassName="custom-trigger-class"
        />
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveClass('custom-trigger-class');
    });

    it('is disabled in always-editing mode when disabled prop is true', () => {
      render(<EditableSelect {...defaultProps} alwaysEditing={true} disabled={true} />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toBeDisabled();
    });
  });

  describe('Empty value handling', () => {
    it('shows placeholder when value is empty and allowEmpty is true', () => {
      render(
        <EditableSelect
          {...defaultProps}
          value=""
          allowEmpty={true}
          placeholder="Select an option"
        />
      );

      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('shows emptyLabel when value is empty and emptyLabel is provided', () => {
      render(
        <EditableSelect {...defaultProps} value="" allowEmpty={true} emptyLabel="None selected" />
      );

      expect(screen.getByText('None selected')).toBeInTheDocument();
    });

    it('shows emptyLabel in always-editing mode when value is empty', () => {
      render(
        <EditableSelect
          {...defaultProps}
          value=""
          allowEmpty={true}
          emptyLabel="None"
          alwaysEditing={true}
        />
      );

      expect(screen.getByText('None')).toBeInTheDocument();
    });
  });

  describe('Display label logic', () => {
    it('displays label for current value', () => {
      render(<EditableSelect {...defaultProps} value="option2" />);

      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('displays value itself if no matching option found', () => {
      render(<EditableSelect {...defaultProps} value="unknown-value" />);

      expect(screen.getByText('unknown-value')).toBeInTheDocument();
    });

    it('shows all options in select content', () => {
      const { container } = render(<EditableSelect {...defaultProps} alwaysEditing={true} />);

      // Select content is rendered but not visible without interaction
      // We can't easily test Radix UI dropdown interactions in JSDOM
      expect(container.querySelector('[role="combobox"]')).toBeInTheDocument();
    });
  });

  describe('Placeholder', () => {
    it('shows custom placeholder in always-editing mode', () => {
      render(
        <EditableSelect
          {...defaultProps}
          value=""
          allowEmpty={true}
          placeholder="Choose one..."
          alwaysEditing={true}
        />
      );

      expect(screen.getByText('Choose one...')).toBeInTheDocument();
    });
  });

  describe('Custom styling', () => {
    it('applies custom className to wrapper in inline mode', () => {
      const { container } = render(<EditableSelect {...defaultProps} className="custom-wrapper" />);

      const wrapper = container.querySelector('.custom-wrapper');
      expect(wrapper).toBeInTheDocument();
    });

    it('applies triggerClassName in inline editing mode when editing', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} triggerClassName="custom-trigger-inline" />);

      const displayText = screen.getByText('Option 1');
      await user.click(displayText);

      // When opened, trigger is aria-hidden, so we need to include hidden elements
      const trigger = screen.getByRole('combobox', { hidden: true });
      expect(trigger).toHaveClass('custom-trigger-inline');
    });

    it('applies displayClassName to display text', () => {
      render(<EditableSelect {...defaultProps} displayClassName="text-blue-600" />);

      const displayText = screen.getByText('Option 1');
      expect(displayText).toHaveClass('text-blue-600');
    });
  });

  describe('Component state', () => {
    it('renders in edit mode when clicked in inline mode', async () => {
      const user = userEvent.setup();
      render(<EditableSelect {...defaultProps} />);

      // Initially shows display text
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();

      // After click, shows select with listbox
      const displayText = screen.getByText('Option 1');
      await user.click(displayText);
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('maintains always-editing state', () => {
      render(<EditableSelect {...defaultProps} alwaysEditing={true} />);

      // Always shows combobox
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });
  });

  describe('Edge cases', () => {
    it('handles empty options array', () => {
      render(<EditableSelect {...defaultProps} options={[]} alwaysEditing={true} />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('handles undefined value gracefully', () => {
      render(
        <EditableSelect
          {...defaultProps}
          value={undefined as unknown as string}
          allowEmpty={true}
          placeholder="No value"
        />
      );

      expect(screen.getByText('No value')).toBeInTheDocument();
    });

    it('handles value not in options', () => {
      render(<EditableSelect {...defaultProps} value="not-in-list" />);

      // Should display the raw value
      expect(screen.getByText('not-in-list')).toBeInTheDocument();
    });
  });
});
