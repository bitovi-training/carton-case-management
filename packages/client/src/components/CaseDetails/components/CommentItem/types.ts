export type CommentItemProps = {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    author: { id: string; firstName: string; lastName: string; email: string };
    votes?: Array<{
      id: string;
      userId: string;
      voteType: 'UP' | 'DOWN';
    }>;
  };
  currentUserId?: string;
};
