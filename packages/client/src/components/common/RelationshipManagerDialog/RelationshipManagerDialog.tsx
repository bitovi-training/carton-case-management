import { cn } from '@/lib/utils';
import { Dialog, DialogFooter, DialogHeader } from '@/components/obra/Dialog';
import { Button } from '@/components/obra';
import type { RelationshipManagerDialogProps } from './types';
import type { RelationshipManagerListItem } from './components/RelationshipManagerList/types';
import { RelationshipManagerList } from './components/RelationshipManagerList';

export function RelationshipManagerDialog({
  open,
  onOpenChange,
  title,
  items,
  selectedItems,
  onSelectionChange,
  onAdd,
  successMessage,
  errorMessage,
  isLoading = false,
  className,
}: RelationshipManagerDialogProps) {
  const listItems: RelationshipManagerListItem[] = items.map((item) => ({
    ...item,
    selected: selectedItems.includes(item.id),
  }));

  const handleToggle = (itemId: string) => {
    if (selectedItems.includes(itemId)) {
      onSelectionChange(selectedItems.filter((id) => id !== itemId));
    } else {
      onSelectionChange([...selectedItems, itemId]);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      type="Desktop Scrollable"
      header={
        <DialogHeader
          type="Close Only"
          onClose={() => {
            onOpenChange(false);
          }}
        />
      }
      footer={
        !successMessage ? (
          <DialogFooter>
            {errorMessage && (
              <p className="text-sm text-red-600 mb-2">{errorMessage}</p>
            )}
            <Button
              onClick={() => onAdd(selectedItems)}
              disabled={selectedItems.length === 0 || isLoading}
              className="bg-gray-950 text-white hover:bg-gray-800"
            >
              {isLoading ? 'Adding...' : 'Add'}
            </Button>
          </DialogFooter>
        ) : undefined
      }
      className={cn('w-[400px] h-auto max-h-[90vh]', className)}
    >
      {successMessage ? (
        <div className="flex flex-col items-center justify-center py-8 px-4 gap-2">
          <p className="text-lg font-semibold text-gray-950">{successMessage}</p>
        </div>
      ) : (
        <RelationshipManagerList title={title} items={listItems} onItemToggle={handleToggle} className="w-full" />
      )}
    </Dialog>
  );
}
