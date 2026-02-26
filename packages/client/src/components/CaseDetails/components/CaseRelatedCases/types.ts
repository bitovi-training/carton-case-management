export interface RelatedCase {
  id: string;
  title: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface CaseRelatedCasesProps {
  caseId: string;
}
