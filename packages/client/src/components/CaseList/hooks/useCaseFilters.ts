import { useState, useEffect, useCallback } from 'react';
import type { CasePriority, CaseStatus } from '@carton/shared/client';

export interface CaseFiltersState {
  customerIds: string[];
  statuses: CaseStatus[];
  priorities: CasePriority[];
  lastUpdated: 'all' | 'today' | 'last7days' | 'last30days';
}

const DEFAULT_FILTERS: CaseFiltersState = {
  customerIds: [],
  statuses: [],
  priorities: [],
  lastUpdated: 'all',
};

const STORAGE_KEY = 'case-filters';

export function useCaseFilters() {
  const [appliedFilters, setAppliedFilters] = useState<CaseFiltersState>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_FILTERS;
    } catch {
      return DEFAULT_FILTERS;
    }
  });

  const [draftFilters, setDraftFilters] = useState<CaseFiltersState>(appliedFilters);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedFilters));
  }, [appliedFilters]);

  const openDialog = useCallback(() => {
    setDraftFilters(appliedFilters);
    setIsDialogOpen(true);
  }, [appliedFilters]);

  const closeDialog = useCallback(() => {
    setDraftFilters(appliedFilters);
    setIsDialogOpen(false);
  }, [appliedFilters]);

  const applyFilters = useCallback(() => {
    setAppliedFilters(draftFilters);
    setIsDialogOpen(false);
  }, [draftFilters]);

  const clearFilters = useCallback(() => {
    setDraftFilters(DEFAULT_FILTERS);
  }, []);

  const updateDraftFilter = useCallback(
    <K extends keyof CaseFiltersState>(key: K, value: CaseFiltersState[K]) => {
      setDraftFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const activeFilterCount = 
    appliedFilters.customerIds.length +
    appliedFilters.statuses.length +
    appliedFilters.priorities.length +
    (appliedFilters.lastUpdated !== 'all' ? 1 : 0);

  return {
    appliedFilters,
    draftFilters,
    isDialogOpen,
    activeFilterCount,
    openDialog,
    closeDialog,
    applyFilters,
    clearFilters,
    updateDraftFilter,
  };
}
