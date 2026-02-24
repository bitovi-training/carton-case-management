import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/obra/Button';
import { RelationshipManagerDialog } from '@/components/common/RelationshipManagerDialog';
import { trpc } from '@/lib/trpc';
import { Plus, X } from 'lucide-react';
import type { CaseRelatedCasesProps } from './types';

export function CaseRelatedCases({ caseId }: CaseRelatedCasesProps) {
  const [isExpanded, setIsExpanded] = useState(true);
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
      // Cancel outgoing refetches
      await trpcUtils.case.getRelatedCases.cancel({ id: caseId });

      // Snapshot previous value
      const previousRelated = trpcUtils.case.getRelatedCases.getData({ id: caseId });

      // Optimistically update
      if (previousRelated) {
        trpcUtils.case.getRelatedCases.setData(
          { id: caseId },
          previousRelated.filter((c) => c.id !== variables.relatedCaseId)
        );
      }

      return { previousRelated };
    },
    onError: (_error, _variables, context) => {
      // Rollback on error
      if (context?.previousRelated) {
        trpcUtils.case.getRelatedCases.setData({ id: caseId }, context.previousRelated);
      }
    },
    onSettled: () => {
      trpcUtils.case.getRelatedCases.invalidate({ id: caseId });
    },
  });

  const handleOpenDialog = () => {
    // Pre-select already related cases
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

  // Filter out the current case from the available cases
  const availableCases = allCases
    .filter((c) => c.id !== caseId)
    .map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: `#${c.id.slice(0, 8).toUpperCase()}`,
    }));

  return (
    <>
      <div className="w-full flex flex-col gap-3 border-t border-gray-300 pt-3">
        <Button
          onClick={() => setIsExpanded(!isExpanded)}
          variant="ghost"
          className="flex items-center justify-between py-4 w-full h-auto"
        >
          <h3 className="text-sm font-semibold">Related Cases</h3>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className={`transition-transform text-gray-600 ${!isExpanded ? 'rotate-180' : ''}`}
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Button>
        {isExpanded && (
          <div className="flex flex-col gap-2">
            {isLoadingRelated ? (
              <p className="text-sm text-gray-500 px-1">Loading...</p>
            ) : relatedCases.length === 0 ? (
              <p className="text-sm text-gray-500 px-1">No related cases</p>
            ) : (
              relatedCases.map((relatedCase) => (
                <div
                  key={relatedCase.id}
                  className="flex items-center justify-between gap-2 px-1 py-2 hover:bg-gray-100 rounded group"
                >
                  <button
                    onClick={() => handleCaseClick(relatedCase.id)}
                    className="flex-1 text-left text-sm text-teal-600 hover:underline"
                  >
                    <div className="font-medium">{relatedCase.title}</div>
                    <div className="text-xs text-gray-500">#{relatedCase.id.slice(0, 8).toUpperCase()}</div>
                  </button>
                  <button
                    onClick={() => handleRemoveCase(relatedCase.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity"
                    title="Remove relationship"
                  >
                    <X className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              ))
            )}
            <Button
              onClick={handleOpenDialog}
              variant="ghost"
              className="flex items-center gap-2 justify-start py-2 px-1 text-sm"
              disabled={isLoadingAll}
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        )}
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
