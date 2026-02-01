import React from 'react';
import { PexelsImage } from '@/components/ui/PexelsImage';
import { type Chef } from '@/lib/aboutData';

export interface ChefProfileProps {
  chef: Chef;
  index?: number; // For mapping to correct image (chef-1, chef-2, chef-3)
}

export function ChefProfile({ chef, index = 0 }: ChefProfileProps) {
  // Different gradient for each chef (based on name hash for consistency)
  const gradients = [
    'from-terracotta-400 to-orange-500',
    'from-primary-400 to-yellow-500',
    'from-secondary-400 to-red-500',
  ];

  const gradientIndex = chef.name.length % gradients.length;
  const gradientClass = gradients[gradientIndex];

  return (
    <div className="card overflow-hidden group h-full">
      {/* Chef Image */}
      <div className="relative h-64 overflow-hidden">
        <PexelsImage
          imagePath={`about.chef-${index + 1}`}
          alt={`${chef.name} - ${chef.specialty}`}
          fallbackGradient={gradientClass}
          width={600}
          height={600}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Chef Name */}
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-neutral-900">
          {chef.name}
        </h3>

        {/* Specialty */}
        <p className="text-primary-600 font-semibold mt-1">
          {chef.specialty}
        </p>

        {/* Experience */}
        <p className="text-sm text-neutral-600 mt-2">
          <span className="font-semibold">Experience:</span> {chef.experience}
        </p>

        {/* Description */}
        <p className="text-sm text-neutral-600 mt-4 leading-relaxed">
          {chef.description}
        </p>
      </div>
    </div>
  );
}
