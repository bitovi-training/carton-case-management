import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server/src/router';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type CaseListItem = RouterOutput['case']['list'][number];

export interface CaseListProps {
  onCaseClick?: () => void;
}

export interface CaseFilters {
  customer: string[];
  status: string[];
  priority: string[];
  lastUpdated: 'all' | 'today' | 'last7days' | 'last30days';
}

export interface CaseFilterOptions {
  customer: Array<{ value: string; label: string }>;
  status: Array<{ value: string; label: string }>;
  priority: Array<{ value: string; label: string }>;
  lastUpdated: Array<{ value: string; label: string }>;
}
