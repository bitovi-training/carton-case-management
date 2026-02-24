import { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/obra/Skeleton';
import { Button } from '@/components/obra/Button';
import { formatCaseNumber, type CaseStatus, type CasePriority } from '@carton/shared/client';
import { FiltersDialog } from '@/components/common/FiltersDialog';
import { ListFilter } from 'lucide-react';
import type { CaseListProps, CaseListItem } from './types';
import type { FilterItem } from '@/components/common/FiltersList/types';

const STORAGE_KEY = 'case-list-filters';

interface CaseFilters {
  customerIds: string[];
  status: CaseStatus[];
  priorities: CasePriority[];
  lastUpdated: string;
}

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [customerIds, setCustomerIds] = useState<string[]>([]);
  const [statusValues, setStatusValues] = useState<CaseStatus[]>([]);
  const [priorityValues, setPriorityValues] = useState<CasePriority[]>([]);
  const [lastUpdatedValue, setLastUpdatedValue] = useState<string>('none');

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const filters: CaseFilters = JSON.parse(saved);
        setCustomerIds(filters.customerIds || []);
        setStatusValues(filters.status || []);
        setPriorityValues(filters.priorities || []);
        setLastUpdatedValue(filters.lastUpdated || 'none');
      } catch (e) {
        console.error('Failed to load filters from localStorage', e);
      }
    }
  }, []);

  const filterInput = useMemo(() => ({
    customerIds: customerIds.length > 0 ? customerIds : undefined,
    status: statusValues.length > 0 ? statusValues : undefined,
    priorities: priorityValues.length > 0 ? priorityValues : undefined,
    lastUpdated: lastUpdatedValue !== 'none' ? (lastUpdatedValue as 'today' | 'week' | 'month') : undefined,
  }), [customerIds, statusValues, priorityValues, lastUpdatedValue]);

  const { data: cases, isLoading, error, refetch } = trpc.case.list.useQuery(filterInput);
  const { data: customers } = trpc.customer.list.useQuery();

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (customerIds.length > 0) count++;
    if (statusValues.length > 0) count++;
    if (priorityValues.length > 0) count++;
    if (lastUpdatedValue !== 'none') count++;
    return count;
  }, [customerIds, statusValues, priorityValues, lastUpdatedValue]);

  const customerOptions = useMemo(() => {
    if (!customers) return [];
    return customers.map(c => ({
      value: c.id,
      label: `${c.firstName} ${c.lastName}`,
    }));
  }, [customers]);

  const filters: FilterItem[] = [
    {
      id: 'customer',
      label: 'Customer',
      value: customerIds,
      count: customerIds.length,
      multiSelect: true,
      options: customerOptions,
      onChange: (value) => setCustomerIds(value as string[]),
    },
    {
      id: 'status',
      label: 'Status',
      value: statusValues,
      count: statusValues.length,
      multiSelect: true,
      options: [
        { value: 'TO_DO', label: 'To Do' },
        { value: 'IN_PROGRESS', label: 'In Progress' },
        { value: 'COMPLETED', label: 'Completed' },
        { value: 'CLOSED', label: 'Closed' },
      ],
      onChange: (value) => setStatusValues(value as CaseStatus[]),
    },
    {
      id: 'priority',
      label: 'Priority',
      value: priorityValues,
      count: priorityValues.length,
      multiSelect: true,
      options: [
        { value: 'LOW', label: 'Low' },
        { value: 'MEDIUM', label: 'Medium' },
        { value: 'HIGH', label: 'High' },
        { value: 'URGENT', label: 'Urgent' },
      ],
      onChange: (value) => setPriorityValues(value as CasePriority[]),
    },
    {
      id: 'lastUpdated',
      label: 'Last updated',
      value: lastUpdatedValue,
      count: lastUpdatedValue !== 'none' ? 1 : 0,
      multiSelect: false,
      options: [
        { value: 'none', label: 'None selected' },
        { value: 'today', label: 'Today' },
        { value: 'week', label: 'This week' },
        { value: 'month', label: 'This month' },
      ],
      onChange: (value) => setLastUpdatedValue(value as string),
    },
  ];

  const handleClear = () => {
    setCustomerIds([]);
    setStatusValues([]);
    setPriorityValues([]);
    setLastUpdatedValue('none');
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleApply = () => {
    const filters: CaseFilters = {
      customerIds,
      status: statusValues,
      priorities: priorityValues,
      lastUpdated: lastUpdatedValue,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filters));
    setFiltersOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col w-full lg:w-[200px]">
        <div className="flex gap-2 mb-2">
          <Button
            onClick={() => navigate('/cases/new')}
            variant="secondary"
            className="flex-1"
          >
            Create Case
          </Button>
          <Button
            variant="outline"
            size="icon"
            disabled
          >
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
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
        <div className="flex gap-2 mb-2">
          <Button
            onClick={() => navigate('/cases/new')}
            variant="secondary"
            className="flex-1"
          >
            Create Case
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFiltersOpen(true)}
          >
            <ListFilter className="h-4 w-4" />
          </Button>
        </div>
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
        <div className="flex gap-2 mb-2">
          <Button
            onClick={() => navigate('/cases/new')}
            variant="secondary"
            className="flex-1"
          >
            Create Case
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setFiltersOpen(true)}
            className="relative"
          >
            <ListFilter className="h-4 w-4" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>
        <div className="text-center text-gray-500">
          <p className="text-sm">
            {activeFilterCount > 0 ? 'No cases match the selected filters' : 'No cases found'}
          </p>
        </div>
        <FiltersDialog
          open={filtersOpen}
          onOpenChange={setFiltersOpen}
          filters={filters}
          onApply={handleApply}
          onClear={handleClear}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full lg:w-[200px]">
      <div className="flex gap-2 mb-2">
        <Button
          onClick={() => navigate('/cases/new')}
          variant="secondary"
          className="flex-1"
        >
          Create Case
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setFiltersOpen(true)}
          className="relative"
        >
          <ListFilter className="h-4 w-4" />
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </Button>
      </div>
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
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        filters={filters}
        onApply={handleApply}
        onClear={handleClear}
      />
    </div>
  );
}
