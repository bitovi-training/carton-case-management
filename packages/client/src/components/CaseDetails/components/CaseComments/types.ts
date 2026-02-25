import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type CaseDetail = NonNullable<RouterOutputs['case']['getById']>;

export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments: CaseDetail['comments'];
  };
};
