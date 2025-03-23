
import { useState } from 'react';
import EventsList, { Event } from './EventsList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardEventsProps {
  events: {
    date: Date;
    title: string;
    status: 'booked' | 'pending' | 'available';
  }[];
  className?: string;
}

const DashboardEvents = ({ events, className }: DashboardEventsProps) => {
  // Transform the simple event format to the full Event format
  const formattedEvents: Event[] = events.map((event, index) => ({
    id: `event-${index}`,
    title: event.title,
    venue: "Grand Ballroom",
    venueId: "venue-1",
    date: event.date,
    time: "14:00 - 18:00",
    duration: "4 hours",
    guests: 100 + (index * 20),
    status: event.status === 'booked' ? 'upcoming' : 
           event.status === 'pending' ? 'upcoming' : 'completed',
    type: "Corporate",
    location: "New York, NY",
    cost: 2500 + (index * 500)
  }));

  return (
    <EventsList 
      events={formattedEvents} 
      className={className}
      title="Upcoming Events" 
      description="Your scheduled events"
      view="grid"
    />
  );
};

export default DashboardEvents;
