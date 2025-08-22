import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";

function LoginPage() {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Use AuthContext's login function which handles the API call
      const success = await login(password);

      if (success) {
        toast({
          title: 'Login Successful!',
          description: 'Welcome back, admin!',
        });
        setTimeout(() => navigate('/admin/dashboard'), 100);
      } else {
        toast({
          title: 'Login Failed',
          description: 'Incorrect password.',
          variant: 'destructive',
        });
        setPassword('');
      }
    } catch (error) {
      toast({
        title: 'Server Error',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <HelmetProvider>
        <title>Admin Login - Portfolio</title>
        <meta name="description" content="Admin login page for the portfolio." />
      </HelmetProvider>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">Admin Login</h1>
              <p className="text-gray-300 mt-2">Enter your password to access the dashboard.</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-semibold">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 text-base"
                disabled={isLoading}
              >
                <LogIn className="mr-2 h-5 w-5" />
                {isLoading ? 'Logging In...' : 'Log In'}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default LoginPage;