
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Users, CreditCard, BellRing, LogOut, Settings, Home, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import EventsList, { Event } from '@/components/dashboard/EventsList';
import CalendarView from '@/components/ui/CalendarView';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Corporate Retreat',
    venue: 'Mountain View Resort',
    venueId: '5',
    date: new Date(new Date().setDate(new Date().getDate() + 5)),
    time: '9:00 AM',
    duration: '8 hours',
    guests: 40,
    status: 'upcoming',
    type: 'Corporate',
    location: 'Aspen, CO',
    cost: 4500
  },
  {
    id: '2',
    title: 'Annual Gala',
    venue: 'Crystal Grand Ballroom',
    venueId: '1',
    date: new Date(new Date().setDate(new Date().getDate() + 12)),
    time: '6:30 PM',
    duration: '5 hours',
    guests: 150,
    status: 'upcoming',
    type: 'Gala',
    location: 'Downtown, New York',
    cost: 7500
  },
  {
    id: '3',
    title: 'Product Launch',
    venue: 'Metropolitan Conference Center',
    venueId: '3',
    date: new Date(new Date().setDate(new Date().getDate() - 15)),
    time: '10:00 AM',
    duration: '4 hours',
    guests: 85,
    status: 'completed',
    type: 'Corporate',
    location: 'Midtown, Chicago',
    cost: 3200
  },
  {
    id: '4',
    title: 'Wedding Anniversary',
    venue: 'Garden Pavilion',
    venueId: '4',
    date: new Date(new Date().setDate(new Date().getDate() - 5)),
    time: '4:00 PM',
    duration: '6 hours',
    guests: 65,
    status: 'completed',
    type: 'Anniversary',
    location: 'Botanical Gardens, Miami',
    cost: 2800
  },
  {
    id: '5',
    title: 'Team Building Workshop',
    venue: 'Urban Workshop Space',
    venueId: '6',
    date: new Date(new Date().setDate(new Date().getDate() + 20)),
    time: '9:00 AM',
    duration: '7 hours',
    guests: 30,
    status: 'upcoming',
    type: 'Corporate',
    location: 'Seattle, WA',
    cost: 1800
  },
  {
    id: '6',
    title: 'Charity Fundraiser',
    venue: 'Harbor View Terrace',
    venueId: '2',
    date: new Date(new Date().setDate(new Date().getDate() - 20)),
    time: '7:00 PM',
    duration: '4 hours',
    guests: 120,
    status: 'cancelled',
    type: 'Fundraiser',
    location: 'Harbor District, San Francisco',
    cost: 5200
  }
];

const calendarEvents = mockEvents.map(event => ({
  date: new Date(event.date),
  title: event.title,
  status: event.status === 'upcoming' ? 'available' : 
          event.status === 'completed' ? 'booked' : 'pending'
}));

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [userEvents, setUserEvents] = useState<Event[]>(mockEvents);
  
  // If not logged in and not loading, redirect to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);
  
  const handleStatusChange = (id: string, newStatus: Event['status']) => {
    setUserEvents(prev => 
      prev.map(event => 
        event.id === id ? { ...event, status: newStatus } : event
      )
    );
    
    const statusMessages = {
      completed: 'Event marked as completed successfully',
      cancelled: 'Event has been cancelled',
      upcoming: 'Event status updated to upcoming'
    };
    
    toast.success(statusMessages[newStatus]);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">
                  Welcome back, {user?.name || 'User'}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2" asChild>
                  <a href="/booking">
                    <Calendar className="h-4 w-4" />
                    New Booking
                  </a>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          
          <div className="space-y-8">
            <DashboardStats userRole={user?.role as any} />
            
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <EventsList 
                      events={userEvents.filter(event => event.status === 'upcoming')} 
                      title="Upcoming Events" 
                      description="Your scheduled events for the coming days"
                      userRole={user?.role as any}
                      onStatusChange={handleStatusChange}
                    />
                  </div>
                  
                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>Notifications</CardTitle>
                        <CardDescription>Your latest updates</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                          <BellRing className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Payment Confirmation</h4>
                            <p className="text-xs text-muted-foreground">Your payment for Annual Gala has been confirmed.</p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Event Reminder</h4>
                            <p className="text-xs text-muted-foreground">Corporate Retreat is scheduled in 5 days.</p>
                            <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start gap-4 p-3 bg-secondary/50 rounded-lg">
                          <Building className="h-5 w-5 text-primary mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Venue Update</h4>
                            <p className="text-xs text-muted-foreground">Crystal Grand Ballroom has updated their services.</p>
                            <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <Card className="animate-fade-up animate-delay-100">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Your recent actions and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      {[...Array(5)].map((_, index) => (
                        <div key={index} className="flex items-center gap-4">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          <div className="flex-1">
                            <p className="text-sm">
                              {index === 0 && "You created a new booking for Corporate Retreat"}
                              {index === 1 && "Invoice #12345 was generated for Annual Gala"}
                              {index === 2 && "You updated guest count for Team Building Workshop"}
                              {index === 3 && "Added special meal requests for Corporate Retreat"}
                              {index === 4 && "Reviewed venue details for Harbor View Terrace"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {index === 0 && "2 hours ago"}
                              {index === 1 && "Yesterday at 4:23 PM"}
                              {index === 2 && "2 days ago"}
                              {index === 3 && "3 days ago"}
                              {index === 4 && "1 week ago"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="events">
                <Tabs defaultValue="upcoming">
                  <TabsList className="mb-6">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    <TabsTrigger value="all">All Events</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming">
                    <EventsList 
                      events={userEvents.filter(event => event.status === 'upcoming')} 
                      userRole={user?.role as any}
                      onStatusChange={handleStatusChange}
                      view="grid"
                    />
                  </TabsContent>
                  
                  <TabsContent value="completed">
                    <EventsList 
                      events={userEvents.filter(event => event.status === 'completed')} 
                      title="Completed Events"
                      description="History of your completed events"
                      userRole={user?.role as any}
                      onStatusChange={handleStatusChange}
                      view="grid"
                    />
                  </TabsContent>
                  
                  <TabsContent value="cancelled">
                    <EventsList 
                      events={userEvents.filter(event => event.status === 'cancelled')} 
                      title="Cancelled Events"
                      description="Events that were cancelled"
                      userRole={user?.role as any}
                      onStatusChange={handleStatusChange}
                      view="grid"
                    />
                  </TabsContent>
                  
                  <TabsContent value="all">
                    <EventsList 
                      events={userEvents} 
                      title="All Events"
                      description="Complete history of your events"
                      userRole={user?.role as any}
                      onStatusChange={handleStatusChange}
                    />
                  </TabsContent>
                </Tabs>
              </TabsContent>
              
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Calendar</CardTitle>
                    <CardDescription>View your events timeline</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <CalendarView 
                      events={calendarEvents}
                      onDateSelect={(date) => {
                        const events = userEvents.filter(
                          event => 
                            date.getDate() === new Date(event.date).getDate() && 
                            date.getMonth() === new Date(event.date).getMonth() &&
                            date.getFullYear() === new Date(event.date).getFullYear()
                        );
                        
                        if (events.length > 0) {
                          const eventTitles = events.map(e => e.title).join(', ');
                          toast.info(`Events on ${date.toLocaleDateString()}: ${eventTitles}`);
                        } else {
                          toast.info(`No events scheduled for ${date.toLocaleDateString()}`);
                        }
                      }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
