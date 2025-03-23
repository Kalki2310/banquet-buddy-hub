import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Users, MapPin, Search, CreditCard, ChevronRight } from 'lucide-react';
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
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import AnimatedCard from '@/components/ui/AnimatedCard';
import VenueCard, { VenueProps } from '@/components/ui/VenueCard';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useIsMobile } from '@/hooks/use-mobile';

const featuredVenues: VenueProps[] = [
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
];

const testimonials = [
  {
    id: 1,
    name: 'Sarah Thompson',
    role: 'Bride',
    content: 'Our wedding at Crystal Grand Ballroom was an absolute dream come true. The staff was attentive to every detail, and our guests are still talking about how beautiful the venue was!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Corporate Event Planner',
    content: 'As a corporate event planner, I\'ve worked with many venues, but BanquetHub consistently exceeds my expectations. Their spaces are versatile, and their team is incredibly professional.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  },
  {
    id: 3,
    name: 'Jennifer Lee',
    role: 'Birthday Celebration',
    content: 'Hosted my 40th birthday at Garden Pavilion and it was perfect! The outdoor setting created a magical atmosphere, and the staff handled everything so I could enjoy my special day.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80'
  }
];

const features = [
  {
    icon: <Calendar className="h-6 w-6 text-primary" />,
    title: 'Easy Booking',
    description: 'Seamlessly book your perfect venue with our intuitive calendar system.'
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'Event Planning',
    description: 'Connect with experienced event planners who will bring your vision to life.'
  },
  {
    icon: <CreditCard className="h-6 w-6 text-primary" />,
    title: 'Secure Payments',
    description: 'Enjoy peace of mind with our secure and transparent payment system.'
  }
];

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div 
        ref={heroRef}
        className="relative pt-20 min-h-[90vh] flex items-center bg-gradient-to-b from-background via-background to-secondary/20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1 space-y-6 text-center md:text-left"
            >
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Find Your Perfect
                <span className="block text-primary bg-clip-text">Banquet Venue</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Discover and book stunning venues for weddings, corporate events, and special occasions with ease.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Button size="lg" onClick={scrollToSearch}>
                  Find Venues
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/venues">Browse All</Link>
                </Button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="flex-1 relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1513278974582-3e1b4a4fa5e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80" 
                  alt="Elegant banquet hall with tables set for an event" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              
              <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-40 h-40 md:w-48 md:h-48 rounded-lg overflow-hidden shadow-xl transform rotate-6 z-10">
                <img 
                  src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Close-up of elegantly set banquet table" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden shadow-xl transform -rotate-6 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Wedding decoration detail" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div 
          className="absolute bottom-0 left-0 right-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path 
              fill="currentColor" 
              fillOpacity="0.05" 
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,117.3C672,85,768,43,864,48C960,53,1056,107,1152,128C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </motion.div>
      </div>
      
      <section id="search-section" className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl shadow-md p-6 border border-border">
              <h2 className="text-2xl font-semibold mb-4 text-center">Find Your Perfect Venue</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Any Location" className="pl-9" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Event Type</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Any Event" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="corporate">Corporate</SelectItem>
                      <SelectItem value="birthday">Birthday</SelectItem>
                      <SelectItem value="social">Social Gathering</SelectItem>
                      <SelectItem value="conference">Conference</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Guests</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Guest Count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="101-200">101-200</SelectItem>
                      <SelectItem value="201-300">201-300</SelectItem>
                      <SelectItem value="301+">301+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full gap-2" asChild>
                    <Link to="/venues">
                      <Search className="h-4 w-4" />
                      Search
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Featured Venues</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Discover our most popular and highly-rated venues for your next event
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredVenues.map((venue, index) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                featured={index === 0}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" asChild>
              <Link to="/venues" className="flex items-center gap-2">
                View All Venues
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 variants={item} className="text-3xl font-bold">
              Why Choose BanquetHub
            </motion.h2>
            <motion.p variants={item} className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              We make planning your event simple, seamless, and stress-free
            </motion.p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={item}
                className="bg-card rounded-xl p-8 text-center border border-border shadow-sm"
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-primary/10 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={item}>
              <Button size="lg" asChild>
                <Link to="/booking">Book Your Event Now</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">What Our Clients Say</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
              Read testimonials from clients who have hosted memorable events at our venues
            </p>
          </div>
          
          <Carousel
            opts={{ loop: true }}
            className="max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial.id}>
                  <AnimatedCard className="p-8 bg-card rounded-xl shadow-sm border border-border">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-primary text-white rounded-full p-1.5">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <p className="text-lg font-medium italic">"{testimonial.content}"</p>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </AnimatedCard>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center gap-2 mt-6">
              <CarouselPrevious className="relative inline-flex static" />
              <CarouselNext className="relative inline-flex static" />
            </div>
          </Carousel>
        </div>
      </section>
      
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Next Event?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">
              From intimate gatherings to grand celebrations, we have the perfect venue for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/venues">Explore Venues</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:text-primary hover:bg-primary-foreground" asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
