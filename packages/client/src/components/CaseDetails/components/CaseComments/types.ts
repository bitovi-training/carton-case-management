import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server/src/router';

type RouterOutput = inferRouterOutputs<AppRouter>;

export type CaseDetail = NonNullable<RouterOutput['case']['getById']>;

export type CaseCommentsProps = {
  caseData: CaseDetail;
};
