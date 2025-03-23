
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Clock, Calendar, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

// Mock data for venue details
const mockVenueData = {
  id: '1',
  name: 'Grand Ballroom',
  description: 'An elegant ballroom with crystal chandeliers and marble floors, perfect for weddings and galas.',
  longDescription: `
    The Grand Ballroom is our flagship venue, offering an unparalleled setting for your most important events. 
    With soaring 20-foot ceilings adorned with crystal chandeliers, hand-laid marble floors, and floor-to-ceiling 
    windows overlooking the city skyline, this space creates an atmosphere of timeless elegance.
    
    The venue can accommodate up to 300 guests for a seated dinner or 500 for a standing reception. Our in-house 
    catering team offers customizable menu options featuring locally-sourced ingredients and international cuisine.
    
    The Grand Ballroom includes a spacious pre-function area, perfect for cocktail hours, as well as a private 
    bridal suite and separate entrance for VIP guests. State-of-the-art lighting and sound systems are included, 
    with our technical staff available to assist with any special requirements.
  `,
  location: '123 Main Street, New York, NY 10001',
  capacity: 300,
  pricePerHour: 1200,
  rating: 4.8,
  reviewCount: 124,
  images: [
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1515095184717-42a0ff9c4af7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  ],
  amenities: [
    'Free WiFi',
    'Catering Services',
    'Audio/Visual Equipment',
    'Stage',
    'Dance Floor',
    'Coat Check',
    'Valet Parking',
    'Bridal Suite',
    'Wheelchair Accessible',
    'Air Conditioning',
  ],
  reviews: [
    {
      id: '1',
      author: 'Sarah Johnson',
      date: '2023-09-15',
      rating: 5,
      comment: 'Absolutely stunning venue! Our wedding was perfect thanks to the amazing staff and beautiful space.',
    },
    {
      id: '2',
      author: 'Michael Chen',
      date: '2023-08-22',
      rating: 4,
      comment: 'Great venue for our corporate event. The AV equipment was top-notch and the staff was very helpful.',
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      date: '2023-07-30',
      rating: 5,
      comment: "The Grand Ballroom exceeded all our expectations. Our guests couldn't stop talking about how beautiful it was.",
    },
  ],
};

const availableDates = [
  {
    date: new Date(2023, 10, 15),
    title: 'Morning Slot',
    status: 'available' as const
  },
  {
    date: new Date(2023, 10, 15),
    title: 'Evening Slot',
    status: 'booked' as const
  },
  {
    date: new Date(2023, 10, 16),
    title: 'Full Day',
    status: 'pending' as const
  },
  {
    date: new Date(2023, 10, 17),
    title: 'Morning Slot',
    status: 'available' as const
  },
  {
    date: new Date(2023, 10, 17),
    title: 'Evening Slot',
    status: 'available' as const
  }
];

const VenueDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [venue, setVenue] = useState(mockVenueData);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch venue data based on ID
    // For now, we'll use mock data and simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
    );
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Venue Images Carousel */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <motion.img
            key={currentImageIndex}
            src={venue.images[currentImageIndex]}
            alt={venue.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            {venue.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </section>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Venue Details */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold">{venue.name}</h1>
                  <div className="flex items-center mt-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-muted-foreground">{venue.location}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-medium">{venue.rating}</span>
                  <span className="text-muted-foreground ml-1">({venue.reviewCount} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-primary mr-2" />
                  <span>Up to {venue.capacity} guests</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary mr-2" />
                  <span>${venue.pricePerHour} per hour</span>
                </div>
              </div>
              
              <Tabs defaultValue="overview" className="mb-8">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-4">
                  <div className="prose max-w-none">
                    <p className="text-lg mb-4">{venue.description}</p>
                    <p className="whitespace-pre-line">{venue.longDescription}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="mt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {venue.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-5 w-5 text-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="mt-4">
                  <div className="space-y-6">
                    {venue.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{review.author}</h4>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span>{review.rating}/5</span>
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{review.date}</p>
                        <p>{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h3 className="text-xl font-semibold mb-4">Book this Venue</h3>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Available Dates
                  </h4>
                  
                  <div className="space-y-2">
                    {availableDates.map((slot, index) => (
                      <div 
                        key={index}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-md",
                          slot.status === 'available' ? 'bg-primary/10 cursor-pointer hover:bg-primary/20' : 
                          slot.status === 'pending' ? 'bg-yellow-500/10' : 'bg-muted/50 opacity-60'
                        )}
                      >
                        <div>
                          <div className="font-medium">{formatDate(slot.date)}</div>
                          <div className="text-sm text-muted-foreground">{slot.title}</div>
                        </div>
                        <Badge
                          variant={
                            slot.status === 'available' ? 'outline' : 
                            slot.status === 'pending' ? 'secondary' : 'destructive'
                          }
                        >
                          {slot.status === 'available' ? 'Available' : 
                           slot.status === 'pending' ? 'Pending' : 'Booked'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Base price</span>
                    <span>${venue.pricePerHour} per hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$75</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total (for 4 hours)</span>
                    <span>${venue.pricePerHour * 4 + 150 + 75}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-6">
                  <Link to="/booking" className="w-full">Book Now</Link>
                </Button>
                
                <p className="text-center text-sm text-muted-foreground mt-4">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VenueDetail;
