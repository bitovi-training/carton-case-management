export interface CommentWithVotesProps {
  comment: {
    id: string;
    content: string;
    createdAt: string;
    author: {
      id: string;
      firstName: string;
      lastName: string;
    };
  };
}
