import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '../lib/utils';
import { User } from 'lucide-react';

interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, size = 'md', ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-full overflow-hidden bg-muted flex items-center justify-center border-2 border-primary/30',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
        ) : (
          <User className="w-1/2 h-1/2 text-muted-foreground" />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
