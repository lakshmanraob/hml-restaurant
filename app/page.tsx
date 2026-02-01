'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { HeroSection } from '@/components/features/HeroSection';
import { MenuItemCard } from '@/components/features/MenuItemCard';
import { EventCard } from '@/components/features/EventCard';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { getPopularItems } from '@/lib/menuClient';
import { getUpcomingEvents } from '@/lib/eventsData';
import type { MenuItem } from '@/lib/menuData';
import type { Event } from '@/lib/eventsData';

export default function Home() {
  const [popularItems, setPopularItems] = useState<MenuItem[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [items, upcomingEvents] = await Promise.all([
          getPopularItems(),
          getUpcomingEvents(4),
        ]);
        setPopularItems(items.slice(0, 4));
        setEvents(upcomingEvents);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Authentic Indian Flavors in Every Bite"
        subtitle="Experience the richness of Indian cuisine in a warm, family-friendly atmosphere. Join us for live music every Friday!"
        primaryCta={{
          text: "Reserve a Table",
          onClick: () => {
            const reserveBtn = document.querySelector('[data-reserve-button]') as HTMLElement;
            reserveBtn?.click();
          },
        }}
        secondaryCta={{
          text: "View Our Menu",
          href: "/menu",
        }}
      />

      {/* Popular Menu Items Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900">
              Popular Dishes
            </h2>
            <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto">
              Discover our most-loved dishes, crafted with authentic recipes and the finest ingredients
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card h-96 animate-pulse bg-neutral-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularItems.map((item, index) => (
                <MenuItemCard key={index} item={item} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/menu">
              <Button size="large" variant="primary">
                View Full Menu
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Events Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-terracotta-50 to-primary-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900">
              Upcoming Events
            </h2>
            <p className="text-lg text-neutral-600 mt-4 max-w-2xl mx-auto">
              Join us for special celebrations, live music, and cultural experiences
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card h-96 animate-pulse bg-neutral-100" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900">
              Why Choose HML Restaurant?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🍛</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                Authentic Cuisine
              </h3>
              <p className="text-neutral-600 text-sm">
                Traditional recipes passed down through generations, prepared with love and care
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-secondary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                Live Music Fridays
              </h3>
              <p className="text-neutral-600 text-sm">
                Enjoy authentic Indian music performances every Friday evening from 7-10 PM
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-terracotta-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                Family-Friendly
              </h3>
              <p className="text-neutral-600 text-sm">
                Spacious seating and welcoming atmosphere perfect for families and celebrations
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-success-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">⭐</span>
              </div>
              <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                14+ Years of Excellence
              </h3>
              <p className="text-neutral-600 text-sm">
                Serving Bangalore since 2010, we've become part of countless family traditions
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Ready to Experience Amazing Indian Food?
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Reserve your table today and join our family of happy diners
            </p>
            <Button
              size="large"
              className="bg-white text-primary-600 hover:bg-neutral-100"
              onClick={() => {
                const reserveBtn = document.querySelector('[data-reserve-button]') as HTMLElement;
                reserveBtn?.click();
              }}
            >
              Make a Reservation
            </Button>
          </div>
        </Container>
      </section>

      {/* Hidden button for triggering reservation modal */}
      <button data-reserve-button className="hidden" />
    </>
  );
}
