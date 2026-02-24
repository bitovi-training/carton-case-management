import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { RelatedCasesAccordion } from '@/components/common/RelatedCasesAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import { formatCaseNumber } from '@carton/shared/client';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId }: CaseRelatedCasesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);

  const utils = trpc.useUtils();

  // Fetch related cases for the current case
  const { data: relatedCases = [] } = trpc.relatedCase.list.useQuery({ caseId });

  // Fetch all cases for the dialog (excluding the current case)
  const { data: allCases = [] } = trpc.case.list.useQuery();

  // Filter out the current case from the available cases list
  const availableCases = allCases.filter((c) => c.id !== caseId);

  // Update related cases mutation
  const updateRelatedCases = trpc.relatedCase.update.useMutation({
    onMutate: async (variables) => {
      // Cancel any outgoing refetches
      await utils.relatedCase.list.cancel({ caseId });

      // Snapshot the previous value
      const previousRelatedCases = utils.relatedCase.list.getData({ caseId });

      // Optimistically update the cache
      if (previousRelatedCases) {
        const optimisticCases = availableCases.filter((c) =>
          variables.relatedCaseIds.includes(c.id)
        );
        utils.relatedCase.list.setData({ caseId }, optimisticCases);
      }

      return { previousRelatedCases };
    },
    onSuccess: () => {
      utils.relatedCase.list.invalidate({ caseId });
      setIsDialogOpen(false);
    },
    onError: (error, _variables, context) => {
      console.error('Failed to update related cases:', error);
      // Roll back to previous value on error
      if (context?.previousRelatedCases) {
        utils.relatedCase.list.setData({ caseId }, context.previousRelatedCases);
      }
    },
  });

  const handleDialogOpen = () => {
    // Initialize selected cases with current related cases
    setSelectedCaseIds(relatedCases.map((c) => c.id));
    setIsDialogOpen(true);
  };

  const handleSelectionChange = (newSelectedIds: string[]) => {
    // Enforce max 5 cases limit
    if (newSelectedIds.length <= 5) {
      setSelectedCaseIds(newSelectedIds);
    }
  };

  const handleAdd = async (selectedIds: string[]) => {
    await updateRelatedCases.mutateAsync({
      caseId,
      relatedCaseIds: selectedIds,
    });
  };

  // Transform related cases for accordion display
  const relatedCasesForAccordion = relatedCases.map((caseItem) => ({
    id: caseItem.id,
    title: caseItem.title,
    status: caseItem.status,
    priority: caseItem.priority,
    createdAt: caseItem.createdAt,
  }));

  // Transform available cases for dialog display
  const availableCasesForDialog = availableCases.map((caseItem) => ({
    id: caseItem.id,
    title: caseItem.title,
    subtitle: formatCaseNumber(caseItem.id, caseItem.createdAt),
  }));

  return (
    <>
      <RelatedCasesAccordion cases={relatedCasesForAccordion} onAddClick={handleDialogOpen} />
      <RelationshipManagerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Add Related Cases"
        items={availableCasesForDialog}
        selectedItems={selectedCaseIds}
        onSelectionChange={handleSelectionChange}
        onAdd={handleAdd}
      />
    </>
  );
}
