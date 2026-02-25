import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type CaseDetail = RouterOutputs['case']['getById'];
type Comment = NonNullable<CaseDetail>['comments'][number];

export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments?: Comment[];
  };
};
