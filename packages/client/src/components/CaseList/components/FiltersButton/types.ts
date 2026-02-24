export interface FiltersButtonProps {
  /**
   * Number of active filters to display in badge
   */
  count?: number;
  
  /**
   * Click handler for the button
   */
  onClick: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}
