import { useState, useEffect } from 'react';
import { MapPin, Users, DollarSign, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Slider
} from '@/components/ui/slider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import VenueCard, { VenueProps } from '@/components/ui/VenueCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const venues: VenueProps[] = [
  {
    id: '1',
    name: 'Crystal Grand Ballroom',
    description: 'Elegant ballroom with crystal chandeliers and marble floors, perfect for weddings and galas.',
    location: 'Downtown, New York',
    capacity: 300,
    price: 1200,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Wedding', 'Luxury']
  },
  {
    id: '2',
    name: 'Harbor View Terrace',
    description: 'Stunning waterfront venue with panoramic views of the harbor, ideal for outdoor celebrations.',
    location: 'Harbor District, San Francisco',
    capacity: 150,
    price: 950,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Outdoor', 'Scenic']
  },
  {
    id: '3',
    name: 'Metropolitan Conference Center',
    description: 'Modern conference center with state-of-the-art technology and flexible spaces for corporate events.',
    location: 'Midtown, Chicago',
    capacity: 400,
    price: 1500,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Corporate', 'Modern']
  },
  {
    id: '4',
    name: 'Garden Pavilion',
    description: 'Charming garden pavilion surrounded by lush greenery and blooming flowers.',
    location: 'Botanical Gardens, Miami',
    capacity: 120,
    price: 800,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1439539698758-ba2680ecadb9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Garden', 'Intimate']
  },
  {
    id: '5',
    name: 'Mountain View Resort',
    description: 'Breathtaking mountainside resort with spectacular views and luxury accommodations.',
    location: 'Aspen, Colorado',
    capacity: 200,
    price: 1800,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Luxury', 'Scenic']
  },
  {
    id: '6',
    name: 'Urban Workshop Space',
    description: 'Industrial-chic venue with open floor plan and exposed brick, perfect for creative events.',
    location: 'Arts District, Seattle',
    capacity: 80,
    price: 650,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Modern', 'Creative']
  },
  {
    id: '7',
    name: 'Beachfront Paradise',
    description: 'Gorgeous beachfront venue with white sand and azure waters as your backdrop.',
    location: 'Malibu, California',
    capacity: 150,
    price: 1450,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Beach', 'Outdoor']
  },
  {
    id: '8',
    name: 'Historic Opera House',
    description: 'Magnificent 19th century opera house with ornate details and rich history.',
    location: 'French Quarter, New Orleans',
    capacity: 350,
    price: 1350,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Historic', 'Elegant']
  },
];

const venueTypes = [
  'Ballroom', 'Outdoor', 'Conference Center', 'Garden', 'Beachfront', 
  'Historic', 'Mountain', 'Urban', 'Rooftop', 'Winery'
];

const eventTypes = [
  'Wedding', 'Corporate', 'Birthday', 'Anniversary', 'Gala', 
  'Conference', 'Graduation', 'Social Gathering', 'Fundraiser'
];

const Venues = () => {
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<number[]>([500, 2000]);
  const [capacityRange, setCapacityRange] = useState<number[]>([50, 350]);
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<VenueProps[]>(venues);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const locations = [...new Set(venues.map(venue => {
    const parts = venue.location.split(', ');
    return parts[parts.length - 1];
  }))];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const filtered = venues.filter(venue => {
      const searchMatch = 
        searchTerm === '' ||
        venue.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        venue.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const priceMatch = venue.price >= priceRange[0] && venue.price <= priceRange[1];
      
      const capacityMatch = venue.capacity >= capacityRange[0] && venue.capacity <= capacityRange[1];
      
      const venueTypeMatch = 
        selectedVenueTypes.length === 0 ||
        (venue.tags && venue.tags.some(tag => selectedVenueTypes.includes(tag)));
      
      const eventTypeMatch = 
        selectedEventTypes.length === 0 ||
        (venue.tags && venue.tags.some(tag => selectedEventTypes.includes(tag)));
      
      const locationMatch =
        selectedLocations.length === 0 ||
        selectedLocations.some(loc => venue.location.includes(loc));
      
      return searchMatch && priceMatch && capacityMatch && venueTypeMatch && eventTypeMatch && locationMatch;
    });
    
    setFilteredVenues(filtered);
  }, [searchTerm, priceRange, capacityRange, selectedVenueTypes, selectedEventTypes, selectedLocations]);
  
  const toggleVenueType = (type: string) => {
    setSelectedVenueTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const toggleEventType = (type: string) => {
    setSelectedEventTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const toggleLocation = (location: string) => {
    setSelectedLocations(prev => 
      prev.includes(location) 
        ? prev.filter(l => l !== location) 
        : [...prev, location]
    );
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([500, 2000]);
    setCapacityRange([50, 350]);
    setSelectedVenueTypes([]);
    setSelectedEventTypes([]);
    setSelectedLocations([]);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 space-y-4">
            <h1 className="text-3xl font-bold">Find Your Perfect Venue</h1>
            <p className="text-muted-foreground max-w-3xl">
              Browse our collection of stunning venues for weddings, corporate events, parties, and more.
              Use the filters to find the perfect match for your event needs.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search venues by name, location, or description..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              
              {isMobile ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="w-[80vw] sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>Filter Venues</SheetTitle>
                      <SheetDescription>
                        Adjust filters to find your perfect venue
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-6">
                      {renderFilters()}
                    </div>
                  </SheetContent>
                </Sheet>
              ) : (
                <Button variant="outline" className="flex items-center gap-2" onClick={clearFilters}>
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {!isMobile && (
              <div className="lg:w-72 space-y-6 sticky top-24 self-start">
                <div className="bg-card shadow-sm rounded-lg border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium">Filters</h3>
                    <Button variant="ghost" className="h-auto p-0 text-sm text-primary" onClick={clearFilters}>
                      Clear all
                    </Button>
                  </div>
                  
                  {renderFilters()}
                </div>
              </div>
            )}
            
            <div className="flex-1">
              {(selectedVenueTypes.length > 0 || selectedEventTypes.length > 0 || selectedLocations.length > 0) && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {selectedVenueTypes.map(type => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <button onClick={() => toggleVenueType(type)} className="ml-1 hover:text-primary">
                        ✕
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedEventTypes.map(type => (
                    <Badge key={type} variant="secondary" className="flex items-center gap-1">
                      {type}
                      <button onClick={() => toggleEventType(type)} className="ml-1 hover:text-primary">
                        ✕
                      </button>
                    </Badge>
                  ))}
                  
                  {selectedLocations.map(location => (
                    <Badge key={location} variant="secondary" className="flex items-center gap-1">
                      {location}
                      <button onClick={() => toggleLocation(location)} className="ml-1 hover:text-primary">
                        ✕
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredVenues.length} of {venues.length} venues
                </p>
              </div>
              
              {filteredVenues.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVenues.map((venue, index) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      className="h-full"
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-card rounded-lg border border-border p-12 text-center">
                  <h3 className="text-lg font-medium mb-2">No venues found</h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your filters or search terms
                  </p>
                  <Button onClick={clearFilters}>Clear all filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
  
  function renderFilters() {
    return (
      <>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="price-range" className="font-medium">Price Range</Label>
            <span className="text-sm text-muted-foreground">
              ${priceRange[0]} - ${priceRange[1]}
            </span>
          </div>
          <Slider
            id="price-range"
            min={500}
            max={2000}
            step={50}
            value={priceRange}
            onValueChange={setPriceRange}
            className="my-6"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="capacity-range" className="font-medium">Capacity</Label>
            <span className="text-sm text-muted-foreground">
              {capacityRange[0]} - {capacityRange[1]} guests
            </span>
          </div>
          <Slider
            id="capacity-range"
            min={50}
            max={400}
            step={10}
            value={capacityRange}
            onValueChange={setCapacityRange}
            className="my-6"
          />
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Venue Type</h4>
          <div className="grid grid-cols-2 gap-3">
            {venueTypes.slice(0, 6).map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={`venue-${type}`} 
                  checked={selectedVenueTypes.includes(type)}
                  onCheckedChange={() => toggleVenueType(type)}
                />
                <Label 
                  htmlFor={`venue-${type}`}
                  className="text-sm cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Event Type</h4>
          <div className="grid grid-cols-2 gap-3">
            {eventTypes.slice(0, 6).map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={`event-${type}`}
                  checked={selectedEventTypes.includes(type)}
                  onCheckedChange={() => toggleEventType(type)}
                />
                <Label 
                  htmlFor={`event-${type}`}
                  className="text-sm cursor-pointer"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <h4 className="font-medium">Location</h4>
          <div className="grid grid-cols-1 gap-2">
            {locations.map(location => (
              <div key={location} className="flex items-center space-x-2">
                <Checkbox 
                  id={`location-${location}`}
                  checked={selectedLocations.includes(location)}
                  onCheckedChange={() => toggleLocation(location)}
                />
                <Label 
                  htmlFor={`location-${location}`}
                  className="text-sm cursor-pointer"
                >
                  {location}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
};

export default Venues;
