import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CommentItem } from './CommentItem';

// Mock tRPC
vi.mock('@/lib/trpc', () => ({
  trpc: {
    useUtils: () => ({
      comment: {
        getVotes: {
          cancel: vi.fn(),
          getData: vi.fn(),
          setData: vi.fn(),
          invalidate: vi.fn(),
        },
      },
    }),
    comment: {
      getVotes: {
        useQuery: () => ({
          data: {
            upCount: 3,
            downCount: 1,
            upVoters: ['Alex Morgan', 'Greg Miller', 'Andrew Smith'],
            downVoters: ['John Doe'],
            userVote: null,
          },
        }),
      },
      vote: {
        useMutation: () => ({
          mutate: vi.fn(),
        }),
      },
    },
  },
}));

describe('CommentItem', () => {
  const mockComment = {
    id: '123',
    content: 'This is a test comment',
    createdAt: '2025-11-29T11:55:00.000Z',
    author: {
      id: 'user1',
      firstName: 'Alex',
      lastName: 'Morgan',
      email: 'alex@example.com',
    },
    votes: [
      { id: '1', userId: 'user2', voteType: 'UP' as const },
      { id: '2', userId: 'user3', voteType: 'UP' as const },
      { id: '3', userId: 'user4', voteType: 'DOWN' as const },
    ],
  };

  it('should render comment content', () => {
    render(<CommentItem comment={mockComment} currentUserId="user1" />);
    expect(screen.getByText('This is a test comment')).toBeInTheDocument();
  });

  it('should render author name', () => {
    render(<CommentItem comment={mockComment} currentUserId="user1" />);
    expect(screen.getByText('Alex Morgan')).toBeInTheDocument();
  });

  it('should render author initials', () => {
    render(<CommentItem comment={mockComment} currentUserId="user1" />);
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  it('should render vote buttons', () => {
    render(<CommentItem comment={mockComment} currentUserId="user1" />);
    const upvoteButton = screen.getByLabelText('Upvote');
    const downvoteButton = screen.getByLabelText('Downvote');
    expect(upvoteButton).toBeInTheDocument();
    expect(downvoteButton).toBeInTheDocument();
  });

  it('should render vote counts', () => {
    render(<CommentItem comment={mockComment} currentUserId="user1" />);
    expect(screen.getByText('3')).toBeInTheDocument(); // upvotes
    expect(screen.getByText('1')).toBeInTheDocument(); // downvotes
  });
});
