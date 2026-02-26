import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Accordion, Button } from '@/components/obra';
import { MoreOptionsMenu, MenuItem } from '@/components/common/MoreOptionsMenu';
import type { RelationshipManagerAccordionProps } from './types';

export function RelationshipManagerAccordion({
  accordionTitle,
  items,
  defaultOpen = false,
  onAddClick,
  onRemoveItem,
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
                  {items.length === 0 ? (
                    <p className="text-sm text-gray-500 px-4">No related cases</p>
                  ) : (
                    items.map((item) => (
                      <div
                        key={item.id}
                        className="group flex items-center justify-between rounded-lg px-4 py-2 hover:bg-gray-50"
                      >
                        <div className="flex flex-col text-sm leading-[21px]">
                          <Link
                            to={item.to}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-teal-600 hover:underline"
                          >
                            {item.title}
                          </Link>
                          <p className="text-gray-950">{item.subtitle}</p>
                        </div>
                        {onRemoveItem && (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreOptionsMenu aria-label={`Options for ${item.title}`}>
                              <MenuItem
                                onClick={() => onRemoveItem(item.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove linked case
                              </MenuItem>
                            </MoreOptionsMenu>
                          </div>
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
