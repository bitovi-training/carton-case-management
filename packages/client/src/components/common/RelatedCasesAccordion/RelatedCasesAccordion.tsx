import { useState } from 'react';
import { formatCaseNumber } from '@carton/shared/client';
import { trpc } from '@/lib/trpc';
import { RelationshipManagerAccordion } from '../RelationshipManagerAccordion/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '../RelationshipManagerDialog/RelationshipManagerDialog';

interface RelatedCasesAccordionProps {
  caseId: string;
}

export function RelatedCasesAccordion({ caseId }: RelatedCasesAccordionProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const trpcUtils = trpc.useUtils();

  const { data: relatedCases = [] } = trpc.case.getRelatedCases.useQuery({ id: caseId });
  const { data: allCases = [] } = trpc.case.list.useQuery();

  const addRelatedCaseMutation = trpc.case.addRelatedCase.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
    },
    onError: (error) => {
      console.error('OH NOOOOO, THINGS HAVE GONE HORRIBLY WRONG!', error);
    },
  });

  const removeRelatedCaseMutation = trpc.case.removeRelatedCase.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
    },
    onError: (error) => {
      console.error('OH NOOOOO, THINGS HAVE GONE HORRIBLY WRONG!', error);
    },
  });

  const relatedCaseIds = relatedCases.map((c) => c.id);

  const accordionItems = relatedCases.map((caseItem) => ({
    id: caseItem.id,
    title: caseItem.title,
    subtitle: formatCaseNumber(caseItem.id, caseItem.createdAt),
    to: `/cases/${caseItem.id}`,
  }));

  // All cases except the current case shown in dialog
  const dialogItems = allCases
    .filter((c) => c.id !== caseId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: formatCaseNumber(c.id, c.createdAt),
    }));

  const handleAddClick = () => {
    setSelectedItems([]);
    setDialogOpen(true);
  };

  const handleAdd = async (ids: string[]) => {
    await Promise.all(ids.map((relatedCaseId) => addRelatedCaseMutation.mutateAsync({ caseId, relatedCaseId })));
    setDialogOpen(false);
    setSelectedItems([]);
  };

  const handleRemove = (relatedCaseId: string) => {
    removeRelatedCaseMutation.mutate({ caseId, relatedCaseId });
  };

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedItems([]);
    }
  };

  return (
    <>
      <div className="lg:w-[300px] flex-shrink-0">
        <RelationshipManagerAccordion
          accordionTitle="Related Cases"
          items={accordionItems}
          defaultOpen={true}
          onAddClick={handleAddClick}
          onRemoveItem={handleRemove}
        />
      </div>

      <RelationshipManagerDialog
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        title="Add Related Cases"
        items={dialogItems}
        selectedItems={selectedItems}
        disabledItems={relatedCaseIds}
        onSelectionChange={setSelectedItems}
        onAdd={handleAdd}
      />
    </>
  );
}
