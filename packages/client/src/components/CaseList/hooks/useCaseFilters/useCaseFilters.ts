import { useState, useEffect, useMemo } from 'react';

export interface CaseFilters {
  customer: string[];
  status: string[];
  priority: string[];
  lastUpdated: 'today' | 'week' | 'month' | 'all';
}

const STORAGE_KEY = 'case-filters';

const defaultFilters: CaseFilters = {
  customer: [],
  status: [],
  priority: [],
  lastUpdated: 'all',
};

export function useCaseFilters() {
  const [filters, setFilters] = useState<CaseFilters>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultFilters;
    } catch {
      return defaultFilters;
    }
  });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<CaseFilters>(filters);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.customer.length > 0) count++;
    if (filters.status.length > 0) count++;
    if (filters.priority.length > 0) count++;
    if (filters.lastUpdated !== 'all') count++;
    return count;
  }, [filters]);

  const handleApply = () => {
    setFilters(tempFilters);
    setIsDialogOpen(false);
  };

  const handleClear = () => {
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setTempFilters(filters);
    }
    setIsDialogOpen(open);
  };

  const updateTempFilter = <K extends keyof CaseFilters>(
    key: K,
    value: CaseFilters[K]
  ) => {
    setTempFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    filters,
    tempFilters,
    isDialogOpen,
    activeFilterCount,
    handleApply,
    handleClear,
    handleOpenChange,
    updateTempFilter,
  };
}
