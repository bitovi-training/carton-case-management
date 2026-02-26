import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;

export type RelatedCase = RouterOutputs['case']['getRelatedCases'][number];

export interface CaseRelatedCasesProps {
  caseId: string;
}
