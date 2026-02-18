import { trpc } from '@/lib/trpc';

export function useCommentVotes(commentId: string) {
  const utils = trpc.useUtils();
  
  // Fetch votes for this comment
  const { data: votesData } = trpc.commentVote.getVotes.useQuery({ commentId });
  
  // Vote mutation
  const voteMutation = trpc.commentVote.vote.useMutation({
    onMutate: async (variables) => {
      // Cancel outgoing refetches
      await utils.commentVote.getVotes.cancel({ commentId });
      
      // Snapshot previous value
      const previousVotes = utils.commentVote.getVotes.getData({ commentId });
      
      // Optimistically update votes
      if (previousVotes) {
        const currentVote = previousVotes.userVote as 'none' | 'up' | 'down';
        const newVoteType = variables.voteType.toLowerCase() as 'up' | 'down';
        
        let newUserVote: 'none' | 'up' | 'down' = 'none';
        let upvotesChange = 0;
        let downvotesChange = 0;
        
        if (currentVote === 'none') {
          // Adding a new vote
          newUserVote = newVoteType;
          if (newVoteType === 'up') {
            upvotesChange = 1;
          } else {
            downvotesChange = 1;
          }
        } else if (currentVote === newVoteType) {
          // Removing the vote (toggle off)
          newUserVote = 'none';
          if (newVoteType === 'up') {
            upvotesChange = -1;
          } else {
            downvotesChange = -1;
          }
        } else {
          // Switching vote type
          newUserVote = newVoteType;
          if (currentVote === 'up') {
            upvotesChange = -1;
            downvotesChange = 1;
          } else {
            upvotesChange = 1;
            downvotesChange = -1;
          }
        }
        
        utils.commentVote.getVotes.setData({ commentId }, {
          ...previousVotes,
          userVote: newUserVote,
          upvotes: previousVotes.upvotes + upvotesChange,
          downvotes: previousVotes.downvotes + downvotesChange,
        });
      }
      
      return { previousVotes };
    },
    onError: (_err, _variables, context) => {
      // Rollback on error
      if (context?.previousVotes) {
        utils.commentVote.getVotes.setData({ commentId }, context.previousVotes);
      }
    },
    onSettled: () => {
      // Refetch to sync with server
      utils.commentVote.getVotes.invalidate({ commentId });
    },
  });
  
  const handleUpvote = () => {
    voteMutation.mutate({ commentId, voteType: 'UP' });
  };
  
  const handleDownvote = () => {
    voteMutation.mutate({ commentId, voteType: 'DOWN' });
  };
  
  return {
    votesData,
    handleUpvote,
    handleDownvote,
    isVoting: voteMutation.isPending,
  };
}
