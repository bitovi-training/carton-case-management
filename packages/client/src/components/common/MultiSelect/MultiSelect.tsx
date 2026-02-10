import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/obra';
import { Checkbox } from '@/components/obra';
import { cn } from '@/lib/utils';
import type { MultiSelectProps } from './types';

export function MultiSelect({
  label,
  options,
  value = [],
  onChange,
  placeholder = 'None selected',
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  
  const handleToggle = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };
  
  const displayValue = value.length === 0
    ? placeholder
    : value.length === 1
    ? options.find(opt => opt.value === value[0])?.label || placeholder
    : `${value.length} selected`;
  
  const displayLabel = value.length > 0 ? `${label} (${value.length})` : `${label} (0)`;
  
  return (
    <div className={cn('flex flex-col gap-0 w-full', className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className={cn(
              'flex w-full items-center h-[52px] py-2 px-3 gap-2',
              'border border-solid border-border rounded-lg',
              'bg-white shadow-xs transition-colors',
              'hover:bg-gray-50',
              'outline-none',
              'focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]'
            )}
          >
            <div className="flex flex-col items-start w-full min-w-0">
              <span className="text-xs font-semibold text-gray-600">{displayLabel}</span>
              <span className="text-sm text-gray-900 truncate w-full text-left">{displayValue}</span>
            </div>
            <ChevronDown className="size-5 text-gray-600 shrink-0" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-1"
          align="start"
        >
          <div className="flex flex-col max-h-[300px] overflow-y-auto">
            {options.map((option) => (
              <label
                key={option.value}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 cursor-pointer',
                  'hover:bg-gray-100 rounded transition-colors'
                )}
              >
                <Checkbox
                  checked={value.includes(option.value)}
                  onCheckedChange={() => handleToggle(option.value)}
                />
                <span className="text-sm text-gray-900">{option.label}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
