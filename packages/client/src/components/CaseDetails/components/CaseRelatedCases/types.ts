export interface CaseRelatedCasesProps {
  /** The ID of the current case */
  caseId: string;
  /** The customer ID – used to scope available cases (privacy requirement) */
  customerId: string;
  /** Additional CSS classes */
  className?: string;
}
