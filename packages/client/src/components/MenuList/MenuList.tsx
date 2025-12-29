import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export interface MenuListProps {
  items: MenuItem[];
  className?: string;
  onItemClick?: (item: MenuItem) => void;
}

export function MenuList({ items, className, onItemClick }: MenuListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeItem = items.find(item => item.isActive) || items[0];
  const otherItems = items.filter(item => item.id !== activeItem?.id);

  return (
    <nav
      className={`px-6 py-2 md:px-2 md:py-4 md:bg-[hsl(var(--menu-bg))] md:w-18 md:min-h-screen ${className || ''}`}
      aria-label="Main menu"
    >
      <div className="relative md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex w-fit items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--menu-item-bg))] hover:bg-[hsl(var(--menu-item-hover))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--menu-item-hover))] focus-visible:ring-offset-2"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          {activeItem?.icon && <span className="flex-shrink-0">{activeItem.icon}</span>}
          <span className="text-sm">{activeItem?.label}</span>
          {otherItems.length > 0 && (
            <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          )}
        </button>
        
        {isOpen && otherItems.length > 0 && (
          <div className="absolute top-full left-0 mt-1 flex flex-col gap-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[160px] z-10">
            {otherItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => {
                  onItemClick?.(item);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex flex-col gap-3">
        {items.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            onClick={() => onItemClick?.(item)}
            className={`flex items-center justify-center p-3 rounded-md bg-[hsl(var(--menu-item-bg))] hover:bg-[hsl(var(--menu-item-hover))] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--menu-item-hover))] focus-visible:ring-offset-2 ${
              item.isActive ? 'border-l-4 border-[#04646A]' : ''
            }`}
            aria-current={item.isActive ? 'page' : undefined}
            aria-label={item.label}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
          </Link>
        ))}
      </div>
    </nav>
  );
}
