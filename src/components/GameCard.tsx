import { Card } from './Card';
import { Badge } from './Badge';
import { Users, Newspaper, MessageCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface GameCardProps {
  title: string;
  image: string;
  rating?: number;
  pressRating?: number;
  communityRating?: number;
  players: string;
  genre: string;
  featured?: boolean;
}

export function GameCard({ title, image, rating, pressRating, communityRating, players, genre, featured }: GameCardProps) {
  const finalPressRating = pressRating ?? rating ?? 0;
  const finalCommunityRating = communityRating ?? rating ?? 0;

  return (
    <Card
      className={cn(
        'p-0 overflow-hidden cursor-pointer group hover:scale-105 hover:shadow-[0_0_30px_var(--primary-glow)]',
        featured && 'ring-2 ring-primary'
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        {featured && (
          <Badge variant="secondary" className="absolute top-3 right-3">
            Destacado
          </Badge>
        )}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <div className="flex items-center gap-3 text-xs flex-wrap">
            <div className="flex items-center gap-1 text-primary" title="Nota de Prensa">
              <Newspaper className="w-3.5 h-3.5" />
              <span>{finalPressRating}</span>
            </div>
            <div className="flex items-center gap-1 text-secondary" title="Nota de Comunidad">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{finalCommunityRating}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-300">
              <Users className="w-3.5 h-3.5" />
              <span>{players}</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {genre}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
}
