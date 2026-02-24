import { useState, useEffect } from 'react';
import { Dialog, DialogHeader, DialogFooter } from '@/components/obra/Dialog';
import { Button } from '@/components/obra/Button';
import { CheckboxGroup } from '@/components/obra/CheckboxGroup';
import { trpc } from '@/lib/trpc';
import { formatCaseNumber } from '@carton/shared/client';
import type { AddRelatedCasesDialogProps } from './types';

export function AddRelatedCasesDialog({
  open,
  onOpenChange,
  currentCaseId,
  existingRelatedCaseIds,
  onSave,
}: AddRelatedCasesDialogProps) {
  const [selectedCaseIds, setSelectedCaseIds] = useState<string[]>(existingRelatedCaseIds);

  const { data: cases, isLoading } = trpc.case.list.useQuery();

  // Update selected cases when dialog opens or existing relationships change
  useEffect(() => {
    if (open) {
      setSelectedCaseIds(existingRelatedCaseIds);
    }
  }, [open, existingRelatedCaseIds]);

  // Filter out the current case from the list
  const availableCases = (cases || []).filter(c => c.id !== currentCaseId);

  const handleCheckboxChange = (caseId: string, checked: boolean) => {
    if (checked) {
      setSelectedCaseIds(prev => [...prev, caseId]);
    } else {
      setSelectedCaseIds(prev => prev.filter(id => id !== caseId));
    }
  };

  const handleSave = () => {
    onSave(selectedCaseIds);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setSelectedCaseIds(existingRelatedCaseIds);
    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      type="Desktop Scrollable"
      header={
        <DialogHeader
          title="Add Related Cases"
          onClose={handleCancel}
        />
      }
      footer={
        <DialogFooter>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isLoading}
          >
            Add
          </Button>
        </DialogFooter>
      }
    >
      <div className="flex flex-col gap-3 py-2">
        {isLoading ? (
          <p className="text-sm text-gray-600">Loading cases...</p>
        ) : availableCases.length === 0 ? (
          <p className="text-sm text-gray-600">No other cases available.</p>
        ) : (
          availableCases.map(caseItem => (
            <CheckboxGroup
              key={caseItem.id}
              layout="block"
              checked={selectedCaseIds.includes(caseItem.id)}
              label={
                <div className="flex flex-col">
                  <span className="font-semibold text-teal-600">{caseItem.title}</span>
                  <span className="text-gray-950">
                    {formatCaseNumber(caseItem.id, caseItem.createdAt)}
                  </span>
                </div>
              }
              onCheckedChange={(checked) => handleCheckboxChange(caseItem.id, checked)}
            />
          ))
        )}
      </div>
    </Dialog>
  );
}
