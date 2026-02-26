export interface CaseFiltersState {
  customerIds: string[];
  statuses: string[];
  priorities: string[];
  lastUpdated: string;
}

export interface CaseFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: CaseFiltersState;
  onFiltersChange: (filters: CaseFiltersState) => void;
  onApply: () => void;
  onClear: () => void;
}
