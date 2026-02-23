export type CaseCommentsProps = {
  caseData: {
    id: string;
    comments?: Array<{
      id: string;
      content: string;
      createdAt: string;
      author: { id: string; firstName: string; lastName: string; email: string };
      votes?: Array<{
        id: string;
        voteType: 'UP' | 'DOWN';
        userId: string;
        user: { id: string; firstName: string; lastName: string };
      }>;
    }>;
  };
};
