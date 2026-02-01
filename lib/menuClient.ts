import { type MenuItem } from './menuData';

// Get all menu items (client-side)
export async function getAllMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error('Failed to fetch menu items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading menu:', error);
    return [];
  }
}

// Get popular items (client-side)
export async function getPopularItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch('/api/menu?type=popular');
    if (!response.ok) {
      throw new Error('Failed to fetch popular items');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading popular items:', error);
    return [];
  }
}

// Get categories (client-side)
export async function getCategories(): Promise<string[]> {
  try {
    const response = await fetch('/api/menu?type=categories');
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    return await response.json();
  } catch (error) {
    console.error('Error loading categories:', error);
    return [];
  }
}

// Get badge type (client-side utility - doesn't need API)
export function getBadgeType(badge: string): 'bestseller' | 'spicy' | 'healthy' | 'classic' | 'special' | 'default' {
  const lowerBadge = badge.toLowerCase();

  if (lowerBadge.includes('best') || lowerBadge.includes('popular') || lowerBadge.includes('must')) {
    return 'bestseller';
  }
  if (lowerBadge.includes('spicy') || lowerBadge.includes('hot')) {
    return 'spicy';
  }
  if (lowerBadge.includes('healthy') || lowerBadge.includes('nutritious')) {
    return 'healthy';
  }
  if (lowerBadge.includes('classic') || lowerBadge.includes('traditional')) {
    return 'classic';
  }
  if (lowerBadge.includes('special') || lowerBadge.includes('chef')) {
    return 'special';
  }
  return 'default';
}

// Check if item is vegetarian (client-side utility - doesn't need API)
export function isVegetarian(item: MenuItem): boolean {
  const nonVegKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'egg', 'meat', 'lamb'];
  const lowerName = item.name.toLowerCase();
  const lowerDesc = item.description.toLowerCase();

  return !nonVegKeywords.some(keyword =>
    lowerName.includes(keyword) || lowerDesc.includes(keyword)
  );
}
