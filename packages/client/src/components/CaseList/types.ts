import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server/src/router';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type CaseListItem = RouterOutput['case']['list'][number];

export interface CaseListProps {
  onCaseClick?: () => void;
}

export interface CaseFilters {
  customerIds: string[];
  statuses: ('TO_DO' | 'IN_PROGRESS' | 'COMPLETED' | 'CLOSED')[];
  priorities: ('LOW' | 'MEDIUM' | 'HIGH' | 'URGENT')[];
  lastUpdated: 'all' | 'today' | 'last7days' | 'last30days';
}
