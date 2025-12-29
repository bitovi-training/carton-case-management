import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Home, Settings, Users } from 'lucide-react';
import { MenuList } from './MenuList';

const meta: Meta<typeof MenuList> = {
  component: MenuList,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MenuList>;

const mockItems = [
  { id: 'home', label: 'Home', path: '/', icon: <Home size={20} /> },
  { id: 'settings', label: 'Settings', path: '/settings', icon: <Settings size={20} /> },
  { id: 'users', label: 'Users', path: '/users', icon: <Users size={20} /> },
];

export const Desktop: Story = {
  args: {
    items: mockItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'responsive',
    },
  },
};

export const Mobile: Story = {
  args: {
    items: mockItems,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 'home', label: 'Home', path: '/', icon: <Home size={20} /> }],
  },
};

export const WithActiveItem: Story = {
  args: {
    items: mockItems.map((item, idx) => ({
      ...item,
      isActive: idx === 0,
    })),
  },
};
