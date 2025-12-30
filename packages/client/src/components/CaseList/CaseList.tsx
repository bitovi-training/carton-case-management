import { Link, useParams } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { Skeleton } from '@/components/ui/skeleton';

interface CaseListProps {
  onCaseClick?: () => void;
}

export function CaseList({ onCaseClick }: CaseListProps) {
  const { id: activeId } = useParams<{ id: string }>();
  const { data: cases, isLoading } = trpc.case.list.useQuery();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 w-full lg:w-[200px]">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center justify-between px-4 py-2 rounded-lg">
            <div className="flex flex-col gap-2 w-full">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 w-full lg:w-[200px]">
      {cases?.map((caseItem) => {
        const isActive = caseItem.id === activeId;
        return (
          <Link
            key={caseItem.id}
            to={`/cases/${caseItem.id}`}
            onClick={onCaseClick}
            className={`flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
              isActive ? 'bg-[#e8feff]' : 'hover:bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-start text-sm leading-[21px] w-full lg:w-[167px]">
              <p className="font-semibold text-[#00848b] w-full truncate">{caseItem.title}</p>
              <p className="font-normal text-[#192627] w-full truncate">{caseItem.caseNumber}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
