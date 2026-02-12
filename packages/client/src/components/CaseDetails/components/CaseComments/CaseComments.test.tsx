import { describe, it, expect } from 'vitest';
import { renderWithTrpc } from '@/test/utils';
import { screen } from '@testing-library/react';
import { CaseComments } from './CaseComments';

describe('CaseComments', () => {
  it('renders without crashing', () => {
    const mockCaseData = {
      id: '1',
      comments: [],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Comments')).toBeInTheDocument();
  });

  it('renders comments with vote buttons', () => {
    const mockCaseData = {
      id: '1',
      comments: [
        {
          id: 'comment-1',
          content: 'Test comment',
          createdAt: new Date().toISOString(),
          author: {
            id: 'user-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
          votes: [
            {
              id: 'vote-1',
              type: 'UP' as const,
              userId: 'user-2',
              user: {
                id: 'user-2',
                firstName: 'Jane',
                lastName: 'Smith',
              },
            },
          ],
        },
      ],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByLabelText('Upvote')).toBeInTheDocument();
    expect(screen.getByLabelText('Downvote')).toBeInTheDocument();
  });

  it('displays vote counts correctly', () => {
    const mockCaseData = {
      id: '1',
      comments: [
        {
          id: 'comment-1',
          content: 'Test comment',
          createdAt: new Date().toISOString(),
          author: {
            id: 'user-1',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
          votes: [
            {
              id: 'vote-1',
              type: 'UP' as const,
              userId: 'user-2',
              user: {
                id: 'user-2',
                firstName: 'Jane',
                lastName: 'Smith',
              },
            },
            {
              id: 'vote-2',
              type: 'UP' as const,
              userId: 'user-3',
              user: {
                id: 'user-3',
                firstName: 'Bob',
                lastName: 'Jones',
              },
            },
            {
              id: 'vote-3',
              type: 'DOWN' as const,
              userId: 'user-4',
              user: {
                id: 'user-4',
                firstName: 'Alice',
                lastName: 'Brown',
              },
            },
          ],
        },
      ],
    };
    
    renderWithTrpc(<CaseComments caseData={mockCaseData} />);
    expect(screen.getByText('2')).toBeInTheDocument(); // 2 upvotes
    expect(screen.getByText('1')).toBeInTheDocument(); // 1 downvote
  });
});
