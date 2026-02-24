import { Plus, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Accordion, Button } from '@/components/obra';
import type { RelationshipManagerAccordionProps } from './types';

export function RelationshipManagerAccordion({
  accordionTitle,
  items,
  defaultOpen = false,
  onAddClick,
  onItemClick,
  onItemRemove,
  isLoading = false,
  className,
}: RelationshipManagerAccordionProps) {
  const accordionValue = accordionTitle.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className={cn('w-full sm:w-[200px]', className)}>
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? accordionValue : undefined}
        items={[
          {
            value: accordionValue,
            trigger: accordionTitle,
            triggerProps: {
              className: 'text-sm font-semibold text-gray-950 px-0 py-4',
            },
            content: (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-3">
                  {isLoading ? (
                    <p className="text-sm text-gray-500 px-1">Loading...</p>
                  ) : items.length === 0 ? (
                    <p className="text-sm text-gray-500 px-1">No related items</p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          'flex items-center justify-between rounded-lg px-4 py-2',
                          onItemClick && 'hover:bg-gray-100 group'
                        )}
                      >
                        <button
                          onClick={() => onItemClick?.(item.id)}
                          className={cn(
                            'flex flex-col text-sm leading-[21px] text-left flex-1',
                            onItemClick && 'cursor-pointer'
                          )}
                          disabled={!onItemClick}
                        >
                          <p className={cn('font-semibold', onItemClick && 'text-teal-600 hover:underline')}>
                            {item.title}
                          </p>
                          <p className="text-gray-950">{item.subtitle}</p>
                        </button>
                        {onItemRemove && (
                          <button
                            onClick={() => onItemRemove(item.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded transition-opacity ml-2"
                            title="Remove relationship"
                          >
                            <X className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
                {onAddClick && (
                  <Button
                    variant="secondary"
                    size="regular"
                    onClick={onAddClick}
                    leftIcon={<Plus className="h-4 w-4" />}
                  >
                    Add
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
