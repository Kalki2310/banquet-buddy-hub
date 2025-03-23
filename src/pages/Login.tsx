
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AuthForm from '@/components/auth/AuthForm';
import useAuth from '@/hooks/useAuth';

const Login = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const navigate = useNavigate();
  
  // If already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, isLoading, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-16 max-w-md">
          <AuthForm 
            defaultTab="login"
            onSuccess={(user) => {
              login(user);
              navigate('/dashboard');
            }}
          />
          
          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
