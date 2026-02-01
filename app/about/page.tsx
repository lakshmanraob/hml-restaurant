'use client';

import React from 'react';
import { Container } from '@/components/layout/Container';
import { ChefProfile } from '@/components/features/ChefProfile';
import { PexelsImage } from '@/components/ui/PexelsImage';
import { founder, chefs, culturalInfo, restaurantValues } from '@/lib/aboutData';

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-terracotta-50 to-primary-50 py-16 md:py-20">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-neutral-900 mb-4">
              About Us
            </h1>
            <p className="text-lg md:text-xl text-neutral-700">
              Celebrating Indian culture through food since 2010
            </p>
          </div>
        </Container>
      </section>

      {/* Founder Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Founder Image */}
            <div className="order-2 md:order-1">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <PexelsImage
                  imagePath="about.founder"
                  alt={`${founder.name} - ${founder.title}`}
                  fallbackGradient="from-terracotta-400 to-primary-500"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Founder Story */}
            <div className="order-1 md:order-2">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
                Meet {founder.name}
              </h2>
              <p className="text-primary-600 font-semibold text-xl mb-6">
                {founder.title}
              </p>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-700 leading-relaxed mb-4">
                  {founder.story}
                </p>
                <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mt-8">
                  <p className="text-neutral-800 italic">
                    "{founder.vision}"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 to-terracotta-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restaurantValues.map((value, index) => (
              <div key={index} className="card p-8">
                <h3 className="font-heading text-2xl font-semibold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Our Chefs */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
              Meet Our Chefs
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              The masters behind our authentic flavors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {chefs.map((chef, index) => (
              <ChefProfile key={index} chef={chef} index={index} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cultural Heritage */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-terracotta-50 to-secondary-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-neutral-900 mb-4">
              Celebrating Indian Culinary Heritage
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              A journey through India's diverse food cultures
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {culturalInfo.map((culture, index) => (
              <div key={index} className="card overflow-hidden">
                {/* Cultural Image */}
                <div className="relative h-48 overflow-hidden">
                  <PexelsImage
                    imagePath={`about.culture-${index + 1}`}
                    alt={culture.title}
                    fallbackGradient={
                      index === 0 ? 'from-orange-400 to-red-500' :
                      index === 1 ? 'from-green-400 to-teal-500' :
                      index === 2 ? 'from-purple-400 to-pink-500' :
                      'from-yellow-400 to-orange-500'
                    }
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-2xl">
                        {index === 0 ? '🏔️' : index === 1 ? '🌴' : index === 2 ? '🍜' : '🎊'}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-neutral-900 mb-1">
                        {culture.title}
                      </h3>
                      <p className="text-sm text-primary-600 font-medium">
                        {culture.region}
                      </p>
                    </div>
                  </div>
                  <p className="text-neutral-600 leading-relaxed">
                    {culture.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <Container>
          <div className="text-center text-white max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">
              Experience Our Story
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Visit us and become part of our family tradition
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="inline-block bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3.5 rounded-lg font-semibold transition-colors"
              >
                Explore Our Menu
              </a>
              <button
                onClick={() => {
                  const reserveBtn = document.querySelector('[data-reserve-button]') as HTMLElement;
                  reserveBtn?.click();
                }}
                className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3.5 rounded-lg font-semibold transition-colors"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden button for triggering reservation modal */}
      <button data-reserve-button className="hidden" />
    </>
  );
}
