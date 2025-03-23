
import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Users, Utensils, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BookingFormProps {
  venueId?: string;
  venueName?: string;
  className?: string;
  onSubmit?: (data: any) => void;
}

const BookingForm = ({ venueId, venueName, className, onSubmit }: BookingFormProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [guests, setGuests] = useState<string>();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [eventType, setEventType] = useState<string>();
  const [additionalServices, setAdditionalServices] = useState<{
    catering: boolean;
    decoration: boolean;
    music: boolean;
    photography: boolean;
  }>({
    catering: false,
    decoration: false,
    music: false,
    photography: false,
  });
  
  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  ];
  
  const guestOptions = [
    '1-50', '51-100', '101-150', '151-200', '201-250', '251-300', '300+'
  ];
  
  const eventTypes = [
    'Wedding', 'Corporate Event', 'Birthday', 'Anniversary', 
    'Conference', 'Gala', 'Graduation', 'Other'
  ];
  
  const handleServiceChange = (service: keyof typeof additionalServices) => {
    setAdditionalServices(prev => ({
      ...prev,
      [service]: !prev[service]
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!date || !time || !guests || !name || !email || !phone || !eventType) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Phone validation (basic)
    if (phone.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }
    
    const bookingData = {
      venueId,
      venueName,
      date,
      time,
      guests,
      name,
      email,
      phone,
      eventType,
      additionalServices,
    };
    
    toast.success('Booking request submitted successfully!');
    
    if (onSubmit) {
      onSubmit(bookingData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="bg-card rounded-lg border border-border p-6 space-y-6">
        <h3 className="text-xl font-semibold">Book Your Event</h3>
        
        {venueName && (
          <div>
            <Label className="text-muted-foreground">Selected Venue</Label>
            <div className="font-medium">{venueName}</div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Time Selection */}
          <div className="space-y-2">
            <Label htmlFor="time">Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger id="time" className={cn(!time && "text-muted-foreground")}>
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Guests */}
          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Select value={guests} onValueChange={setGuests}>
              <SelectTrigger id="guests" className={cn(!guests && "text-muted-foreground")}>
                <Users className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select guest count" />
              </SelectTrigger>
              <SelectContent>
                {guestOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Event Type */}
          <div className="space-y-2">
            <Label htmlFor="eventType">Event Type</Label>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger 
                id="eventType" 
                className={cn(!eventType && "text-muted-foreground")}
              >
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Contact Information */}
        <div className="space-y-4">
          <h4 className="font-medium">Contact Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="john@example.com" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="(123) 456-7890" 
              />
            </div>
          </div>
        </div>
        
        {/* Additional Services */}
        <div className="space-y-4">
          <h4 className="font-medium">Additional Services</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="catering"
                checked={additionalServices.catering}
                onCheckedChange={() => handleServiceChange('catering')}
              />
              <Label htmlFor="catering" className="flex items-center cursor-pointer">
                <Utensils className="mr-2 h-4 w-4" />
                Catering
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="decoration"
                checked={additionalServices.decoration}
                onCheckedChange={() => handleServiceChange('decoration')}
              />
              <Label htmlFor="decoration" className="cursor-pointer">Decoration</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="music"
                checked={additionalServices.music}
                onCheckedChange={() => handleServiceChange('music')}
              />
              <Label htmlFor="music" className="flex items-center cursor-pointer">
                <Music className="mr-2 h-4 w-4" />
                Music & Entertainment
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="photography"
                checked={additionalServices.photography}
                onCheckedChange={() => handleServiceChange('photography')}
              />
              <Label htmlFor="photography" className="cursor-pointer">Photography</Label>
            </div>
          </div>
        </div>
        
        <Button type="submit" className="w-full">Submit Booking Request</Button>
      </div>
    </form>
  );
};

export default BookingForm;
