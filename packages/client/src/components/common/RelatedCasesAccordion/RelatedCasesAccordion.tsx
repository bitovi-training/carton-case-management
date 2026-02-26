import { formatCaseNumber } from '@carton/shared/client';
import { RelationshipManagerAccordion } from '../RelationshipManagerAccordion/RelationshipManagerAccordion';

interface RelatedCasesAccordionProps {
  cases: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: string;
  }>;
  onAddClick?: () => void;
}

export function RelatedCasesAccordion({ cases, onAddClick }: RelatedCasesAccordionProps) {
  const items = (cases || []).map((caseItem) => ({
    id: caseItem.id,
    title: caseItem.title,
    subtitle: formatCaseNumber(caseItem.id, caseItem.createdAt),
    to: `/cases/${caseItem.id}`,
  }));

  return (
    <RelationshipManagerAccordion
      accordionTitle="Related Cases"
      items={items}
      defaultOpen={true}
      onAddClick={onAddClick}
    />
  );
}

