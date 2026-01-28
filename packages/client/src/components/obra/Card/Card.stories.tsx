import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Label } from '../Label';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Obra/Card',
  tags: ['autodocs'],
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/MQUbIrlfuM8qnr9XZ7jc82/Obra-shadcn-ui--Carton-?node-id=179-29234&m=dev',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

const HeaderContent = () => (
  <div className="flex items-center justify-between">
    <h3 className="text-lg font-semibold">Card Header</h3>
    <span className="text-sm text-muted-foreground">Optional badge</span>
  </div>
);

const MainContent = () => (
  <div className="space-y-2">
    <p className="text-sm">This is the main content area of the card.</p>
    <p className="text-sm text-muted-foreground">
      It can contain any React components or content.
    </p>
  </div>
);

const FooterContent = () => (
  <div className="flex items-center justify-end gap-2">
    <button className="rounded bg-secondary px-4 py-2 text-sm font-medium">
      Cancel
    </button>
    <button className="rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
      Save
    </button>
  </div>
);

export const OneSlot: Story = {
  args: {
    main: <MainContent />,
  },
};

export const OneSlotWithCustomContent: Story = {
  args: {
    main: (
      <div className="text-center">
        <p className="text-2xl font-bold">42</p>
        <p className="text-sm text-muted-foreground">Active Cases</p>
      </div>
    ),
  },
};

export const TwoSlots: Story = {
  args: {
    header: <HeaderContent />,
    main: <MainContent />,
  },
};

export const TwoSlotsMinimal: Story = {
  args: {
    header: <h3 className="text-base font-semibold">Simple Header</h3>,
    main: <p className="text-sm">Simple content</p>,
  },
};

export const ThreeSlots: Story = {
  args: {
    header: <HeaderContent />,
    main: <MainContent />,
    footer: <FooterContent />,
  },
};

export const ThreeSlotsFullExample: Story = {
  args: {
    header: (
      <div>
        <h3 className="text-lg font-semibold">Case #12345</h3>
        <p className="text-xs text-muted-foreground">Created on Jan 26, 2026</p>
      </div>
    ),
    main: (
      <div className="space-y-3">
        <div>
          <Label className="text-sm font-medium">Status:</Label>
          <p className="text-sm">In Progress</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Assigned to:</Label>
          <p className="text-sm">John Doe</p>
        </div>
        <div>
          <Label className="text-sm font-medium">Description:</Label>
          <p className="text-sm text-muted-foreground">
            Customer reported issue with product functionality
          </p>
        </div>
      </div>
    ),
    footer: (
      <div className="flex items-center justify-between">
        <button className="text-sm text-muted-foreground hover:text-foreground">
          View Details →
        </button>
        <div className="flex gap-2">
          <button className="rounded border border-border px-3 py-1.5 text-sm">
            Edit
          </button>
          <button className="rounded bg-primary px-3 py-1.5 text-sm text-primary-foreground">
            Close Case
          </button>
        </div>
      </div>
    ),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3">
      <Card main={<MainContent />} />
      <Card header={<HeaderContent />} main={<MainContent />} />
      <Card
        header={<HeaderContent />}
        main={<MainContent />}
        footer={<FooterContent />}
      />
    </div>
  ),
};

export const EmptySlots: Story = {
  args: {},
};

export const WithCustomStyling: Story = {
  args: {
    header: <h3 className="text-lg font-bold">Custom Styled Card</h3>,
    main: <p className="text-sm">This card has custom styling applied.</p>,
    className: 'border-2 border-primary shadow-lg',
  },
};
