import React from 'react';
import { MenuBookItem } from './MenuBookItem';
import type { MenuItem } from '@/lib/menuData';

export interface MenuBookPageProps {
  items: MenuItem[]; // Up to 3 items per page side
  side: 'left' | 'right';
}

export function MenuBookPage({ items, side }: MenuBookPageProps) {
  return (
    <div className={`flex-1 p-6 md:p-8 ${side === 'left' ? 'md:border-r-2 border-neutral-300' : ''}`}>
      <div className="space-y-0">
        {items.map((item, index) => (
          <MenuBookItem key={`${item.name}-${index}`} item={item} />
        ))}
      </div>

      {/* Empty state if fewer than 3 items */}
      {items.length === 0 && (
        <div className="flex items-center justify-center h-full text-neutral-400 italic">
          End of menu
        </div>
      )}
    </div>
  );
}
