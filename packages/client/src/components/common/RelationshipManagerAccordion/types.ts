export interface RelationshipItem {
  id: string;
  title: string;
  subtitle: string;
  to: string;
}

export interface RelationshipManagerAccordionProps {
  /**
   * Title of the accordion
   */
  accordionTitle: string;

  /**
   * Array of relationship items to display
   */
  items: RelationshipItem[];

  /**
   * Whether the accordion is open by default
   * @default false
   * @figma Variant: State
   */
  defaultOpen?: boolean;

  /**
   * Callback when add button is clicked
   */
  onAddClick?: () => void;

  /**
   * Callback when remove item is clicked. If not provided, the 3-dot menu is hidden.
   */
  onRemoveItem?: (itemId: string) => void;

  /**
   * Additional CSS classes
   */
  className?: string;
}
