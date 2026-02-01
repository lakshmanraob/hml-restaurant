import React from 'react';
import { Button } from '@/components/ui/Button';
import { PexelsImage } from '@/components/ui/PexelsImage';
import { type Event } from '@/lib/eventsData';

export interface EventCardProps {
  event: Event;
  onReserve?: () => void;
}

export function EventCard({ event, onReserve }: EventCardProps) {
  // Event type colors
  const typeColors: Record<Event['type'], string> = {
    music: 'from-purple-400 to-pink-500',
    festival: 'from-orange-400 to-red-500',
    cultural: 'from-teal-400 to-green-500',
  };

  const gradientClass = typeColors[event.type];

  // Type badges
  const typeBadges: Record<Event['type'], string> = {
    music: '🎵 Live Music',
    festival: '🪔 Festival',
    cultural: '🎭 Cultural Event',
  };

  return (
    <div className="card overflow-hidden group h-full flex flex-col">
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <PexelsImage
          imagePath={`events.${event.id}`}
          alt={event.title}
          fallbackGradient={gradientClass}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
        {event.recurring && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-neutral-900">
            Recurring
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Event Type */}
        <span className="inline-block text-xs font-semibold text-primary-600 uppercase tracking-wide">
          {typeBadges[event.type]}
        </span>

        {/* Event Title */}
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-neutral-900 mt-2">
          {event.title}
        </h3>

        {/* Date and Time */}
        <div className="flex flex-col gap-1 mt-3 text-sm text-neutral-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold">📅</span>
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold">🕐</span>
            <span>{event.time}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-neutral-600 mt-4 line-clamp-3 flex-1">
          {event.description}
        </p>

        {/* CTA */}
        {onReserve && (
          <div className="mt-6">
            <Button onClick={onReserve} variant="secondary" size="medium" className="w-full">
              Reserve for Event
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
