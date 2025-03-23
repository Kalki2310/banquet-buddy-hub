
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Calendar, Clock, Users, MapPin, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface Event {
  id: string;
  title: string;
  venue: string;
  venueId: string;
  date: Date;
  time: string;
  duration: string;
  guests: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: string;
  location: string;
  cost?: number;
}

interface EventsListProps {
  events: Event[];
  className?: string;
  view?: 'table' | 'grid';
  title?: string;
  description?: string;
  userRole?: 'admin' | 'organizer' | 'client';
  onStatusChange?: (id: string, status: Event['status']) => void;
}

const EventsList = ({ 
  events, 
  className, 
  view = 'table',
  title = 'Upcoming Events',
  description = 'Your scheduled events',
  userRole = 'client',
  onStatusChange
}: EventsListProps) => {
  const [displayEvents, setDisplayEvents] = useState<Event[]>(events);
  
  const handleStatusChange = (id: string, newStatus: Event['status']) => {
    if (onStatusChange) {
      onStatusChange(id, newStatus);
    } else {
      setDisplayEvents(prev => 
        prev.map(event => 
          event.id === id ? { ...event, status: newStatus } : event
        )
      );
    }
  };
  
  const getStatusColor = (status: Event['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'completed':
        return 'bg-green-500 hover:bg-green-600';
      case 'cancelled':
        return 'bg-red-500 hover:bg-red-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  // Sort events by date (most recent first)
  const sortedEvents = [...displayEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  return (
    <Card className={cn("shadow-sm", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {view === 'table' ? (
          <Table>
            <TableCaption>A list of your events.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Venue</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Status</TableHead>
                {userRole !== 'client' && <TableHead>Cost</TableHead>}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedEvents.length > 0 ? (
                sortedEvents.map((event) => (
                  <TableRow key={event.id}>
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>{event.venue}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                        <span className="text-xs text-muted-foreground">{event.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>{event.guests}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary"
                        className={cn(
                          "text-xs text-white",
                          event.status === 'upcoming' && "bg-blue-500",
                          event.status === 'completed' && "bg-green-500",
                          event.status === 'cancelled' && "bg-red-500"
                        )}
                      >
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                    </TableCell>
                    {userRole !== 'client' && <TableCell>${event.cost?.toLocaleString()}</TableCell>}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Link to={`/events/${event.id}`} className="w-full">View Details</Link>
                          </DropdownMenuItem>
                          {userRole !== 'client' && event.status === 'upcoming' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(event.id, 'completed')}>
                              Mark as Completed
                            </DropdownMenuItem>
                          )}
                          {event.status === 'upcoming' && (
                            <DropdownMenuItem onClick={() => handleStatusChange(event.id, 'cancelled')}>
                              Cancel Event
                            </DropdownMenuItem>
                          )}
                          {userRole === 'admin' && (
                            <DropdownMenuItem className="text-red-500 hover:text-red-600">
                              Delete Event
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={userRole !== 'client' ? 7 : 6} className="text-center py-6 text-muted-foreground">
                    No events found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedEvents.length > 0 ? (
              sortedEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="border border-border rounded-lg p-4 space-y-4 bg-card hover:shadow-md transition-shadow animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium">{event.title}</h3>
                    <Badge 
                      variant="secondary"
                      className={cn(
                        "text-xs text-white",
                        event.status === 'upcoming' && "bg-blue-500",
                        event.status === 'completed' && "bg-green-500",
                        event.status === 'cancelled' && "bg-red-500"
                      )}
                    >
                      {event.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin size={14} className="mr-1" />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar size={14} className="mr-1" />
                      <span>{format(new Date(event.date), 'MMM dd, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      <span>{event.time} ({event.duration})</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users size={14} className="mr-1" />
                      <span>{event.guests} guests</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    {userRole !== 'client' && event.cost && (
                      <span className="text-sm font-medium">${event.cost.toLocaleString()}</span>
                    )}
                    <Button variant="outline" size="sm" asChild className="ml-auto">
                      <Link to={`/events/${event.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No events found
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventsList;
