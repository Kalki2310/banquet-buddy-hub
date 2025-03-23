
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';

export interface VenueProps {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  price: number;
  rating: number;
  image: string;
  tags?: string[];
}

interface VenueCardProps {
  venue: VenueProps;
  className?: string;
  featured?: boolean;
}

const VenueCard = ({ venue, className, featured = false }: VenueCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { id, name, description, location, capacity, price, rating, image, tags } = venue;
  
  return (
    <AnimatedCard 
      className={cn(
        "bg-card rounded-lg overflow-hidden",
        featured ? 'shadow-md' : 'border border-border shadow-sm',
        className
      )}
    >
      <div className="relative w-full h-48 overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-secondary/40 transition-opacity duration-500",
          imageLoaded ? "opacity-0" : "opacity-100"
        )} />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />
        {tags && tags.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="default" className="bg-primary/80 backdrop-blur-sm">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge variant="outline" className="bg-white/80 backdrop-blur-sm text-primary">
            ${price}/hr
          </Badge>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 text-amber-500">
            <span>★</span>
            <span className="text-sm font-medium text-foreground">{rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{location}</span>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 min-h-[40px]">
          {description}
        </p>
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users size={14} className="mr-1" />
            <span>Up to {capacity}</span>
          </div>
          
          <Button variant="default" size="sm" asChild>
            <Link to={`/venues/${id}`}>
              View Details
            </Link>
          </Button>
        </div>
      </div>
    </AnimatedCard>
  );
};

export default VenueCard;
