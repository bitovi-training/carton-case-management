import { Dialog, DialogHeader, DialogFooter, Button } from '@/components/obra';
import { FiltersList } from '@/components/common/FiltersList';
import { trpc } from '@/lib/trpc';
import { CASE_PRIORITY_OPTIONS, CASE_STATUS_OPTIONS, LAST_UPDATED_OPTIONS } from '@carton/shared/client';
import type { CaseFiltersDialogProps } from './types';
import type { FilterItem } from '@/components/common/FiltersList/types';

export function CaseFiltersDialog({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onApply,
  onClear,
}: CaseFiltersDialogProps) {
  const { data: customers } = trpc.customer.list.useQuery();

  const customerOptions = customers?.map((customer: { id: string; firstName: string; lastName: string }) => ({
    value: customer.id,
    label: `${customer.firstName} ${customer.lastName}`,
  })) || [];

  const filterItems: FilterItem[] = [
    {
      id: 'customer',
      label: 'Customer',
      value: filters.customerIds,
      options: customerOptions,
      multiSelect: true,
      count: filters.customerIds.length,
      onChange: (value) => onFiltersChange({ ...filters, customerIds: value as string[] }),
    },
    {
      id: 'status',
      label: 'Status',
      value: filters.statuses,
      options: CASE_STATUS_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      count: filters.statuses.length,
      onChange: (value) => onFiltersChange({ ...filters, statuses: value as string[] }),
    },
    {
      id: 'priority',
      label: 'Priority',
      value: filters.priorities,
      options: CASE_PRIORITY_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: true,
      count: filters.priorities.length,
      onChange: (value) => onFiltersChange({ ...filters, priorities: value as string[] }),
    },
    {
      id: 'lastUpdated',
      label: 'Last updated',
      value: filters.lastUpdated,
      options: LAST_UPDATED_OPTIONS.map(opt => ({ value: opt.value, label: opt.label })),
      multiSelect: false,
      count: filters.lastUpdated !== 'all' ? 1 : 0,
      onChange: (value) => onFiltersChange({ ...filters, lastUpdated: value as string }),
    },
  ];

  const handleApply = () => {
    onApply();
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      type="Desktop Scrollable"
      header={<DialogHeader type="Header" title="Filters" onClose={() => onOpenChange(false)} />}
      footer={
        <DialogFooter type="2 Buttons Right">
          <Button variant="outline" onClick={onClear}>
            Clear
          </Button>
          <Button variant="primary" onClick={handleApply}>
            Apply
          </Button>
        </DialogFooter>
      }
    >
      <FiltersList filters={filterItems} title="Filters" />
    </Dialog>
  );
}
