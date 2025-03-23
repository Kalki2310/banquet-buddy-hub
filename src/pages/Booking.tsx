
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Check, AlertCircle, ArrowLeft, ArrowRight, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import BookingForm from '@/components/ui/BookingForm';
import { VenueProps } from '@/components/ui/VenueCard';
import { toast } from 'sonner';

// Mock venues data
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
];

const additionalServices = [
  {
    id: 'catering',
    name: 'Premium Catering',
    description: 'Gourmet food and beverage service',
    price: 45,
    priceLabel: 'per person',
  },
  {
    id: 'decoration',
    name: 'Decoration Package',
    description: 'Custom event decor and floral arrangements',
    price: 1200,
    priceLabel: 'flat fee',
  },
  {
    id: 'av',
    name: 'A/V Equipment',
    description: 'Professional sound and lighting',
    price: 800,
    priceLabel: 'flat fee',
  },
  {
    id: 'photography',
    name: 'Photography',
    description: 'Professional event photography',
    price: 1500,
    priceLabel: 'flat fee',
  },
  {
    id: 'entertainment',
    name: 'Entertainment',
    description: 'Live music or DJ services',
    price: 1200,
    priceLabel: 'flat fee',
  },
];

const paymentMethods = [
  {
    id: 'credit',
    name: 'Credit/Debit Card',
    description: 'Pay with Visa, Mastercard, etc.',
    icon: '💳',
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Fast and secure payment',
    icon: 'P',
  },
  {
    id: 'bank',
    name: 'Bank Transfer',
    description: 'Direct bank transfer',
    icon: '🏦',
  },
];

const Booking = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventType: '',
    specialRequests: '',
    agreeTos: false,
  });
  
  const selectedVenue = venues.find(venue => venue.id === selectedVenueId);
  
  const handleVenueSelect = (venueId: string) => {
    setSelectedVenueId(venueId);
  };
  
  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };
  
  const handlePaymentMethodSelect = (methodId: string) => {
    setPaymentMethod(methodId);
  };
  
  const handleFormChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleNextStep = () => {
    if (activeStep === 1 && !selectedVenueId) {
      toast.error("Please select a venue to continue");
      return;
    }
    
    if (activeStep === 3) {
      // Validate form data
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.eventType) {
        toast.error("Please fill out all required fields");
        return;
      }
      
      if (!formData.agreeTos) {
        toast.error("Please agree to the terms of service");
        return;
      }
    }
    
    if (activeStep === 4 && !paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    if (activeStep < 5) {
      setActiveStep(activeStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }
    
    // In a real app, you would process the payment here
    toast.success("Booking confirmed! Redirecting to confirmation page...");
    
    // Simulate redirect to confirmation
    setTimeout(() => {
      setActiveStep(5);
      window.scrollTo(0, 0);
    }, 2000);
  };
  
  // Calculate total cost
  const calculateTotal = () => {
    let total = selectedVenue ? selectedVenue.price * 4 : 0; // Assuming 4-hour minimum
    
    // Add selected services
    selectedServices.forEach(serviceId => {
      const service = additionalServices.find(s => s.id === serviceId);
      if (service) {
        if (service.priceLabel === 'per person') {
          // Assuming 100 guests if no guest count is provided
          total += service.price * 100;
        } else {
          total += service.price;
        }
      }
    });
    
    return total;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Book Your Event</h1>
            <p className="text-muted-foreground mt-2">
              Fill out the information below to book your perfect venue
            </p>
          </div>
          
          {/* Booking Steps */}
          <div className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      step === activeStep
                        ? 'bg-primary text-primary-foreground'
                        : step < activeStep
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {step < activeStep ? <Check className="h-5 w-5" /> : step}
                  </div>
                  <span className="text-xs mt-2 text-muted-foreground hidden sm:block">
                    {step === 1 && 'Select Venue'}
                    {step === 2 && 'Choose Date'}
                    {step === 3 && 'Event Details'}
                    {step === 4 && 'Payment'}
                    {step === 5 && 'Confirmation'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-1 bg-secondary">
              <div 
                className="h-full bg-primary transition-all"
                style={{ width: `${(activeStep - 1) * 25}%` }}
              ></div>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Select Venue */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Select a Venue</CardTitle>
                    <CardDescription>Choose from our premium venues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {venues.map((venue) => (
                        <div 
                          key={venue.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedVenueId === venue.id 
                              ? 'border-primary bg-primary/5' 
                              : 'border-border hover:border-primary/50'
                          }`}
                          onClick={() => handleVenueSelect(venue.id)}
                        >
                          <div className="flex flex-col md:flex-row gap-4">
                            <div className="md:w-32 h-24 rounded-md overflow-hidden">
                              <img 
                                src={venue.image} 
                                alt={venue.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                <h3 className="font-medium">{venue.name}</h3>
                                <div className="flex items-center gap-1">
                                  <span className="font-medium">${venue.price}</span>
                                  <span className="text-sm text-muted-foreground">/hour</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{venue.location}</p>
                              <div className="flex items-center gap-4 mt-2 text-sm">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>Available</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Check className="h-4 w-4 text-green-500" />
                                  <span>Up to {venue.capacity} guests</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" disabled>
                      Previous
                    </Button>
                    <Button onClick={handleNextStep}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 2: Choose Date & Time */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Date & Time</CardTitle>
                    <CardDescription>
                      {selectedVenue?.name}: ${selectedVenue?.price}/hour (4 hour minimum)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <BookingForm
                      venueId={selectedVenueId || undefined}
                      venueName={selectedVenue?.name}
                      onSubmit={(data) => {
                        console.log('Date & time data:', data);
                        handleNextStep();
                      }}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Previous
                    </Button>
                    <Button onClick={handleNextStep}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 3: Event Details */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>Tell us more about your event</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName" 
                            value={formData.firstName}
                            onChange={(e) => handleFormChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName" 
                            value={formData.lastName}
                            onChange={(e) => handleFormChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleFormChange('email', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={formData.phone}
                            onChange={(e) => handleFormChange('phone', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="eventType">Event Type</Label>
                        <Select 
                          onValueChange={(value) => handleFormChange('eventType', value)}
                          value={formData.eventType}
                        >
                          <SelectTrigger id="eventType">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wedding">Wedding</SelectItem>
                            <SelectItem value="corporate">Corporate Event</SelectItem>
                            <SelectItem value="birthday">Birthday Party</SelectItem>
                            <SelectItem value="anniversary">Anniversary</SelectItem>
                            <SelectItem value="conference">Conference</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea 
                          id="specialRequests" 
                          placeholder="Let us know if you have any special requirements..." 
                          value={formData.specialRequests}
                          onChange={(e) => handleFormChange('specialRequests', e.target.value)}
                          className="min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-6">
                        <h3 className="font-medium">Additional Services</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {additionalServices.map((service) => (
                            <div 
                              key={service.id}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                selectedServices.includes(service.id) 
                                  ? 'border-primary bg-primary/5' 
                                  : 'border-border hover:border-primary/50'
                              }`}
                              onClick={() => handleServiceToggle(service.id)}
                            >
                              <div className="flex items-start gap-3">
                                <Checkbox 
                                  checked={selectedServices.includes(service.id)}
                                  onCheckedChange={() => handleServiceToggle(service.id)}
                                  className="mt-1"
                                />
                                <div>
                                  <div className="flex items-center justify-between">
                                    <h4 className="font-medium">{service.name}</h4>
                                    <div className="flex items-center">
                                      <span className="font-medium">${service.price}</span>
                                      <span className="text-xs text-muted-foreground ml-1">
                                        {service.priceLabel}
                                      </span>
                                    </div>
                                  </div>
                                  <p className="text-sm text-muted-foreground">
                                    {service.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={formData.agreeTos}
                          onCheckedChange={(checked) => 
                            handleFormChange('agreeTos', checked === true ? true : false)
                          }
                        />
                        <Label 
                          htmlFor="terms" 
                          className="text-sm cursor-pointer"
                        >
                          I agree to the terms of service and privacy policy
                        </Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Previous
                    </Button>
                    <Button onClick={handleNextStep}>
                      Next
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 4: Payment */}
            {activeStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment</CardTitle>
                    <CardDescription>Select a payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {paymentMethods.map((method) => (
                          <div 
                            key={method.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-all ${
                              paymentMethod === method.id 
                                ? 'border-primary bg-primary/5' 
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => handlePaymentMethodSelect(method.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                                <span className="text-foreground">{method.icon}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{method.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {method.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {paymentMethod && (
                        <div className="bg-secondary/30 rounded-lg p-6 mt-6">
                          <h3 className="font-medium mb-4">Payment Summary</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground">Venue Rental (4 hours)</span>
                              <span>${selectedVenue ? selectedVenue.price * 4 : 0}</span>
                            </div>
                            
                            {selectedServices.map((serviceId) => {
                              const service = additionalServices.find(s => s.id === serviceId);
                              if (!service) return null;
                              
                              return (
                                <div key={serviceId} className="flex justify-between text-sm">
                                  <span className="text-muted-foreground">{service.name}</span>
                                  <span>
                                    ${service.priceLabel === 'per person' ? service.price * 100 : service.price}
                                    {service.priceLabel === 'per person' && (
                                      <TooltipProvider>
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-4 w-4 ml-1">
                                              <Info className="h-3 w-3" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>
                                            <p>Based on estimated 100 guests</p>
                                          </TooltipContent>
                                        </Tooltip>
                                      </TooltipProvider>
                                    )}
                                  </span>
                                </div>
                              );
                            })}
                            
                            <div className="border-t border-border pt-2 mt-2">
                              <div className="flex justify-between font-medium">
                                <span>Total</span>
                                <span>${calculateTotal().toLocaleString()}</span>
                              </div>
                              <p className="text-xs text-muted-foreground mt-1">
                                A deposit of 25% (${Math.round(calculateTotal() * 0.25).toLocaleString()}) will be charged now.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handlePreviousStep}>
                      Previous
                    </Button>
                    <Button onClick={handleBookingSubmit}>
                      Complete Booking
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
            
            {/* Step 5: Confirmation */}
            {activeStep === 5 && (
              <div className="space-y-6">
                <Card className="border-green-500">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
                      <Check className="h-8 w-8 text-green-500" />
                    </div>
                    <CardTitle>Booking Confirmed!</CardTitle>
                    <CardDescription>
                      Thank you for booking with BanquetHub
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-secondary/30 rounded-lg p-6">
                        <h3 className="font-medium mb-4">Booking Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Booking ID</span>
                            <span className="font-medium">BH-{Math.floor(Math.random() * 100000)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Venue</span>
                            <span>{selectedVenue?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Date</span>
                            <span>May 15, 2023</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Time</span>
                            <span>6:00 PM - 10:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Total</span>
                            <span className="font-medium">${calculateTotal().toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Deposit Paid</span>
                            <span>${Math.round(calculateTotal() * 0.25).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center space-y-4">
                        <p className="text-muted-foreground">
                          We've sent a confirmation email to {formData.email} with all the details.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                          <Button asChild>
                            <Link to="/dashboard">Go to Dashboard</Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link to="/">Return to Home</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Booking;
