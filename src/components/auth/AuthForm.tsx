
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { toast } from 'sonner';

interface AuthFormProps {
  defaultTab?: 'login' | 'register';
  onSuccess?: (user: any) => void;
}

const AuthForm = ({ defaultTab = 'login', onSuccess }: AuthFormProps) => {
  const navigate = useNavigate();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Register state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [userType, setUserType] = useState('client');
  const [isRegistering, setIsRegistering] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!loginEmail || !loginPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoggingIn(true);
    
    try {
      // In a real implementation, this would be an API call
      // Simulating API call with setTimeout
      setTimeout(() => {
        // Demo credentials for testing
        if (loginEmail === 'admin@example.com' && loginPassword === 'admin123') {
          const user = {
            id: '1',
            name: 'Admin User',
            email: loginEmail,
            role: 'admin',
          };
          
          // Save user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          
          toast.success('Welcome back, Admin!');
          
          if (onSuccess) {
            onSuccess(user);
          }
          
          navigate('/dashboard');
        } else if (loginEmail === 'client@example.com' && loginPassword === 'client123') {
          const user = {
            id: '2',
            name: 'Client User',
            email: loginEmail,
            role: 'client',
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          
          toast.success('Welcome back!');
          
          if (onSuccess) {
            onSuccess(user);
          }
          
          navigate('/dashboard');
        } else if (loginEmail === 'organizer@example.com' && loginPassword === 'organizer123') {
          const user = {
            id: '3',
            name: 'Event Organizer',
            email: loginEmail,
            role: 'organizer',
          };
          
          localStorage.setItem('user', JSON.stringify(user));
          
          toast.success('Welcome back, Organizer!');
          
          if (onSuccess) {
            onSuccess(user);
          }
          
          navigate('/dashboard');
        } else {
          toast.error('Invalid credentials. Try our demo accounts!');
        }
        
        setIsLoggingIn(false);
      }, 1000);
    } catch (error) {
      toast.error('An error occurred during login');
      setIsLoggingIn(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!registerName || !registerEmail || !registerPassword || !registerConfirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (registerPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    setIsRegistering(true);
    
    try {
      // Simulating registration
      setTimeout(() => {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: registerName,
          email: registerEmail,
          role: userType,
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        
        toast.success('Registration successful!');
        
        if (onSuccess) {
          onSuccess(user);
        }
        
        navigate('/dashboard');
        setIsRegistering(false);
      }, 1000);
    } catch (error) {
      toast.error('An error occurred during registration');
      setIsRegistering(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="example@email.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <a 
                    href="#" 
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
              </div>
              <div className="text-xs text-muted-foreground">
                <p>Demo accounts:</p>
                <p>admin@example.com / admin123</p>
                <p>client@example.com / client123</p>
                <p>organizer@example.com / organizer123</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
        
        {/* Register Tab */}
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  placeholder="John Doe"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="example@email.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="user-type">Account Type</Label>
                <Select value={userType} onValueChange={setUserType}>
                  <SelectTrigger id="user-type">
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="organizer">Event Organizer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="••••••••"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isRegistering}>
                {isRegistering ? 'Creating account...' : 'Create account'}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
