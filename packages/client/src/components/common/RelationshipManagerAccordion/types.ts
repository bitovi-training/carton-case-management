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
   * Message to show when there are no items
   */
  emptyStateMessage?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}
