import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardEvents from '@/components/dashboard/DashboardEvents';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return null;
  }

  const upcomingEvents = [
    {
      date: new Date(2023, 10, 15),
      title: 'Business Conference',
      status: 'booked' as const
    },
    {
      date: new Date(2023, 10, 18),
      title: 'Wedding Reception',
      status: 'pending' as const
    },
    {
      date: new Date(2023, 10, 22),
      title: 'Corporate Dinner',
      status: 'available' as const
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <Button><a href="/venues">Explore Venues</a></Button>
          </div>
          
          <DashboardStats className="mb-8" />
          <DashboardEvents events={upcomingEvents} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
