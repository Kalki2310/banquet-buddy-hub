import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Users, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  imageUrl: string;
  description: string;
  pricePerDay: number;
  rating: number;
  reviews: number;
  amenities: string[];
  featured: boolean;
}

interface VenueCardProps {
  venue: Venue;
  featured?: boolean;
  className?: string;
}

const VenueCard = ({ venue, featured, className }: VenueCardProps) => (
  <Card className={cn("overflow-hidden rounded-lg shadow-md transition-transform hover:scale-105", className)}>
    <Link to={`/venues/${venue.id}`}>
      <div className="relative">
        <img
          src={venue.imageUrl}
          alt={venue.name}
          className="aspect-video w-full object-cover"
        />
        {featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">{venue.name}</h3>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <span>{venue.location}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{venue.description}</p>
        <div className="mt-3 flex justify-between items-center">
          <div>
            <span className="text-base font-medium">${venue.pricePerDay}</span>
            <span className="text-sm text-muted-foreground"> / day</span>
          </div>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <span>{venue.rating}</span>
            <span>({venue.reviews})</span>
          </div>
        </div>
      </CardContent>
    </Link>
  </Card>
);

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredVenues, setFeaturedVenues] = useState<Venue[]>([]);
  const [topRatedVenues, setTopRatedVenues] = useState<Venue[]>([]);

  useEffect(() => {
    // Mock venue data
    const venues: Venue[] = [
      {
        id: '1',
        name: 'Grand Ballroom',
        location: 'New York, NY',
        capacity: 500,
        imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Elegant ballroom with stunning city views.',
        pricePerDay: 5000,
        rating: 4.5,
        reviews: 120,
        amenities: ['WiFi', 'Projector', 'Sound System'],
        featured: true,
      },
      {
        id: '2',
        name: 'Oceanfront Terrace',
        location: 'Miami, FL',
        capacity: 300,
        imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Beautiful terrace overlooking the ocean.',
        pricePerDay: 4000,
        rating: 4.8,
        reviews: 150,
        amenities: ['Outdoor Seating', 'Bar', 'Dance Floor'],
        featured: true,
      },
      {
        id: '3',
        name: 'Rustic Barn',
        location: 'Austin, TX',
        capacity: 200,
        imageUrl: 'https://images.unsplash.com/photo-1541463742-25915993ca91?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Charming barn with a rustic atmosphere.',
        pricePerDay: 3000,
        rating: 4.2,
        reviews: 90,
        amenities: ['Fireplace', 'Catering Kitchen', 'Parking'],
        featured: false,
      },
      {
        id: '4',
        name: 'Rooftop Garden',
        location: 'Los Angeles, CA',
        capacity: 150,
        imageUrl: 'https://images.unsplash.com/photo-1623744755489-941104b6fa9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Lush garden with panoramic city views.',
        pricePerDay: 4500,
        rating: 4.9,
        reviews: 180,
        amenities: ['Green Space', 'City Views', 'Cocktail Service'],
        featured: false,
      },
      {
        id: '5',
        name: 'Historic Mansion',
        location: 'Boston, MA',
        capacity: 250,
        imageUrl: 'https://images.unsplash.com/photo-1605296867304-46dcd2540585?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Elegant mansion with historic charm.',
        pricePerDay: 3800,
        rating: 4.6,
        reviews: 110,
        amenities: ['Valet Parking', 'Grand Staircase', 'Library'],
        featured: false,
      },
      {
        id: '6',
        name: 'Modern Loft',
        location: 'Chicago, IL',
        capacity: 100,
        imageUrl: 'https://images.unsplash.com/photo-1543083066-ca623ca8c874?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHZlbnVlfGVufDB8fDB8fHww',
        description: 'Stylish loft with a contemporary design.',
        pricePerDay: 3200,
        rating: 4.7,
        reviews: 130,
        amenities: ['Exposed Brick', 'Natural Light', 'Sound System'],
        featured: false,
      },
    ];

    // Filter featured and top-rated venues
    setFeaturedVenues(venues.filter((venue) => venue.featured));
    setTopRatedVenues(venues.sort((a, b) => b.rating - a.rating).slice(0, 3));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Find the Perfect Venue for Your Event
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Discover a curated selection of venues for weddings, corporate events, and more.
              </p>
              <div className="max-w-md mx-auto">
                <Input
                  type="text"
                  placeholder="Search for venues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="shadow-sm"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Venues Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Venues</h2>
              <p className="text-muted-foreground">
                Handpicked venues known for their exceptional service and unique ambiance.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVenues.map((venue, index) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  featured={venue.featured}
                  className="h-full"
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/venues">Explore All Venues</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Top-Rated Venues Section */}
        <section className="bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">Top-Rated Venues</h2>
              <p className="text-muted-foreground">
                Discover venues with the highest ratings and rave reviews from our users.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {topRatedVenues.map((venue, index) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  className="h-full"
                />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h2 className="text-3xl font-bold tracking-tight mb-2">Our Services</h2>
              <p className="text-muted-foreground">
                We offer a range of services to make your event planning process seamless.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Venue Selection',
                  description: 'We help you find the perfect venue that meets your specific needs and preferences.',
                  icon: <MapPin className="h-6 w-6 text-primary" />,
                },
                {
                  title: 'Event Planning',
                  description: 'Our experienced event planners assist you in every step of the planning process.',
                  icon: <CalendarDays className="h-6 w-6 text-primary" />,
                },
                {
                  title: 'Guest Management',
                  description: 'We manage your guest list, RSVPs, and seating arrangements.',
                  icon: <Users className="h-6 w-6 text-primary" />,
                },
                {
                  title: 'On-Site Support',
                  description: 'Our team provides on-site support to ensure your event runs smoothly.',
                  icon: <CheckCircle className="h-6 w-6 text-primary" />,
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-card rounded-lg border border-border shadow-sm text-center"
                >
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
