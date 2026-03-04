import { useParams } from 'react-router-dom';
import { trpc } from '@/lib/trpc';
import { UserInformation } from './components/UserInformation';
import { RelationshipManagerAccordion } from '@/components/common/RelationshipManagerAccordion';
import { formatCaseNumber } from '@carton/shared/client';

export function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: userData, isLoading } = trpc.user.getById.useQuery(
    { id: id! },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="animate-spin h-8 w-8 border-4 border-gray-300 border-t-gray-600 rounded-full mx-auto mb-2"></div>
          <p>Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-lg font-medium mb-2">User not found</p>
          <p className="text-sm">This user may have been deleted or does not exist</p>
        </div>
      </div>
    );
  }

  const caseItems = (userData.createdCases || []).map((c) => ({
    id: c.id,
    title: c.title,
    subtitle: formatCaseNumber(c.id, c.createdAt),
    to: `/cases/${c.id}`,
  }));

  return (
    <div className="flex flex-1 flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex flex-col px-1 flex-1 gap-6">
        <UserInformation
          userId={userData.id}
          userData={userData}
        />
      </div>

      {/* Related Cases Sidebar */}
      <div className="lg:w-[300px] flex-shrink-0">
        <RelationshipManagerAccordion
          accordionTitle="Cases"
          items={caseItems}
          defaultOpen={true}
        />
      </div>
    </div>
  );
}
