import { Link, useParams, useNavigate } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/obra/Skeleton';
import { Button } from '@/components/obra/Button';
import { formatCaseNumber, CASE_STATUS_OPTIONS, CASE_PRIORITY_OPTIONS } from '@carton/shared/client';
import { FiltersTrigger } from '@/components/common/FiltersTrigger';
import { FiltersDialog } from '@/components/common/FiltersDialog';
import type { FilterItem } from '@/components/common/FiltersList/types';
import { useCaseFilters } from './hooks/useCaseFilters';
import type { CaseListProps, CaseListItem } from './types';

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    appliedFilters,
    draftFilters,
    isDialogOpen,
    activeFilterCount,
    openDialog,
    closeDialog,
    applyFilters,
    clearFilters,
    updateDraftFilter,
  } = useCaseFilters();

  const { data: cases, isLoading, error, refetch } = trpc.case.list.useQuery({
    customerIds: appliedFilters.customerIds.length > 0 ? appliedFilters.customerIds : undefined,
    statuses: appliedFilters.statuses.length > 0 ? appliedFilters.statuses : undefined,
    priorities: appliedFilters.priorities.length > 0 ? appliedFilters.priorities : undefined,
    lastUpdated: appliedFilters.lastUpdated !== 'all' ? appliedFilters.lastUpdated : undefined,
  });

  const { data: customers } = trpc.customer.list.useQuery();

  const customerOptions = customers?.map((customer) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  })) || [];

  const lastUpdatedOptions = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'last7days', label: 'Last 7 days' },
    { value: 'last30days', label: 'Last 30 days' },
  ];

  const filterItems: FilterItem[] = [
    {
      id: 'customer',
      label: 'Customer',
      value: draftFilters.customerIds,
      options: customerOptions,
      multiSelect: true,
      onChange: (value) => updateDraftFilter('customerIds', value as string[]),
    },
    {
      id: 'status',
      label: 'Status',
      value: draftFilters.statuses,
      options: CASE_STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      onChange: (value) => updateDraftFilter('statuses', value as typeof draftFilters.statuses),
    },
    {
      id: 'priority',
      label: 'Priority',
      value: draftFilters.priorities,
      options: CASE_PRIORITY_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      onChange: (value) => updateDraftFilter('priorities', value as typeof draftFilters.priorities),
    },
    {
      id: 'lastUpdated',
      label: 'Last Updated',
      value: draftFilters.lastUpdated,
      options: lastUpdatedOptions,
      onChange: (value) => updateDraftFilter('lastUpdated', value as typeof draftFilters.lastUpdated),
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
          onClick={openDialog}
          className="mb-2"
        />

        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={closeDialog}
          filters={filterItems}
          onApply={applyFilters}
          onClear={clearFilters}
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
          onClick={openDialog}
          className="mb-2"
        />

        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={closeDialog}
          filters={filterItems}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading cases</p>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()} size="small">
            Retry
          </Button>
        </div>
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
          onClick={openDialog}
          className="mb-2"
        />

        <FiltersDialog
          open={isDialogOpen}
          onOpenChange={closeDialog}
          filters={filterItems}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        <div className="text-center text-gray-500">
          <p className="text-sm">No cases found</p>
        </div>
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
        onClick={openDialog}
        className="mb-2"
      />

      <FiltersDialog
        open={isDialogOpen}
        onOpenChange={closeDialog}
        filters={filterItems}
        onApply={applyFilters}
        onClear={clearFilters}
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
    </div>
  );
}
