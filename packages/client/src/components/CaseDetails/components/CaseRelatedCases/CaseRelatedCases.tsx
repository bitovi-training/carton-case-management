import { useState } from 'react';
import { trpc } from '@/lib/trpc';
import { formatCaseNumber } from '@carton/shared/client';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion/RelationshipManagerAccordion';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog/RelationshipManagerDialog';
import { Dialog } from '@/components/obra';
import type { CaseRelatedCasesProps } from './types';

const SUCCESS_MESSAGE_DURATION = 2000;

export function CaseRelatedCases({ caseId, customerId }: CaseRelatedCasesProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const trpcUtils = trpc.useUtils();

  const { data: relatedCases = [] } = trpc.case.getRelatedCases.useQuery({ id: caseId });

  const { data: allCases = [] } = trpc.case.list.useQuery(
    { customerId },
    { enabled: dialogOpen }
  );

  const addRelatedCasesMutation = trpc.case.addRelatedCases.useMutation({
    onSuccess: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
      setShowSuccess(true);
      setSelectedIds([]);
      setTimeout(() => {
        setShowSuccess(false);
        setDialogOpen(false);
      }, SUCCESS_MESSAGE_DURATION);
    },
  });

  const handleOpenDialog = () => {
    setSelectedIds([]);
    setShowSuccess(false);
    setDialogOpen(true);
  };

  const handleAdd = (ids: string[]) => {
    addRelatedCasesMutation.mutate({ caseId, relatedCaseIds: ids });
  };

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedIds([]);
      setShowSuccess(false);
    }
    setDialogOpen(open);
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
    setDialogOpen(false);
  };

  const accordionItems = relatedCases.map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: formatCaseNumber(c.id, c.createdAt),
    to: `/cases/${c.id}`,
  }));

  const existingRelatedIds = new Set(relatedCases.map((c) => c.id));

  const availableCases = allCases
    .filter((c) => c.id !== caseId && !existingRelatedIds.has(c.id))
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: formatCaseNumber(c.id, c.createdAt),
    }));

  return (
    <>
      <RelationshipManagerAccordion
        accordionTitle="Related Cases"
        items={accordionItems}
        defaultOpen={true}
        onAddClick={handleOpenDialog}
      />

      {showSuccess ? (
        <Dialog
          open={showSuccess}
          onOpenChange={(open) => {
            if (!open) handleSuccessDismiss();
          }}
          type="Desktop"
        >
          <div className="flex flex-col items-center justify-center gap-4 p-8 h-full">
            <p className="text-xl font-semibold text-gray-900">Hasta la vista Baby</p>
            <p className="text-sm text-gray-500">Related cases added successfully.</p>
          </div>
        </Dialog>
      ) : (
        <RelationshipManagerDialog
          open={dialogOpen}
          onOpenChange={handleDialogOpenChange}
          title="Add Related Cases"
          items={availableCases}
          selectedItems={selectedIds}
          onSelectionChange={setSelectedIds}
          onAdd={handleAdd}
        />
      )}
    </>
  );
}
