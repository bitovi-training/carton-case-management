import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type CaseDetail = NonNullable<RouterOutputs['case']['getById']>;

export interface CaseCommentsProps {
  caseData: CaseDetail;
}
