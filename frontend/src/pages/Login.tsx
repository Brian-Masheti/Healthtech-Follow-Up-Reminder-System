import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { LogIn, Lock } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // In a real implementation, this would make an API call
      // For demo purposes, we'll simulate authentication with role-based routing
      
      setTimeout(() => {
        let userRole = '';
        
        if (email.includes('admin')) {
          userRole = 'admin';
        } else if (email.includes('doctor') || email.includes('staff')) {
          userRole = 'provider';
        } else {
          userRole = 'patient';
        }
        
        // Store user info in localStorage (would use secure cookies in production)
        localStorage.setItem('healthcareUser', JSON.stringify({
          email,
          role: userRole,
          name: email.split('@')[0],
          isAuthenticated: true,
          token: 'demo-jwt-token'
        }));
        
        // Route based on role
        switch (userRole) {
          case 'admin':
            toast("Admin login successful", {
              description: "Welcome to the admin dashboard",
            });
            navigate('/admin');
            break;
          case 'provider':
            toast("Provider login successful", {
              description: "Welcome to your dashboard",
            });
            navigate('/doctor');
            break;
          case 'patient':
            toast("Login successful", {
              description: "Welcome to your patient portal",
            });
            navigate('/patient-portal');
            break;
          default:
            navigate('/dashboard');
        }
        
        setIsLoading(false);
      }, 1000); // Fake 1s delay to simulate API call
      
    } catch (error) {
      toast("Login failed", {
        description: "Please check your credentials and try again",
        // The 'variant' property doesn't exist in sonner's toast options
        // Changed to use a custom style instead
        className: "bg-red-100 text-red-800 border-red-200"
      });
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="w-16 h-16 mx-auto mb-4 medical-gradient rounded-2xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">HC</span>
          </div>
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Hint: Use admin@example.com for admin, doctor@example.com for provider, or patient@example.com for patient
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Password
                </label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full medical-gradient text-white" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                <span className="flex items-center">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </span>
              )}
            </Button>
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <a href="#" className="text-primary hover:underline">
                Contact your clinic
              </a>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;