import { useState } from 'react';
import { CaseList } from '@/components/CaseList';
import { CaseDetails } from '@/components/CaseDetails';
import { Sheet } from '@/components/ui/sheet';

export function CasePage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <div className="flex gap-6 bg-[#fbfcfc] lg:rounded-lg shadow-sm h-full lg:p-6 p-4">
        <div className="hidden lg:block">
          <CaseList />
        </div>
        <CaseDetails onMenuClick={() => setIsSheetOpen(true)} />
      </div>

      {/* Mobile Sheet */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <div className="p-2">
          <CaseList onCaseClick={() => setIsSheetOpen(false)} />
        </div>
      </Sheet>
    </>
  );
}
