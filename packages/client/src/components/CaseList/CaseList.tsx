import { Link, useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/obra/Skeleton';
import { Button } from '@/components/obra/Button';
import { formatCaseNumber, CASE_STATUS_OPTIONS, CASE_PRIORITY_OPTIONS } from '@carton/shared/client';
import { FiltersDialog, FiltersTrigger } from '@/components/common';
import type { FilterItem } from '@/components/common/FiltersList/types';
import type { CaseListProps, CaseListItem } from './types';
import { useCaseFilters, type CaseFilters } from './hooks/useCaseFilters';

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    filters,
    tempFilters,
    isDialogOpen,
    activeFilterCount,
    handleApply,
    handleClear,
    handleOpenChange,
    updateTempFilter,
  } = useCaseFilters();

  const { data: cases, isLoading, error, refetch } = trpc.case.list.useQuery({
    status: filters.status.length > 0 ? filters.status as any[] : undefined,
    customerId: filters.customer.length > 0 ? filters.customer : undefined,
    priority: filters.priority.length > 0 ? filters.priority as any[] : undefined,
    lastUpdated: filters.lastUpdated !== 'all' ? filters.lastUpdated : undefined,
  });

  const { data: allCases } = trpc.case.list.useQuery();

  const customerOptions = useMemo(() => {
    if (!allCases) return [];
    const uniqueCustomers = new Map<string, { value: string; label: string }>();
    allCases.forEach((caseItem) => {
      if (caseItem.customer) {
        uniqueCustomers.set(caseItem.customer.id, {
          value: caseItem.customer.id,
          label: `${caseItem.customer.firstName} ${caseItem.customer.lastName}`,
        });
      }
    });
    return Array.from(uniqueCustomers.values());
  }, [allCases]);

  const lastUpdatedOptions = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'Last 7 days' },
    { value: 'month', label: 'Last 30 days' },
  ];

  const filterItems: FilterItem[] = [
    {
      id: 'customer',
      label: 'Customer',
      value: tempFilters.customer,
      count: tempFilters.customer.length,
      options: customerOptions,
      onChange: (value) => updateTempFilter('customer', value as string[]),
      multiSelect: true,
    },
    {
      id: 'status',
      label: 'Status',
      value: tempFilters.status,
      count: tempFilters.status.length,
      options: CASE_STATUS_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label })),
      onChange: (value) => updateTempFilter('status', value as string[]),
      multiSelect: true,
    },
    {
      id: 'priority',
      label: 'Priority',
      value: tempFilters.priority,
      count: tempFilters.priority.length,
      options: CASE_PRIORITY_OPTIONS.map((opt) => ({ value: opt.value, label: opt.label })),
      onChange: (value) => updateTempFilter('priority', value as string[]),
      multiSelect: true,
    },
    {
      id: 'lastUpdated',
      label: 'Last updated',
      value: tempFilters.lastUpdated,
      count: tempFilters.lastUpdated !== 'all' ? 1 : 0,
      options: lastUpdatedOptions,
      onChange: (value) => updateTempFilter('lastUpdated', value as CaseFilters['lastUpdated']),
      multiSelect: false,
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col w-full lg:w-[200px]">
        <Button
          onClick={() => navigate('/cases/new')}
          variant="secondary"
          className="w-full mb-2"
        >
          Create Case
        </Button>
        <FiltersTrigger
          activeCount={activeFilterCount}
          onClick={() => handleOpenChange(true)}
          className="mb-2"
        />
        <div className="flex flex-col gap-2">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex items-center justify-between px-4 py-2 rounded-lg">
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
              </div>
            </div>
          ))}
        </div>
        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={handleOpenChange}
          filters={filterItems}
          onApply={handleApply}
          onClear={handleClear}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full lg:w-[200px] p-4">
        <Button
          onClick={() => navigate('/cases/new')}
          variant="secondary"
          className="w-full mb-2"
        >
          Create Case
        </Button>
        <FiltersTrigger
          activeCount={activeFilterCount}
          onClick={() => handleOpenChange(true)}
          className="mb-2"
        />
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading cases</p>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()} size="small">
            Retry
          </Button>
        </div>
        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={handleOpenChange}
          filters={filterItems}
          onApply={handleApply}
          onClear={handleClear}
        />
      </div>
    );
  }

  if (!cases || cases.length === 0) {
    return (
      <div className="flex flex-col w-full lg:w-[200px] p-4">
        <Button
          onClick={() => navigate('/cases/new')}
          variant="secondary"
          className="w-full mb-2"
        >
          Create Case
        </Button>
        <FiltersTrigger
          activeCount={activeFilterCount}
          onClick={() => handleOpenChange(true)}
          className="mb-2"
        />
        <div className="text-center text-gray-500">
          <p className="text-sm">No cases found</p>
        </div>
        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={handleOpenChange}
          filters={filterItems}
          onApply={handleApply}
          onClear={handleClear}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full lg:w-[200px]">
      <Button
        onClick={() => navigate('/cases/new')}
        variant="secondary"
        className="w-full mb-2"
      >
        Create Case
      </Button>
      <FiltersTrigger
        activeCount={activeFilterCount}
        onClick={() => handleOpenChange(true)}
        className="mb-2"
      />
      <div className="flex flex-col gap-2">
        {cases?.map((caseItem: CaseListItem) => {
          const isActive = caseItem.id === activeId;
          return (
            <Link
              key={caseItem.id}
              to={`/cases/${caseItem.id}`}
              onClick={onCaseClick}
              className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'bg-[#e8feff]' : 'hover:bg-gray-100'
              }`}
            >
              <div className="flex flex-col items-start text-sm leading-[21px] w-full lg:w-[167px]">
                <p className="font-semibold text-[#00848b] w-full truncate">{caseItem.title}</p>
                <p className="font-normal text-[#192627] w-full truncate">
                  {formatCaseNumber(caseItem.id, caseItem.createdAt)}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <FiltersDialog
        open={isDialogOpen}
        onOpenChange={handleOpenChange}
        filters={filterItems}
        onApply={handleApply}
        onClear={handleClear}
      />
    </div>
  );
}
