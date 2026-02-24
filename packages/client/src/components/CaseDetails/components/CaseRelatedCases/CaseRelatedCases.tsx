import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import { trpc } from '@/lib/trpc';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId }: CaseRelatedCasesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const { data: relatedCases = [], isLoading: isLoadingRelated } = trpc.case.getRelatedCases.useQuery({
    id: caseId,
  });

  const { data: allCases = [], isLoading: isLoadingAll } = trpc.case.list.useQuery();

  const addRelatedCasesMutation = trpc.case.addRelatedCases.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
      setIsDialogOpen(false);
      setSelectedCaseIds([]);
    },
  });

  const removeRelatedCaseMutation = trpc.case.removeRelatedCase.useMutation({
    onMutate: async (variables) => {
      await trpcUtils.case.getRelatedCases.cancel({ id: caseId });
      const previousRelated = trpcUtils.case.getRelatedCases.getData({ id: caseId });

      if (previousRelated) {
        trpcUtils.case.getRelatedCases.setData(
          { id: caseId },
          previousRelated.filter((c) => c.id !== variables.relatedCaseId)
        );
      }

      return { previousRelated };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousRelated) {
        trpcUtils.case.getRelatedCases.setData({ id: caseId }, context.previousRelated);
      }
    },
    onSettled: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
    },
  });

  const handleOpenDialog = () => {
    setSelectedCaseIds(relatedCases.map((c) => c.id));
    setIsDialogOpen(true);
  };

  const handleAddCases = (ids: string[]) => {
    addRelatedCasesMutation.mutate({
      caseId,
      relatedCaseIds: ids,
    });
  };

  const handleRemoveCase = (relatedCaseId: string) => {
    removeRelatedCaseMutation.mutate({
      caseId,
      relatedCaseId,
    });
  };

  const handleCaseClick = (caseIdToNavigate: string) => {
    navigate(`/cases/${caseIdToNavigate}`);
  };

  const relatedCaseItems = relatedCases.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: `#${c.id.slice(0, 8).toUpperCase()}`,
  }));

  const availableCases = allCases
    .filter((c) => c.id !== caseId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: `#${c.id.slice(0, 8).toUpperCase()}`,
    }));

  return (
    <>
      <div className="w-full border-t border-gray-300 pt-3">
        <RelationshipManagerAccordion
          accordionTitle="Related Cases"
          items={relatedCaseItems}
          defaultOpen={true}
          isLoading={isLoadingRelated}
          onAddClick={handleOpenDialog}
          onItemClick={handleCaseClick}
          onItemRemove={handleRemoveCase}
        />
      </div>

      <RelationshipManagerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Add Related Cases"
        items={availableCases}
        selectedItems={selectedCaseIds}
        onSelectionChange={setSelectedCaseIds}
        onAdd={handleAddCases}
      />
    </>
  );
}
