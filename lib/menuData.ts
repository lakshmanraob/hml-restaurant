import { promises as fs } from 'fs';
import path from 'path';

export interface MenuItem {
  category: string;
  name: string;
  description: string;
  price: string;
  badge: string;
}

// Parse CSV content
function parseCSV(csvContent: string): MenuItem[] {
  const lines = csvContent.trim().split('\n');
  const items: MenuItem[] = [];

  // Skip header row
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Simple CSV parsing (handles basic cases)
    const matches = line.match(/([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)/);

    if (matches) {
      items.push({
        category: matches[1].trim(),
        name: matches[2].trim(),
        description: matches[3].trim(),
        price: matches[4].trim(),
        badge: matches[5].trim(),
      });
    }
  }

  return items;
}

// Get all menu items
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const filePath = path.join(process.cwd(), 'docs', 'menu_items.csv');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  return parseCSV(fileContent);
}

// Get items by category
export async function getItemsByCategory(category: string): Promise<MenuItem[]> {
  const allItems = await getAllMenuItems();
  return allItems.filter(item => item.category === category);
}

// Get all categories
export async function getCategories(): Promise<string[]> {
  const allItems = await getAllMenuItems();
  const categories = Array.from(new Set(allItems.map(item => item.category)));
  return categories;
}

// Get popular items (items with specific badges)
export async function getPopularItems(): Promise<MenuItem[]> {
  const allItems = await getAllMenuItems();
  const popularBadges = ['Best Seller', 'Popular', 'Must Try', 'Legendary'];

  return allItems.filter(item =>
    popularBadges.includes(item.badge)
  );
}

// Search menu items
export async function searchMenuItems(query: string): Promise<MenuItem[]> {
  const allItems = await getAllMenuItems();
  const lowerQuery = query.toLowerCase();

  return allItems.filter(item =>
    item.name.toLowerCase().includes(lowerQuery) ||
    item.description.toLowerCase().includes(lowerQuery) ||
    item.category.toLowerCase().includes(lowerQuery)
  );
}

// Get badge type for styling
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

// Check if item is vegetarian (simple heuristic)
export function isVegetarian(item: MenuItem): boolean {
  const nonVegKeywords = ['chicken', 'mutton', 'fish', 'prawn', 'egg', 'meat', 'lamb'];
  const lowerName = item.name.toLowerCase();
  const lowerDesc = item.description.toLowerCase();

  return !nonVegKeywords.some(keyword =>
    lowerName.includes(keyword) || lowerDesc.includes(keyword)
  );
}
