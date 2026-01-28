import type { Meta, StoryObj } from '@storybook/react';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from './index';
import { Button } from '../Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Obra/Tooltip',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=133-14788&m=dev',
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex min-h-[300px] items-center justify-center">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="top">Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

export const SideTop: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="top">Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

export const SideBottom: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="bottom">Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

export const SideLeft: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="left">Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

export const SideRight: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="right">Tooltip text</TooltipContent>
    </Tooltip>
  ),
};

export const WithButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Button with tooltip</Button>
      </TooltipTrigger>
      <TooltipContent>Additional information</TooltipContent>
    </Tooltip>
  ),
};

export const WithIconButton: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="mini">
          <span>ℹ️</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top">
        This is helpful information
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithLongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover for details</TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs">
        This is a longer tooltip with more detailed information that might span multiple lines.
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithCustomOffset: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="top" sideOffset={12}>
        Tooltip with larger offset
      </TooltipContent>
    </Tooltip>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="bottom" align="start">
        Aligned to start
      </TooltipContent>
    </Tooltip>
  ),
};

export const AlignCenter: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="bottom" align="center">
        Centered (default)
      </TooltipContent>
    </Tooltip>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger>Hover me</TooltipTrigger>
      <TooltipContent side="bottom" align="end">
        Aligned to end
      </TooltipContent>
    </Tooltip>
  ),
};

export const MultipleTooltips: Story = {
  render: () => (
    <div className="flex gap-4">
      <Tooltip>
        <TooltipTrigger>First</TooltipTrigger>
        <TooltipContent>First tooltip</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger>Second</TooltipTrigger>
        <TooltipContent side="bottom">Second tooltip</TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger>Third</TooltipTrigger>
        <TooltipContent side="right">Third tooltip</TooltipContent>
      </Tooltip>
    </div>
  ),
};
