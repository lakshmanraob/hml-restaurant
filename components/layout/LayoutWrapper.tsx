'use client';

import React, { useState } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ReservationModal } from '@/components/features/ReservationModal';

export interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

  return (
    <>
      <Navigation onReserveClick={() => setIsReservationModalOpen(true)} />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />
    </>
  );
}
