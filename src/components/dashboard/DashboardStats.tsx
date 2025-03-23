
import { CreditCard, Users, CalendarDays, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import AnimatedCard from '../ui/AnimatedCard';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    positive: boolean;
  };
  className?: string;
  // Adding animation delay styling
  animationDelay?: string;
}

const StatCard = ({ title, value, description, icon, trend, className, animationDelay }: StatCardProps) => (
  <AnimatedCard 
    className={cn(
      "p-6 bg-card rounded-lg border border-border shadow-sm",
      className
    )}
    style={animationDelay ? { animationDelay } : undefined}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h4 className="text-2xl font-bold mt-1">{value}</h4>
        
        {trend && (
          <div className="flex items-center mt-1">
            <span 
              className={cn(
                "text-xs font-medium",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? '↑' : '↓'} {Math.abs(trend.value)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">vs last month</span>
          </div>
        )}
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      
      <div className="p-3 bg-primary/10 rounded-full">
        {icon}
      </div>
    </div>
  </AnimatedCard>
);

interface DashboardStatsProps {
  className?: string;
  userRole?: 'admin' | 'organizer' | 'client';
}

const DashboardStats = ({ className, userRole = 'client' }: DashboardStatsProps) => {
  // Conditional stats based on user role
  const statsForRole = {
    admin: [
      {
        title: 'Total Revenue',
        value: '$24,320',
        description: 'Total revenue this month',
        icon: <CreditCard className="h-5 w-5 text-primary" />,
        trend: { value: 12, positive: true },
      },
      {
        title: 'Total Bookings',
        value: '142',
        description: 'Total bookings this month',
        icon: <CalendarDays className="h-5 w-5 text-primary" />,
        trend: { value: 8, positive: true },
      },
      {
        title: 'Total Users',
        value: '832',
        description: 'Active users this month',
        icon: <Users className="h-5 w-5 text-primary" />,
        trend: { value: 5, positive: true },
      },
      {
        title: 'Avg. Event Duration',
        value: '4.2 hrs',
        description: 'Average event duration',
        icon: <Clock className="h-5 w-5 text-primary" />,
        trend: { value: 2, positive: false },
      },
    ],
    organizer: [
      {
        title: 'Total Revenue',
        value: '$8,450',
        description: 'Your revenue this month',
        icon: <CreditCard className="h-5 w-5 text-primary" />,
        trend: { value: 7, positive: true },
      },
      {
        title: 'Total Events',
        value: '24',
        description: 'Events organized this month',
        icon: <CalendarDays className="h-5 w-5 text-primary" />,
        trend: { value: 12, positive: true },
      },
      {
        title: 'Total Clients',
        value: '48',
        description: 'Clients this month',
        icon: <Users className="h-5 w-5 text-primary" />,
        trend: { value: 3, positive: true },
      },
      {
        title: 'Avg. Event Rating',
        value: '4.8/5',
        description: 'Average event rating',
        icon: <Clock className="h-5 w-5 text-primary" />,
        trend: { value: 0.2, positive: true },
      },
    ],
    client: [
      {
        title: 'Upcoming Events',
        value: '3',
        description: 'Your upcoming bookings',
        icon: <CalendarDays className="h-5 w-5 text-primary" />,
        trend: { value: 1, positive: true },
      },
      {
        title: 'Total Spent',
        value: '$1,250',
        description: 'Total spent this year',
        icon: <CreditCard className="h-5 w-5 text-primary" />,
        trend: { value: 15, positive: true },
      },
      {
        title: 'Favorite Venues',
        value: '4',
        description: 'Venues you saved',
        icon: <Clock className="h-5 w-5 text-primary" />,
      },
      {
        title: 'Reward Points',
        value: '450',
        description: 'Available reward points',
        icon: <Users className="h-5 w-5 text-primary" />,
        trend: { value: 50, positive: true },
      },
    ],
  };
  
  const stats = statsForRole[userRole];
  
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description={stat.description}
          icon={stat.icon}
          trend={stat.trend}
          className="animate-fade-up"
          animationDelay={`${index * 100}ms`}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
