import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server/src/router';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type CaseListItem = RouterOutput['case']['list'][number];

export interface CaseListProps {
  onCaseClick?: () => void;
}
