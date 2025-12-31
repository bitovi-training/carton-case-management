export type CaseEssentialDetailsProps = {
  caseId: string;
  caseData: {
    customer: { name: string };
    priority?: string;
    createdAt: string;
    updatedAt: string;
    assignee: { name: string } | null;
  };
};
