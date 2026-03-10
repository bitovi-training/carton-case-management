import { useState, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import type { CaseFilters, CaseFilterOptions } from '../../types';

export function useCaseFilters() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<CaseFilters>({
    customer: [],
    status: [],
    priority: [],
    lastUpdated: 'all',
  });
  const [appliedFilters, setAppliedFilters] = useState<CaseFilters>({
    customer: [],
    status: [],
    priority: [],
    lastUpdated: 'all',
  });

  // Fetch all customers for filter options
  const { data: customers } = trpc.customer.list.useQuery();

  // Generate filter options dynamically
  const filterOptions: CaseFilterOptions = useMemo(() => {
    const customerOptions = (customers || [])
      .map((customer) => ({
        value: customer.id,
        label: `${customer.firstName} ${customer.lastName}`,
      }))
      .sort((a, b) => a.label.localeCompare(b.label));

    return {
      customer: customerOptions,
      status: [
        { value: 'TO_DO', label: 'To Do' },
        { value: 'IN_PROGRESS', label: 'In Progress' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CLOSED', label: 'Closed' },
      ],
      priority: [
        { value: 'LOW', label: 'Low' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'HIGH', label: 'High' },
        { value: 'URGENT', label: 'Urgent' },
      ],
      lastUpdated: [
        { value: 'all', label: 'All time' },
        { value: 'today', label: 'Today' },
        { value: 'last7days', label: 'Last 7 days' },
        { value: 'last30days', label: 'Last 30 days' },
      ],
    };
  }, [customers]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (appliedFilters.customer.length > 0) count++;
    if (appliedFilters.status.length > 0) count++;
    if (appliedFilters.priority.length > 0) count++;
    if (appliedFilters.lastUpdated !== 'all') count++;
    return count;
  }, [appliedFilters]);

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
    setDraftFilters({
      customer: [],
      status: [],
      priority: [],
      lastUpdated: 'all',
    });
  };

  const updateDraftFilter = <K extends keyof CaseFilters>(
    key: K,
    value: CaseFilters[K]
  ) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    isDialogOpen,
    draftFilters,
    appliedFilters,
    filterOptions,
    activeFilterCount,
    handleOpenDialog,
    handleCloseDialog,
    handleApply,
    handleClear,
    updateDraftFilter,
  };
}
