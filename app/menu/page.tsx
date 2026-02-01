'use client';

import React, { useEffect, useState } from 'react';
import { Container } from '@/components/layout/Container';
import { MenuBook } from '@/components/features/MenuBook';
import { CategoryFilter } from '@/components/features/CategoryFilter';
import { Input } from '@/components/ui/Input';
import { getAllMenuItems, getCategories } from '@/lib/menuClient';
import type { MenuItem } from '@/lib/menuData';

export default function MenuPage() {
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadMenu() {
      try {
        const [items, cats] = await Promise.all([
          getAllMenuItems(),
          getCategories(),
        ]);
        setAllItems(items);
        setFilteredItems(items);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading menu:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadMenu();
  }, []);

  useEffect(() => {
    let items = allItems;

    // Filter by category
    if (activeCategory) {
      items = items.filter(item => item.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
      );
    }

    setFilteredItems(items);
  }, [activeCategory, searchQuery, allItems]);

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-terracotta-50 py-16 md:py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
              Our Menu
            </h1>
            <p className="text-lg md:text-xl text-neutral-700">
              Explore our authentic Indian cuisine featuring over 100 delicious dishes
            </p>
          </div>
        </Container>
      </section>

      {/* Category Filter */}
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Search and Menu Items */}
      <section className="py-12 md:py-16 bg-white">
        <Container>
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-12">
            <Input
              type="search"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-base"
            />
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-neutral-600 text-center">
              {isLoading ? (
                'Loading menu...'
              ) : (
                <>
                  Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
                  {activeCategory && ` in ${activeCategory}`}
                  {searchQuery && ` matching "${searchQuery}"`}
                </>
              )}
            </p>
          </div>

          {/* Menu Book */}
          {isLoading ? (
            <div className="max-w-6xl mx-auto">
              <div className="menu-book-border menu-book-bg rounded-lg overflow-hidden shadow-lg">
                <div className="h-[600px] flex items-center justify-center">
                  <div className="text-neutral-500 animate-pulse">Loading menu...</div>
                </div>
              </div>
            </div>
          ) : filteredItems.length > 0 ? (
            <MenuBook items={filteredItems} activeCategory={activeCategory} />
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-neutral-600 mb-4">
                No items found {searchQuery && `matching "${searchQuery}"`}
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory(null);
                }}
                className="text-primary-600 hover:text-primary-700 font-semibold"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
