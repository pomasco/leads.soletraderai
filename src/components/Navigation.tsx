import React from 'react';
import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <img
              src="/images/Logo/soletraderai-logo-white.png"
              alt="Sole Trader AI"
              className="h-16"
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <motion.a
              href="/agents"
              className="nav-link"
              whileHover={{ scale: 1.05 }}
            >
              Agents
            </motion.a>
            <motion.a
              href="/pricing"
              className="nav-link"
              whileHover={{ scale: 1.05 }}
            >
              Pricing
            </motion.a>
            {user && (
              <motion.a
                href="/dashboard"
                className="nav-link"
                whileHover={{ scale: 1.05 }}
              >
                Dashboard
              </motion.a>
            )}
          </div>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {user ? (
              <motion.button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-2 text-celadon text-sm
                         px-3 py-1 rounded-full hover:text-seasalt
                         transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                Sign Out
              </motion.button>
            ) : (
              <>
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsSignUp(false);
                  }}
                  className="flex items-center gap-2 text-seasalt text-sm
                           px-3 py-1 rounded-full hover:text-celadon
                           transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Sign In
                </motion.button>
                <motion.button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsSignUp(true);
                  }}
                  className="flex items-center gap-2 border border-celadon text-celadon text-sm
                           px-3 py-1 rounded-full hover:bg-celadon hover:text-dark-purple
                           transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Register
                </motion.button>
              </>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={isSignUp ? 'signup' : 'signin'}
        />
      )}
    </nav>
  );
};

export default Navigation;