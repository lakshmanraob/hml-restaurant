import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  type?: 'bestseller' | 'spicy' | 'healthy' | 'classic' | 'special' | 'default';
  className?: string;
}

export function Badge({ children, type = 'default', className = '' }: BadgeProps) {
  const typeClasses = {
    bestseller: 'bg-primary-50 text-primary-700 border-primary-200',
    spicy: 'bg-error-50 text-error-700 border-error-200',
    healthy: 'bg-success-50 text-success-700 border-success-200',
    classic: 'bg-neutral-100 text-neutral-700 border-neutral-300',
    special: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    default: 'bg-neutral-100 text-neutral-600 border-neutral-200',
  };

  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide border ${typeClasses[type]} ${className}`}
    >
      {children}
    </span>
  );
}
