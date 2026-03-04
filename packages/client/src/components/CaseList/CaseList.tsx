import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/obra/Skeleton';
import { Button } from '@/components/obra/Button';
import { Badge } from '@/components/obra/Badge';
import { ListFilter } from 'lucide-react';
import { formatCaseNumber, CASE_PRIORITY_OPTIONS, CASE_STATUS_OPTIONS, LAST_UPDATED_OPTIONS } from '@carton/shared/client';
import { FiltersDialog } from '@/components/common/FiltersDialog';
import type { FilterItem } from '@/components/common/FiltersList/types';
import type { CaseListProps, CaseListItem, CaseFilters } from './types';

const STORAGE_KEY = 'case-list-filters';

const defaultFilters: CaseFilters = {
  customerIds: [],
  statuses: [],
  priorities: [],
  lastUpdated: 'all',
};

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [filters, setFilters] = useState<CaseFilters>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultFilters;
  });
  
  const [draftFilters, setDraftFilters] = useState<CaseFilters>(filters);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const { data: customers } = trpc.customer.list.useQuery();
  
  const { data: cases, isLoading, error, refetch } = trpc.case.list.useQuery({
    status: filters.statuses.length > 0 ? filters.statuses : undefined,
    customerIds: filters.customerIds.length > 0 ? filters.customerIds : undefined,
    priorities: filters.priorities.length > 0 ? filters.priorities : undefined,
    lastUpdated: filters.lastUpdated !== 'all' ? filters.lastUpdated : undefined,
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.customerIds.length > 0) count++;
    if (filters.statuses.length > 0) count++;
    if (filters.priorities.length > 0) count++;
    if (filters.lastUpdated !== 'all') count++;
    return count;
  }, [filters]);

  const customerOptions = useMemo(() => {
    if (!customers) return [];
    return customers.map(c => ({
      value: c.id,
      label: `${c.firstName} ${c.lastName}`,
    }));
  }, [customers]);

  const filterItems: FilterItem[] = [
    {
      id: 'customer',
      label: 'Customer',
      value: draftFilters.customerIds,
      options: customerOptions,
      multiSelect: true,
      count: draftFilters.customerIds.length,
      onChange: (value: string[]) => setDraftFilters(prev => ({ ...prev, customerIds: value })),
    },
    {
      id: 'status',
      label: 'Status',
      value: draftFilters.statuses,
      options: CASE_STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      count: draftFilters.statuses.length,
      onChange: (value: string[]) => setDraftFilters(prev => ({ ...prev, statuses: value as CaseFilters['statuses'] })),
    },
    {
      id: 'priority',
      label: 'Priority',
      value: draftFilters.priorities,
      options: CASE_PRIORITY_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      count: draftFilters.priorities.length,
      onChange: (value: string[]) => setDraftFilters(prev => ({ ...prev, priorities: value as CaseFilters['priorities'] })),
    },
    {
      id: 'lastUpdated',
      label: 'Last updated',
      value: draftFilters.lastUpdated,
      options: LAST_UPDATED_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      count: draftFilters.lastUpdated !== 'all' ? 1 : 0,
      onChange: (value: string) => setDraftFilters(prev => ({ ...prev, lastUpdated: value as CaseFilters['lastUpdated'] })),
    },
  ];

  const handleApplyFilters = () => {
    setFilters(draftFilters);
    setIsFiltersOpen(false);
  };

  const handleClearFilters = () => {
    setDraftFilters(defaultFilters);
  };

  const handleOpenFilters = () => {
    setDraftFilters(filters);
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = (open: boolean) => {
    if (!open) {
      setDraftFilters(filters);
    }
    setIsFiltersOpen(open);
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
        <Button
          variant="outline"
          className="w-full mb-2"
        >
          <ListFilter className="h-4 w-4 mr-2" />
          Filters
        </Button>
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
        <Button
          variant={activeFilterCount > 0 ? 'default' : 'outline'}
          className="w-full mb-2 relative"
          onClick={handleOpenFilters}
        >
          <ListFilter className="h-4 w-4 mr-2" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
        <div className="text-center text-gray-500">
          <p className="text-sm">No cases found</p>
        </div>
        
        <FiltersDialog
          open={isFiltersOpen}
          onOpenChange={handleCloseFilters}
          filters={filterItems}
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
      <Button
        variant={activeFilterCount > 0 ? 'default' : 'outline'}
        className="w-full mb-2 relative"
        onClick={handleOpenFilters}
      >
        <ListFilter className="h-4 w-4 mr-2" />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant="destructive" className="ml-2">
            {activeFilterCount}
          </Badge>
        )}
      </Button>
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
        open={isFiltersOpen}
        onOpenChange={handleCloseFilters}
        filters={filterItems}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
}
