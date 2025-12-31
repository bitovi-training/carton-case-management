import { useState, useRef, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

interface EditablePriorityProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  isLoading?: boolean;
}

const PRIORITY_OPTIONS = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

export function EditablePriority({
  value,
  onSave,
  className = '',
  isLoading = false,
}: EditablePriorityProps) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (newValue: string) => {
    if (newValue !== value) {
      onSave(newValue);
    }
    setIsEditing(false);
  };

  const getDisplayLabel = (val: string) => {
    return PRIORITY_OPTIONS.find((opt) => opt.value === val)?.label || val;
  };

  if (!isEditing) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={`cursor-pointer rounded px-2 -mx-2 py-1 -my-1 transition-colors hover:bg-gray-100 ${className}`}
              onClick={() => setIsEditing(true)}
            >
              {getDisplayLabel(value)}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to edit</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Select
      value={value}
      onValueChange={handleChange}
      disabled={isLoading}
      open={isEditing}
      onOpenChange={(open) => {
        if (!open) {
          setIsEditing(false);
        }
      }}
    >
      <SelectTrigger className="w-full text-sm">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {PRIORITY_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
