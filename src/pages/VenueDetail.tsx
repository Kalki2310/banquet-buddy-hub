import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Users, Calendar, Star, Clock, ArrowLeft, Share2, Heart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/BookingForm';
import CalendarView from '@/components/ui/CalendarView';
import { VenueProps } from '@/components/ui/VenueCard';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Mock data for venue details
const venues: VenueProps[] = [
  {
    id: '1',
    name: 'Crystal Grand Ballroom',
    description: 'The Crystal Grand Ballroom is a sophisticated venue featuring elegant chandeliers, marble floors, and floor-to-ceiling windows that allow natural light to flood the space. With its neoclassical architecture and modern amenities, it provides the perfect backdrop for weddings, galas, and other upscale events.',
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
    description: 'Perched on the waterfront with panoramic harbor views, this open-air terrace venue offers a breathtaking setting for events. The space features a covered pavilion, lush greenery, and a modern coastal aesthetic. Ideal for ceremonies at sunset or cocktail receptions under the stars.',
    location: 'Harbor District, San Francisco',
    capacity: 150,
    price: 950,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    tags: ['Outdoor', 'Scenic']
  }
];

// Additional images for gallery
const venueImages = {
  '1': [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1505236524430-514ab1eb7b23?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1515169067868-5387ec356754?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  ],
  '2': [
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
  ]
};

// Mock calendar events
const calendarEvents = [
  {
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    title: 'Corporate Retreat',
    status: 'booked',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 7)),
    title: 'Wedding',
    status: 'booked',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 10)),
    title: 'Birthday Party',
    status: 'pending',
  },
  {
    date: new Date(new Date().setDate(new Date().getDate() + 15)),
    title: 'Available',
    status: 'available',
  },
];

// Mock reviews
const reviews = [
  {
    id: 1,
    name: 'Emily Johnson',
    date: '2 months ago',
    rating: 5,
    comment: 'We had our wedding at the Crystal Grand Ballroom and it was absolutely stunning. The staff was incredibly attentive, and the venue itself was breathtaking. Our guests couldn\'t stop talking about how beautiful it was!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    date: '3 months ago',
    rating: 4,
    comment: 'Great venue with excellent acoustics. We hosted a corporate gala and everything went smoothly. The only minor issue was with parking, but the venue more than made up for it with their service.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
  {
    id: 3,
    name: 'Sarah Thompson',
    date: '1 month ago',
    rating: 5,
    comment: 'Absolutely perfect! The lighting, the atmosphere, and the service were all top-notch. We hosted a charity event here and received countless compliments on the venue choice.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80',
  },
];

// Amenities
const amenities = [
  'Catering Services',
  'Audio/Visual Equipment',
  'Wi-Fi Access',
  'Dance Floor',
  'Stage',
  'Dressing Rooms',
  'Tables and Chairs',
  'Linens',
  'Parking',
  'Wheelchair Accessible',
  'Air Conditioning',
  'Bar Services',
];

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState<VenueProps | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mainImage, setMainImage] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // Find venue by id from our mock data
    const foundVenue = venues.find(v => v.id === id);
    if (foundVenue) {
      setVenue(foundVenue);
      setMainImage(foundVenue.image);
    }
    
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const handleShare = () => {
    // In a real app, you would implement actual sharing functionality
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };
  
  if (!venue) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          {/* Back Navigation */}
          <div className="mb-6">
            <Button variant="ghost" asChild className="pl-0 text-muted-foreground">
              <Link to="/venues" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Venues
              </Link>
            </Button>
          </div>
          
          {/* Venue Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">{venue.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span className="ml-1 font-medium">{venue.rating}</span>
                    <span className="text-muted-foreground ml-1">({reviews.length} reviews)</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {venue.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={toggleFavorite}>
                  <Heart className={cn("h-5 w-5", isFavorite && "fill-red-500 text-red-500")} />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            {/* Main Gallery */}
            <div 
              className={cn(
                "grid grid-cols-1 md:grid-cols-4 gap-4",
                !isLoaded ? "opacity-0" : "opacity-100 transition-opacity duration-500"
              )}
            >
              <div className="md:col-span-3 relative rounded-lg overflow-hidden h-[400px]">
                <img 
                  src={mainImage} 
                  alt={venue.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-rows-3 gap-4 h-[400px]">
                {venueImages[venue.id as keyof typeof venueImages]?.slice(1, 4).map((img, i) => (
                  <div 
                    key={i} 
                    className="rounded-lg overflow-hidden cursor-pointer relative"
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${venue.name} ${i+1}`} 
                      className="w-full h-full object-cover"
                    />
                    {i === 2 && venueImages[venue.id as keyof typeof venueImages].length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-medium">
                          +{venueImages[venue.id as keyof typeof venueImages].length - 3} more
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Venue Details & Booking */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Venue Info - 2/3 width */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="details" className="space-y-8">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                {/* Details Tab */}
                <TabsContent value="details" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">About this venue</h2>
                    <p className="text-muted-foreground">
                      {venue.description}
                    </p>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Users className="h-4 w-4 mr-2" />
                          Capacity
                        </div>
                        <p className="font-medium">{venue.capacity} guests</p>
                      </div>
                      
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Clock className="h-4 w-4 mr-2" />
                          Min. Hours
                        </div>
                        <p className="font-medium">4 hours</p>
                      </div>
                      
                      <div className="bg-secondary/40 rounded-lg p-4">
                        <div className="flex items-center text-sm text-muted-foreground mb-1">
                          <Calendar className="h-4 w-4 mr-2" />
                          Availability
                        </div>
                        <p className="font-medium">Year-round</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Photo Gallery */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Photo Gallery</h2>
                    <Carousel className="mx-auto">
                      <CarouselContent>
                        {venueImages[venue.id as keyof typeof venueImages]?.map((image, index) => (
                          <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                              <div className="rounded-lg overflow-hidden h-[200px]">
                                <img 
                                  src={image} 
                                  alt={`${venue.name} ${index}`} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <div className="flex justify-center gap-2 mt-4">
                        <CarouselPrevious className="relative inline-flex static" />
                        <CarouselNext className="relative inline-flex static" />
                      </div>
                    </Carousel>
                  </div>
                  
                  {/* Maps Section would go here */}
                  <Separator />
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Location</h2>
                    <div className="aspect-video bg-secondary rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map would be displayed here</p>
                    </div>
                    <p className="text-muted-foreground">
                      {venue.location}
                    </p>
                  </div>
                </TabsContent>
                
                {/* Availability Tab */}
                <TabsContent value="availability" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Availability Calendar</h2>
                    <p className="text-muted-foreground">
                      Check the calendar below to see available dates for booking {venue.name}.
                    </p>
                    
                    <CalendarView 
                      events={calendarEvents}
                      onDateSelect={(date) => {
                        const isBooked = calendarEvents.some(event => 
                          event.date.getDate() === date.getDate() && 
                          event.date.getMonth() === date.getMonth() &&
                          event.date.getFullYear() === date.getFullYear() &&
                          event.status === 'booked'
                        );
                        
                        if (isBooked) {
                          toast.info(`${date.toLocaleDateString()} is already booked`);
                        } else {
                          toast.success(`${date.toLocaleDateString()} is available for booking`);
                        }
                      }}
                    />
                    
                    <div className="flex items-center gap-6 mt-4">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                        <span className="text-sm">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <span className="text-sm">Booked</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <span className="text-sm">Pending</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Amenities Tab */}
                <TabsContent value="amenities" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Venue Amenities</h2>
                    <p className="text-muted-foreground">
                      {venue.name} offers the following amenities and services:
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                      {amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h2 className="text-2xl font-semibold">Additional Services</h2>
                    <p className="text-muted-foreground">
                      The following services can be arranged upon request for an additional fee:
                    </p>
                    
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      <li>Professional event planning assistance</li>
                      <li>Custom lighting packages</li>
                      <li>Photography and videography</li>
                      <li>Live entertainment booking</li>
                      <li>Custom decoration packages</li>
                      <li>Valet parking services</li>
                    </ul>
                  </div>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-semibold">Guest Reviews</h2>
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                        <span className="ml-2 font-medium">{venue.rating}</span>
                        <span className="text-muted-foreground ml-1">({reviews.length} reviews)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-6 mt-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="pb-6 border-b border-border">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full overflow-hidden">
                              <img 
                                src={review.avatar} 
                                alt={review.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-1">
                                <span className="font-medium">{review.name}</span>
                                <span className="text-sm text-muted-foreground">{review.date}</span>
                              </div>
                              
                              <div className="flex mb-2">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={cn(
                                      "h-4 w-4", 
                                      i < review.rating 
                                        ? "text-amber-500 fill-amber-500" 
                                        : "text-muted-foreground"
                                    )} 
                                  />
                                ))}
                              </div>
                              
                              <p className="text-muted-foreground">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Form - 1/3 width */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <BookingForm
                  venueId={venue.id}
                  venueName={venue.name}
                  onSubmit={(data) => {
                    console.log('Booking submitted:', data);
                    toast.success('Booking request submitted successfully!');
                    // In a real app, you would handle sending this data to your backend
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default VenueDetail;
