import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCaseNumber } from '@carton/shared/client';
import { trpc } from '@/lib/trpc';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId, relatedCases }: CaseRelatedCasesProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>([]);
  const navigate = useNavigate();
  const trpcUtils = trpc.useUtils();

  const { data: allCases } = trpc.case.list.useQuery();

  const addRelatedCasesMutation = trpc.caseRelationship.addRelatedCases.useMutation({
    onSuccess: () => {
      trpcUtils.case.getById.invalidate({ id: caseId });
      setIsDialogOpen(false);
      setSelectedCaseIds([]);
    },
  });

  const removeRelatedCaseMutation = trpc.caseRelationship.removeRelatedCase.useMutation({
    onSuccess: () => {
      trpcUtils.case.getById.invalidate({ id: caseId });
    },
  });

  const items = (relatedCases || []).map((caseItem) => ({
    id: caseItem.id,
    title: caseItem.title,
    subtitle: formatCaseNumber(caseItem.id, caseItem.createdAt),
  }));

  const handleAddClick = () => {
    const relatedCaseIds = relatedCases.map((c) => c.id);
    setSelectedCaseIds(relatedCaseIds);
    setIsDialogOpen(true);
  };

  const handleItemClick = (itemId: string) => {
    navigate(`/cases/${itemId}`);
  };

  const handleRemoveClick = async (itemId: string) => {
    await removeRelatedCaseMutation.mutateAsync({
      caseId,
      relatedCaseId: itemId,
    });
  };

  const handleDialogAdd = async (selectedIds: string[]) => {
    await addRelatedCasesMutation.mutateAsync({
      caseId,
      relatedCaseIds: selectedIds,
    });
  };

  const availableCases = (allCases || [])
    .filter((c) => c.id !== caseId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: formatCaseNumber(c.id, c.createdAt),
    }));

  return (
    <>
      <div className="lg:w-[300px] flex-shrink-0">
        <RelationshipManagerAccordion
          accordionTitle="Related Cases"
          items={items}
          defaultOpen={true}
          onAddClick={handleAddClick}
          onItemClick={handleItemClick}
          onRemoveClick={handleRemoveClick}
        />
      </div>

      <RelationshipManagerDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Add Related Cases"
        items={availableCases}
        selectedItems={selectedCaseIds}
        onSelectionChange={setSelectedCaseIds}
        onAdd={handleDialogAdd}
      />
    </>
  );
}
