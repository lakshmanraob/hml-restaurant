'use client';

import React, { useState, useEffect } from 'react';
import { MenuBookPage } from './MenuBookPage';
import { MenuBookNav } from './MenuBookNav';
import type { MenuItem } from '@/lib/menuData';

export interface MenuBookProps {
  items: MenuItem[];
  activeCategory: string | null;
}

export function MenuBook({ items, activeCategory }: MenuBookProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when items change (filters applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [items, activeCategory]);

  // Items per page: 6 on desktop (3 per side), 3 on mobile (single column)
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Get items for current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // Split items for left and right pages (desktop)
  const leftPageItems = currentItems.slice(0, 3);
  const rightPageItems = currentItems.slice(3, 6);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of menu book
      const menuBook = document.getElementById('menu-book');
      if (menuBook) {
        menuBook.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <div id="menu-book" className="max-w-6xl mx-auto">
      {/* Menu Book Container */}
      <div className="menu-book-border menu-book-bg rounded-lg overflow-hidden shadow-lg">
        {/* Two-column layout (desktop) / Single-column (mobile) */}
        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Left Page (hidden on mobile, shown as single column) */}
          <div className="flex-1 md:flex">
            <MenuBookPage items={leftPageItems} side="left" />
          </div>

          {/* Spine (desktop only) */}
          <div className="hidden md:block menu-book-spine" />

          {/* Right Page (desktop) / Continuation (mobile) */}
          <div className="flex-1 hidden md:flex">
            <MenuBookPage items={rightPageItems} side="right" />
          </div>
        </div>

        {/* Page Navigation */}
        <MenuBookNav
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Keyboard hints */}
      <div className="mt-4 text-center text-sm text-neutral-500">
        <span className="hidden md:inline">Use arrow keys ← → to navigate pages</span>
      </div>
    </div>
  );
}
