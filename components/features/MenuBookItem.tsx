import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { PexelsImage } from '@/components/ui/PexelsImage';
import { getBadgeType } from '@/lib/menuClient';
import type { MenuItem } from '@/lib/menuData';

export interface MenuBookItemProps {
  item: MenuItem;
}

export function MenuBookItem({ item }: MenuBookItemProps) {
  const badgeType = getBadgeType(item.badge);

  // Category colors for fallback gradients
  const categoryColors: Record<string, string> = {
    'Appetizer': 'from-orange-400 to-red-500',
    'Main Dish': 'from-red-500 to-pink-600',
    'Rice & Biryani': 'from-yellow-400 to-orange-500',
    'Breads': 'from-amber-400 to-yellow-500',
    'South Indian': 'from-green-400 to-teal-500',
    'Sides': 'from-blue-400 to-cyan-500',
    'Dessert': 'from-pink-400 to-purple-500',
    'Beverages': 'from-cyan-400 to-blue-500',
    'Street Food': 'from-purple-400 to-pink-500',
  };

  const gradientClass = categoryColors[item.category] || 'from-neutral-400 to-neutral-500';

  return (
    <div className="flex gap-4 py-4 border-b border-neutral-200 last:border-b-0">
      {/* Item Image */}
      <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
        <PexelsImage
          imagePath={`menuItems.${item.name}`}
          alt={item.name}
          fallbackGradient={gradientClass}
          width={96}
          height={96}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Item Details */}
      <div className="flex-1 min-w-0">
        {/* Badge */}
        <div className="mb-1">
          <Badge type={badgeType}>{item.badge}</Badge>
        </div>

        {/* Name */}
        <h3 className="menu-item-title mb-1">
          {item.name}
        </h3>

        {/* Description */}
        <p className="menu-item-description line-clamp-2">
          {item.description}
        </p>

        {/* Price */}
        <div className="mt-2">
          <span className="menu-item-price">
            ₹{item.price.replace(' rs', '')}
          </span>
        </div>
      </div>
    </div>
  );
}
