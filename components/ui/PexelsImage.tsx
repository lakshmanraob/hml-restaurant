'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export interface PexelsImageProps {
  imagePath: string; // Key in imageMap.json (e.g., "hero", "menuItems.Paneer Tikka", "about.founder")
  alt: string;
  fallbackGradient?: string; // Tailwind gradient classes (e.g., "from-orange-400 to-red-500")
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function PexelsImage({
  imagePath,
  alt,
  fallbackGradient = 'from-neutral-400 to-neutral-500',
  width,
  height,
  className = '',
  priority = false,
  sizes,
}: PexelsImageProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load image map
    async function loadImageMap() {
      try {
        const response = await fetch('/data/imageMap.json');
        if (!response.ok) {
          console.warn('Image map not found, using fallback');
          setIsLoading(false);
          return;
        }

        const imageMap = await response.json();

        // Navigate through nested object using path
        const pathParts = imagePath.split('.');
        let current = imageMap;

        for (const part of pathParts) {
          if (current && typeof current === 'object' && part in current) {
            current = current[part];
          } else {
            console.warn(`Image not found in map for path: ${imagePath}`);
            setIsLoading(false);
            return;
          }
        }

        if (typeof current === 'string') {
          setImageUrl(current);
        } else {
          console.warn(`Invalid image URL for path: ${imagePath}`);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading image map:', error);
        setIsLoading(false);
      }
    }

    loadImageMap();
  }, [imagePath]);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div
        className={`${className} bg-neutral-200 animate-pulse`}
        style={{ width, height }}
      />
    );
  }

  // If we have a valid image URL and no error, show the image
  if (imageUrl && !imageError) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
        onError={() => setImageError(true)}
      />
    );
  }

  // Fallback to gradient placeholder
  return (
    <div
      className={`bg-gradient-to-br ${fallbackGradient} flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <span className="text-white font-semibold text-sm opacity-50">
        {alt}
      </span>
    </div>
  );
}
