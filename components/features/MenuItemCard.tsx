import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { PexelsImage } from '@/components/ui/PexelsImage';
import { getBadgeType } from '@/lib/menuClient';
import type { MenuItem } from '@/lib/menuData';

export interface MenuItemCardProps {
  item: MenuItem;
  showCategory?: boolean;
}

export function MenuItemCard({ item, showCategory = false }: MenuItemCardProps) {
  const badgeType = getBadgeType(item.badge);

  // Create placeholder image with gradient based on category
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
    <div className="card overflow-hidden group h-full flex flex-col">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <PexelsImage
          imagePath={`menuItems.${item.name}`}
          alt={item.name}
          fallbackGradient={gradientClass}
          width={400}
          height={300}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Badge and Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge type={badgeType}>{item.badge}</Badge>
          {showCategory && (
            <span className="text-xs text-neutral-500 uppercase tracking-wide">
              {item.category}
            </span>
          )}
        </div>

        {/* Item Name */}
        <h3 className="font-heading text-lg md:text-xl font-semibold text-neutral-900 mt-2">
          {item.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-neutral-600 mt-2 line-clamp-2 flex-1">
          {item.description}
        </p>

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <span className="text-2xl font-bold text-neutral-900">
            ₹{item.price.replace(' rs', '')}
          </span>
        </div>
      </div>
    </div>
  );
}
