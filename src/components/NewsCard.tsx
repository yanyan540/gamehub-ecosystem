import { Card } from './Card';
import { Badge } from './Badge';
import { Clock, Eye } from 'lucide-react';

interface NewsCardProps {
  title: string;
  image: string;
  excerpt: string;
  category: string;
  date: string;
  views: string;
  id: string;
}

export function NewsCard({ title, image, excerpt, category, date, views }: NewsCardProps) {
  return (
    <Card className="p-0 overflow-hidden cursor-pointer group hover:scale-105 hover:shadow-[0_0_30px_var(--primary-glow)] transition-all">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge variant="primary" className="absolute top-3 left-3">
          {category}
        </Badge>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{excerpt}</p>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{views}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
