import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/obra/Skeleton';
import { Button } from '@/components/obra/Button';
import { FiltersTrigger } from '@/components/common/FiltersTrigger';
import { formatCaseNumber, CaseStatus, CasePriority } from '@carton/shared/client';
import { CaseFiltersDialog, type CaseFiltersState } from './components/CaseFiltersDialog';
import type { CaseListProps, CaseListItem } from './types';

const INITIAL_FILTERS: CaseFiltersState = {
  customerIds: [],
  statuses: [],
  priorities: [],
  lastUpdated: 'all',
};

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState<CaseFiltersState>(INITIAL_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState<CaseFiltersState>(INITIAL_FILTERS);
  
  const { data: cases, isLoading, error, refetch } = trpc.case.list.useQuery({
    customerIds: appliedFilters.customerIds.length > 0 ? appliedFilters.customerIds : undefined,
    statuses: appliedFilters.statuses.length > 0 ? appliedFilters.statuses as CaseStatus[] : undefined,
    priorities: appliedFilters.priorities.length > 0 ? appliedFilters.priorities as CasePriority[] : undefined,
    lastUpdated: appliedFilters.lastUpdated !== 'all' ? appliedFilters.lastUpdated as 'today' | 'last7days' | 'last30days' : undefined,
  });

  const activeFilterCount = 
    appliedFilters.customerIds.length +
    appliedFilters.statuses.length +
    appliedFilters.priorities.length +
    (appliedFilters.lastUpdated !== 'all' ? 1 : 0);

  const handleOpenFilters = () => {
    setDraftFilters(appliedFilters);
    setFiltersOpen(true);
  };

  const handleApplyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const handleClearFilters = () => {
    setDraftFilters(INITIAL_FILTERS);
  };

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
          onClick={handleOpenFilters}
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
        <CaseFiltersDialog
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
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
          onClick={handleOpenFilters}
          className="mb-2"
        />
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Error loading cases</p>
          <p className="text-sm text-gray-600 mb-4">{error.message}</p>
          <Button onClick={() => refetch()} size="small">
            Retry
          </Button>
        </div>
        <CaseFiltersDialog
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
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
          onClick={handleOpenFilters}
          className="mb-2"
        />
        <div className="text-center text-gray-500">
          <p className="text-sm">No cases found</p>
          {activeFilterCount > 0 && (
            <p className="text-xs mt-2">Try adjusting your filters</p>
          )}
        </div>
        <CaseFiltersDialog
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={draftFilters}
          onFiltersChange={setDraftFilters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
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
        onClick={handleOpenFilters}
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
      <CaseFiltersDialog
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={draftFilters}
        onFiltersChange={setDraftFilters}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
}
