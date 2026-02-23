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
      userVoteType: 'UP' | 'DOWN' | null;
      upvoters: string[];
      downvoters: string[];
      votes?: Array<{
        id: string;
        voteType: string;
        userId: string;
      }>;
    }>;
  };
};
