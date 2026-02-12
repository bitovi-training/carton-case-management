import { VoteButton } from '@/components/common/VoteButton';
import type { CommentItemProps } from './types';

export function CommentItem({
  comment,
  currentUserId,
  onVote,
  isVoting,
}: CommentItemProps) {
  // Calculate vote counts and voter lists
  const upVotes = comment.votes?.filter((v) => v.voteType === 'UP') || [];
  const downVotes = comment.votes?.filter((v) => v.voteType === 'DOWN') || [];
  
  const upVoteCount = upVotes.length;
  const downVoteCount = downVotes.length;
  
  const upVoters = upVotes.map((v) =>
    v.isAnonymous ? 'Anonymous' : `${v.user.firstName} ${v.user.lastName}`
  );
  const downVoters = downVotes.map((v) =>
    v.isAnonymous ? 'Anonymous' : `${v.user.firstName} ${v.user.lastName}`
  );
  
  // Check current user's vote
  const currentUserVote = currentUserId
    ? comment.votes?.find((v) => v.userId === currentUserId)
    : undefined;
  
  const hasUpVoted = currentUserVote?.voteType === 'UP';
  const hasDownVoted = currentUserVote?.voteType === 'DOWN';
  
  // Check if current user is the comment author
  const isOwnComment = currentUserId === comment.authorId;

  const handleUpVote = () => {
    if (isOwnComment) return;
    onVote(comment.id, hasUpVoted ? null : 'UP');
  };

  const handleDownVote = () => {
    if (isOwnComment) return;
    onVote(comment.id, hasDownVoted ? null : 'DOWN');
  };

  return (
    <div className="flex flex-col gap-2 py-2">
      <div className="flex gap-2 items-center">
        <div className="w-10 flex items-center justify-center text-sm font-semibold text-gray-900">
          {comment.author.firstName[0]}{comment.author.lastName[0]}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-medium">
            {comment.author.firstName} {comment.author.lastName}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
      </div>
      <p className="text-sm text-gray-700">{comment.content}</p>
      
      {/* Vote Buttons */}
      {!isOwnComment && (
        <div className="flex gap-4 items-center mt-1">
          <VoteButton
            type="up"
            active={hasUpVoted}
            count={upVoteCount}
            showCount={upVoteCount > 0}
            voters={upVoters}
            onClick={handleUpVote}
            className={isVoting ? 'opacity-50 pointer-events-none' : ''}
          />
          <VoteButton
            type="down"
            active={hasDownVoted}
            count={downVoteCount}
            showCount={downVoteCount > 0}
            voters={downVoters}
            onClick={handleDownVote}
            className={isVoting ? 'opacity-50 pointer-events-none' : ''}
          />
        </div>
      )}
    </div>
  );
}
