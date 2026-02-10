export interface MultiSelectOption {
  value: string;
  label: string;
}

export interface MultiSelectProps {
  /**
   * Label for the select (shown above the trigger)
   */
  label: string;
  
  /**
   * Available options
   */
  options: MultiSelectOption[];
  
  /**
   * Currently selected values
   */
  value: string[];
  
  /**
   * Change handler
   */
  onChange: (value: string[]) => void;
  
  /**
   * Placeholder text when no selection
   * @default "None selected"
   */
  placeholder?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
