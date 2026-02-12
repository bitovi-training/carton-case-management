import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@carton/server';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type CaseWithDetails = NonNullable<RouterOutputs['case']['getById']>;

export type CaseCommentsProps = {
  caseData: CaseWithDetails;
};

export type CommentWithVotes = CaseWithDetails['comments'][number];

export interface CommentItemProps {
  comment: CommentWithVotes;
  currentUserId: string | null;
  onVote: (commentId: string, voteType: 'UP' | 'DOWN' | null) => void;
  isVoting: boolean;
}
