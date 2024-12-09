import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'signin' }) => {
  const [isSignIn, setIsSignIn] = React.useState(initialMode === 'signin');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Input validation
      if (!email || !password) {
        setError('Please fill in all required fields');
        return;
      }

      if (!isSignIn && !name) {
        setError('Please enter your name');
        return;
      }

      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) { 
          if (error.message.includes('Invalid login credentials')) {
            setError('Invalid email or password');
          } else {
            setError(error.message);
          }
          return;
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: name,
            },
          },
        });

        if (error) {
          if (error.message.includes('already registered')) {
            setError('This email is already registered');
          } else {
            setError(error.message);
          }
          return;
        }
        
        setError('Check your email for the confirmation link');
        return;
      }

      onClose();
    } catch (err) {
      console.error('Auth error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) setError(error.message);
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-dark-purple/80 backdrop-blur-sm z-50"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <motion.div
            className="fixed inset-0 m-auto w-[800px] h-[600px] bg-seasalt rounded-2xl 
                     shadow-2xl overflow-hidden z-50"
            style={{ width: '960px', height: '720px' }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="grid grid-cols-2 h-full relative">
              {/* Form Side */}
              <div className={`p-8 flex flex-col justify-center absolute inset-0 w-1/2 transition-transform duration-500 ${
                isSignIn ? 'translate-x-full' : 'translate-x-0'
              }`}>
                <h2 className="text-3xl font-heading font-bold text-dark-purple mb-8">
                  {isSignIn ? 'Sign in to Account' : 'Create Account'}
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <motion.button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-caribbean-current/20 
                               rounded-lg text-dark-purple hover:bg-caribbean-current/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Continue with Google
                    </motion.button>
                  </div>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-caribbean-current/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-seasalt text-dark-purple/60">Or continue with email</span>
                    </div>
                  </div>
                  {!isSignIn && (
                    <div>
                      <label className="block text-sm font-medium text-dark-purple mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                                 focus:border-caribbean-current focus:outline-none transition-colors"
                        placeholder="Enter your name"
                        required={!isSignIn}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-purple mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                               focus:border-caribbean-current focus:outline-none transition-colors"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-dark-purple mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                               focus:border-caribbean-current focus:outline-none transition-colors"
                      placeholder="Enter your password"
                      required
                    />
                  </div>

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}
                  
                  <motion.button
                    type="submit"
                    className="w-full btn-primary"
                    style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Sign Up')}
                  </motion.button>
                </form>
              </div>

              {/* Logo */}
              <div className="flex items-center gap-3 mb-8">
                <img
                  className="h-16"
                  alt="Sole Trader AI"
                  className="h-16"
                />
              </div>
              
              {/* Sliding Panel */}
              <motion.div
                className={`bg-gradient-to-br from-dark-purple to-caribbean-current p-12 flex flex-col 
                         items-center justify-center text-seasalt absolute inset-0 w-1/2 transition-transform duration-500 ${
                         isSignIn ? 'translate-x-0' : 'translate-x-full'
                         }`}
                initial={false}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3 absolute top-8 left-8">
                  <img
                    src="/images/Logo/soletraderai-logo-white.png"
                    alt="Sole Trader AI"
                    className="h-8"
                  />
                </div>

                <div className="text-center space-y-8 mb-12">
                  <h3 className="text-3xl font-heading font-bold">
                    {isSignIn ? 'Hello, Friend!' : 'Welcome Back!'}
                  </h3>
                  <p className="text-seasalt/80">
                    {isSignIn
                      ? 'Enter your personal details and start your journey with us'
                      : 'To keep connected with us please login with your personal info'}
                  </p>
                  <motion.button
                    onClick={() => setIsSignIn(!isSignIn)}
                    className="border-2 border-seasalt text-seasalt px-10 py-3 rounded-lg
                             hover:bg-seasalt hover:text-dark-purple transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSignIn ? 'Sign Up' : 'Sign In'}
                  </motion.button>
                </div>

                <div className="absolute bottom-8 right-8">
                  <button
                    onClick={onClose}
                    className="text-seasalt/80 hover:text-seasalt transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;