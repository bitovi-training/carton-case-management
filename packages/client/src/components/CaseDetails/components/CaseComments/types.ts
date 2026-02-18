export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments?: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: { id: string; firstName: string; lastName: string; email: string };
      upVoteCount?: number;
      downVoteCount?: number;
      upVoters?: Array<{ id: string; firstName: string; lastName: string }>;
      downVoters?: Array<{ id: string; firstName: string; lastName: string }>;
      userVote?: 'UP' | 'DOWN' | null;
    }>;
  };
};
