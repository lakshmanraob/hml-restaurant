'use client';

import React, { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

export interface MenuBookNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function MenuBookNav({ currentPage, totalPages, onPageChange }: MenuBookNavProps) {
  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft' && currentPage > 1) {
        onPageChange(currentPage - 1);
      } else if (e.key === 'ArrowRight' && currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, onPageChange]);

  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-6 bg-neutral-50 border-t-2 border-neutral-300">
      {/* Previous Button */}
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
        className="min-w-[100px]"
      >
        ← Previous
      </Button>

      {/* Page Indicator */}
      <div className="text-center">
        <span className="text-sm text-neutral-600">
          Page <strong className="text-neutral-900">{currentPage}</strong> of{' '}
          <strong className="text-neutral-900">{totalPages}</strong>
        </span>

        {/* Quick page jumps */}
        <div className="flex gap-1 mt-2 justify-center">
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum: number;

            if (totalPages <= 5) {
              // Show all pages if 5 or fewer
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              // Show first 5 pages
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              // Show last 5 pages
              pageNum = totalPages - 4 + i;
            } else {
              // Show current page and 2 on each side
              pageNum = currentPage - 2 + i;
            }

            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-500 text-white'
                    : 'bg-white text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Button */}
      <Button
        variant="secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        className="min-w-[100px]"
      >
        Next →
      </Button>
    </div>
  );
}
