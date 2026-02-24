export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments?: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: { id: string; firstName: string; lastName: string; email: string };
      upvoteCount: number;
      downvoteCount: number;
      upvoters: string[];
      downvoters: string[];
      userVoteType: 'UP' | 'DOWN' | null;
    }>;
  };
};
