import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';

export const Card = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg bg-card border border-border p-6',
          'transition-all duration-200',
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
