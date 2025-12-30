import { useState } from 'react';
import { List } from 'lucide-react';
import { trpc } from '@/lib/trpc';
import { Textarea } from '@/components/ui/textarea';
import { StatusDropdown } from '../../../StatusDropdown';
import type { CaseStatus } from '../../../StatusDropdown/types';

type CaseInformationProps = {
  caseId: string;
  caseData: {
    title: string;
    caseNumber: string;
    status: CaseStatus;
    description: string;
  };
  onMenuClick?: () => void;
};

export function CaseInformation({ caseId, caseData, onMenuClick }: CaseInformationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(caseData.description);

  const utils = trpc.useUtils();
  const updateCase = trpc.case.update.useMutation({
    onSuccess: () => {
      // Invalidate queries to refetch the updated data
      utils.case.getById.invalidate({ id: caseId });
      utils.case.list.invalidate();
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('Failed to update case description:', error);
      alert('Failed to save changes. Please try again.');
    },
  });

  const handleSave = () => {
    if (editedDescription.trim() === '') {
      alert('Description cannot be empty');
      return;
    }

    updateCase.mutate({
      id: caseId,
      description: editedDescription,
    });
  };

  const handleCancel = () => {
    setEditedDescription(caseData.description);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: Menu button + Title */}
      <div className="flex items-start gap-4 lg:hidden w-full">
        <button
          onClick={onMenuClick}
          className="flex-shrink-0 w-9 h-9 flex items-center justify-center bg-[#e8feff] border border-gray-300 rounded-lg shadow-sm hover:bg-[#bcecef] transition-colors"
          aria-label="Open case list"
        >
          <List size={16} className="text-gray-700" />
        </button>
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <h1 className="text-xl font-semibold truncate">{caseData.title}</h1>
          <p className="text-base font-semibold text-gray-600">#{caseData.caseNumber}</p>
        </div>
      </div>

      {/* Mobile: Status Badge */}
      <div className="lg:hidden self-start">
        <StatusDropdown caseId={caseId} currentStatus={caseData.status} />
      </div>

      {/* Desktop: Title + Status on same line */}
      <div className="hidden lg:flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h1 className="text-3xl font-semibold">{caseData.title}</h1>
          <p className="text-xl text-gray-600">#{caseData.caseNumber}</p>
        </div>
        <StatusDropdown caseId={caseId} currentStatus={caseData.status} />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-4">
        <h2 className="text-base font-semibold">Case Description</h2>

        {!isEditing ? (
          <p
            className="text-sm text-gray-700 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
            onClick={() => setIsEditing(true)}
          >
            {caseData.description}
          </p>
        ) : (
          <div className="flex flex-col">
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="min-h-[76px] resize-y"
              autoFocus
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSave}
                disabled={updateCase.isPending}
                className="bg-[#00848b] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#006b72] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updateCase.isPending ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={updateCase.isPending}
                className="bg-white text-[#4c5b5c] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
