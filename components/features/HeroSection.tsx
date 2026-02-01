'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { PexelsImage } from '@/components/ui/PexelsImage';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    text: string;
    onClick: () => void;
  };
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: HeroSectionProps) {
  return (
    <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden min-h-[600px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <PexelsImage
            imagePath="hero"
            alt="Indian restaurant interior"
            fallbackGradient="from-terracotta-50 via-primary-50 to-secondary-50"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
            priority
            sizes="100vw"
          />
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
        </div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white mt-6 leading-relaxed drop-shadow-md">
            {subtitle}
          </p>

          {/* CTAs */}
          {(primaryCta || secondaryCta) && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              {primaryCta && (
                <Button
                  onClick={primaryCta.onClick}
                  size="large"
                  variant="primary"
                >
                  {primaryCta.text}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  onClick={() => window.location.href = secondaryCta.href}
                  size="large"
                  variant="secondary"
                >
                  {secondaryCta.text}
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
