import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Calendar } from './calendar';
import type { DateRange } from 'react-day-picker';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function DefaultStory() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const WithDropdownNavigation: Story = {
  render: function WithDropdownNavigationStory() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return <Calendar mode="single" selected={date} onSelect={setDate} captionLayout="dropdown" />;
  },
};

export const NoSelection: Story = {
  render: function NoSelectionStory() {
    const [date, setDate] = useState<Date | undefined>();
    return <Calendar mode="single" selected={date} onSelect={setDate} />;
  },
};

export const RangeSelection: Story = {
  render: function RangeSelectionStory() {
    const [range, setRange] = useState<DateRange | undefined>();
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
        captionLayout="dropdown"
      />
    );
  },
};

export const MultipleSelection: Story = {
  render: function MultipleSelectionStory() {
    const [dates, setDates] = useState<Date[] | undefined>([]);
    return <Calendar mode="multiple" selected={dates} onSelect={setDates} />;
  },
};

export const DisabledDates: Story = {
  render: function DisabledDatesStory() {
    const [date, setDate] = useState<Date | undefined>();
    const disabledDays = { before: new Date() };
    return <Calendar mode="single" selected={date} onSelect={setDate} disabled={disabledDays} />;
  },
};
