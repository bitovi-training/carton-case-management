export interface AddRelatedCasesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCaseId: string;
  existingRelatedCaseIds: string[];
  onSave: (selectedCaseIds: string[]) => void;
}
