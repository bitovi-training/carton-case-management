import type { VoteType } from '@carton/shared/client';

export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments?: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: { id: string; firstName: string; lastName: string; email: string };
      upvoteCount?: number;
      downvoteCount?: number;
      userVoteType?: VoteType | null;
      upvoters?: string[];
      downvoters?: string[];
    }>;
  };
};
