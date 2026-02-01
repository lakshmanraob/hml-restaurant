import { NextResponse } from 'next/server';
import { getAllMenuItems, getCategories, getPopularItems } from '@/lib/menuData';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  try {
    if (type === 'popular') {
      const items = await getPopularItems();
      return NextResponse.json(items);
    } else if (type === 'categories') {
      const categories = await getCategories();
      return NextResponse.json(categories);
    } else {
      const items = await getAllMenuItems();
      return NextResponse.json(items);
    }
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
}
