import { useState, useEffect, useMemo } from 'react';
import type { CaseStatus, CasePriority } from '@carton/shared/client';
import type { FilterItem } from '@/components/common/FiltersList/types';

const STORAGE_KEY = 'case-filters';

export interface CaseFilters {
  customer: string[];
  status: CaseStatus[];
  priority: CasePriority[];
  lastUpdated: 'all' | 'today' | 'week' | 'month';
}

const defaultFilters: CaseFilters = {
  customer: [],
  status: [],
  priority: [],
  lastUpdated: 'all',
};

export function useCaseFilters(customers: Array<{ id: string; name: string }> = []) {
  // Applied filters (persisted and used for API calls)
  const [appliedFilters, setAppliedFilters] = useState<CaseFilters>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : defaultFilters;
    } catch {
      return defaultFilters;
    }
  });

  // Draft filters (temporary state while dialog is open)
  const [draftFilters, setDraftFilters] = useState<CaseFilters>(appliedFilters);
  
  // Dialog open state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Persist applied filters to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appliedFilters));
    } catch (error) {
      console.error('Failed to persist filters:', error);
    }
  }, [appliedFilters]);

  // Calculate date range for "Last Updated" filter
  const getUpdatedAfterDate = (filter: CaseFilters['lastUpdated']): Date | undefined => {
    const now = new Date();
    switch (filter) {
      case 'today':
        return new Date(now.getFullYear(), now.getMonth(), now.getDate());
      case 'week':
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return weekAgo;
      case 'month':
        const monthAgo = new Date(now);
        monthAgo.setDate(monthAgo.getDate() - 30);
        return monthAgo;
      case 'all':
      default:
        return undefined;
    }
  };

  // Convert filters to API input format
  const apiFilters = useMemo(() => {
    return {
      customerId: appliedFilters.customer.length > 0 ? appliedFilters.customer : undefined,
      status: appliedFilters.status.length > 0 ? appliedFilters.status : undefined,
      priority: appliedFilters.priority.length > 0 ? appliedFilters.priority : undefined,
      updatedAfter: getUpdatedAfterDate(appliedFilters.lastUpdated),
    };
  }, [appliedFilters]);

  // Count active filters (excluding 'all' for lastUpdated)
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (appliedFilters.customer.length > 0) count++;
    if (appliedFilters.status.length > 0) count++;
    if (appliedFilters.priority.length > 0) count++;
    if (appliedFilters.lastUpdated !== 'all') count++;
    return count;
  }, [appliedFilters]);

  // Create FilterItem array for FiltersDialog
  const filterItems: FilterItem[] = useMemo(() => {
    return [
      {
        id: 'customer',
        label: 'Customer',
        value: draftFilters.customer,
        count: draftFilters.customer.length,
        multiSelect: true,
        options: customers.map((c) => ({ value: c.id, label: c.name })),
        onChange: (value) => setDraftFilters((prev) => ({ ...prev, customer: value as string[] })),
      },
      {
        id: 'status',
        label: 'Status',
        value: draftFilters.status,
        count: draftFilters.status.length,
        multiSelect: true,
        options: [
          { value: 'TO_DO', label: 'To Do' },
          { value: 'IN_PROGRESS', label: 'In Progress' },
          { value: 'COMPLETED', label: 'Completed' },
          { value: 'CLOSED', label: 'Closed' },
        ],
        onChange: (value) => setDraftFilters((prev) => ({ ...prev, status: value as CaseStatus[] })),
      },
      {
        id: 'priority',
        label: 'Priority',
        value: draftFilters.priority,
        count: draftFilters.priority.length,
        multiSelect: true,
        options: [
          { value: 'LOW', label: 'Low' },
          { value: 'MEDIUM', label: 'Medium' },
          { value: 'HIGH', label: 'High' },
          { value: 'URGENT', label: 'Urgent' },
        ],
        onChange: (value) => setDraftFilters((prev) => ({ ...prev, priority: value as CasePriority[] })),
      },
      {
        id: 'lastUpdated',
        label: 'Last updated',
        value: draftFilters.lastUpdated,
        count: draftFilters.lastUpdated !== 'all' ? 1 : 0,
        options: [
          { value: 'all', label: 'All time' },
          { value: 'today', label: 'Today' },
          { value: 'week', label: 'Last 7 days' },
          { value: 'month', label: 'Last 30 days' },
        ],
        onChange: (value) =>
          setDraftFilters((prev) => ({ ...prev, lastUpdated: value as CaseFilters['lastUpdated'] })),
      },
    ];
  }, [draftFilters, customers]);

  const handleOpenDialog = () => {
    setDraftFilters(appliedFilters);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDraftFilters(appliedFilters);
    setIsDialogOpen(false);
  };

  const handleApply = () => {
    setAppliedFilters(draftFilters);
    setIsDialogOpen(false);
  };

  const handleClear = () => {
    setDraftFilters(defaultFilters);
  };

  return {
    // State
    appliedFilters,
    draftFilters,
    isDialogOpen,
    activeFilterCount,
    
    // API input
    apiFilters,
    
    // Filter items for dialog
    filterItems,
    
    // Actions
    openDialog: handleOpenDialog,
    closeDialog: handleCloseDialog,
    applyFilters: handleApply,
    clearFilters: handleClear,
    setDialogOpen: setIsDialogOpen,
  };
}
