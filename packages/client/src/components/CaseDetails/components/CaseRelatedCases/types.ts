export interface CaseRelatedCasesProps {
  caseId: string;
  relatedCases: Array<{
    id: string;
    title: string;
    status: string;
    priority: string;
    createdAt: string;
  }>;
}
