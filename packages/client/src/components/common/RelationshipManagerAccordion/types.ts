export interface RelationshipItem {
  id: string;
  title: string;
  subtitle: string;
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
   * Callback when an item is clicked
   */
  onItemClick?: (itemId: string) => void;

  /**
   * Callback when remove button is clicked for an item
   */
  onItemRemove?: (itemId: string) => void;

  /**
   * Whether items are currently loading
   */
  isLoading?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}
