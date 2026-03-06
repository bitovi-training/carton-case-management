import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { formatCaseNumber } from '@carton/shared/client';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId }: CaseRelatedCasesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<string[]>([]);

  const trpcUtils = trpc.useUtils();

  const { data: relatedCases = [] } = trpc.case.getRelatedCases.useQuery({ caseId });
  const { data: allCases = [] } = trpc.case.list.useQuery();

  const addRelatedCasesMutation = trpc.case.addRelatedCases.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ caseId });
    },
  });

  const relatedCaseIds = relatedCases.map((c) => c.id);

  // Cases available to add (exclude current case and already-related cases)
  const availableCases = allCases.filter((c) => c.id !== caseId);

  const accordionItems = relatedCases.map((relatedCase) => ({
    id: relatedCase.id,
    title: relatedCase.title,
    subtitle: formatCaseNumber(relatedCase.id, relatedCase.createdAt),
    to: `/cases/${relatedCase.id}`,
  }));

  const dialogItems = availableCases.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: formatCaseNumber(c.id, c.createdAt),
  }));

  const handleAddClick = () => {
    setPendingSelection(relatedCaseIds);
    setIsDialogOpen(true);
  };

  const handleAdd = async (selectedIds: string[]) => {
    // Only add newly selected IDs (not ones that were already related)
    const newIds = selectedIds.filter((id) => !relatedCaseIds.includes(id));
    if (newIds.length > 0) {
      await addRelatedCasesMutation.mutateAsync({
        caseId,
        relatedCaseIds: newIds,
      });
    }
    setIsDialogOpen(false);
  };

  return (
    <>
      <RelationshipManagerAccordion
        accordionTitle="Related Cases"
        items={accordionItems}
        defaultOpen={true}
        onAddClick={handleAddClick}
      />

      <RelationshipManagerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Add Related Cases"
        items={dialogItems}
        selectedItems={pendingSelection}
        onSelectionChange={setPendingSelection}
        onAdd={handleAdd}
      />
    </>
  );
}
