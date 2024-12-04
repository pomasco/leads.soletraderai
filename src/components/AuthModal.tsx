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
      if (isSignIn) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
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
        if (error) throw error;
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Sign Up')}
                  </motion.button>
                </form>
              </div>

              {/* Sliding Panel */}
              <motion.div
                className={`bg-gradient-to-br from-dark-purple to-caribbean-current p-12 flex flex-col 
                         justify-between text-seasalt absolute inset-0 w-1/2 transition-transform duration-500 ${
                         isSignIn ? 'translate-x-0' : 'translate-x-full'
                         }`}
                initial={false}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <Store className="w-8 h-8" />
                  <span className="text-xl font-heading font-bold">Sole Trader AI</span>
                </div>

                <div className="text-center space-y-8">
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

                <div className="absolute bottom-4 right-4">
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