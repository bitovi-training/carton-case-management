import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { formatCaseNumber } from '@carton/shared/client';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId, customerId, className }: CaseRelatedCasesProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const trpcUtils = trpc.useUtils();

  const { data: relatedCases = [] } = trpc.case.getRelatedCases.useQuery({ caseId });

  // Fetch all cases for same customer (privacy requirement – only same customer's cases)
  const { data: allCases = [] } = trpc.case.list.useQuery(
    { customerId },
    { enabled: dialogOpen }
  );

  const addRelatedCasesMutation = trpc.case.addRelatedCases.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ caseId });
      setSuccessMessage('Hasta la vista Baby');
      setSelectedIds([]);
      setTimeout(() => {
        setSuccessMessage(null);
        setDialogOpen(false);
      }, 2000);
    },
    onError: () => {
      setErrorMessage('Failed to add related cases. Please try again.');
    },
  });

  const handleAdd = (ids: string[]) => {
    setErrorMessage(null);
    addRelatedCasesMutation.mutate({ caseId, relatedCaseIds: ids });
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedIds([]);
      setSuccessMessage(null);
      setErrorMessage(null);
    }
    setDialogOpen(open);
  };

  // Build accordion items from related cases
  const accordionItems = relatedCases.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: formatCaseNumber(c.id, c.createdAt),
    to: `/cases/${c.id}`,
  }));

  // Build dialog items: exclude current case and already-related cases
  const relatedCaseIds = new Set(relatedCases.map((c) => c.id));
  const dialogItems = allCases
    .filter((c) => c.id !== caseId && !relatedCaseIds.has(c.id))
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: formatCaseNumber(c.id, c.createdAt),
    }));

  return (
    <div className={className}>
      {accordionItems.length === 0 ? (
        <RelationshipManagerAccordion
          accordionTitle="Related Cases"
          items={[]}
          defaultOpen={true}
          onAddClick={() => setDialogOpen(true)}
          emptyStateMessage="No related cases yet."
        />
      ) : (
        <RelationshipManagerAccordion
          accordionTitle="Related Cases"
          items={accordionItems}
          defaultOpen={true}
          onAddClick={() => setDialogOpen(true)}
        />
      )}

      <RelationshipManagerDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        title="Add Related Cases"
        items={dialogItems}
        selectedItems={selectedIds}
        onSelectionChange={setSelectedIds}
        onAdd={handleAdd}
        successMessage={successMessage ?? undefined}
        errorMessage={errorMessage ?? undefined}
        isLoading={addRelatedCasesMutation.isPending}
      />
    </div>
  );
}
