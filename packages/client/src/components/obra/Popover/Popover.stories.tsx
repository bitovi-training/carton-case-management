import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';
import { Button } from '@/components/obra/Button';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Obra/Popover',
  argTypes: {
    modal: {
      control: 'boolean',
      description: 'Whether clicking outside closes the popover',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popover displays rich content in a floating container anchored to a trigger element.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Popover>;

// Interactive example with state management
function InteractivePopover() {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon className="h-4 w-4" />
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-medium">Popover Content</h3>
          <p className="text-sm text-slate-600">
            This is a popover with some example content. It can contain any React components.
          </p>
          <div className="flex gap-2">
            <Button size="small" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button size="small" variant="outline">
              Action
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export const Default: Story = {
  render: () => <InteractivePopover />,
};

export const WithCustomAlignment: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Align Start</Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-64">
        <div className="p-4">
          <h4 className="text-sm font-medium mb-2">Aligned to start</h4>
          <p className="text-sm text-slate-600">
            This popover is aligned to the start of the trigger element.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const DifferentSides: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="small">Top</Button>
        </PopoverTrigger>
        <PopoverContent side="top">
          <div className="p-3">
            <p className="text-sm">Top side</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="small">Right</Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <div className="p-3">
            <p className="text-sm">Right side</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="small">Bottom</Button>
        </PopoverTrigger>
        <PopoverContent side="bottom">
          <div className="p-3">
            <p className="text-sm">Bottom side</p>
          </div>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="small">Left</Button>
        </PopoverTrigger>
        <PopoverContent side="left">
          <div className="p-3">
            <p className="text-sm">Left side</p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
  parameters: {
    layout: 'centered',
  },
};