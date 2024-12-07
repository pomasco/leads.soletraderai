import React from 'react';
import { motion } from 'framer-motion';
import { Store, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import AuthModal from './AuthModal';

const Navigation: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-purple/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            as="a"
            href="/"
          >
            <img
              src="/images/Logo/soletraderai-logo-white.png"
              alt="Sole Trader AI"
              className="h-8"
            />
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <motion.a
              href="/"
              className="text-seasalt hover:text-celadon transition-colors"
              whileHover={{ scale: 1.05 }}
            >
              Home
            </motion.a>
            {user && (
              <motion.a
                href="/dashboard"
                className="text-seasalt hover:text-celadon transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Dashboard
              </motion.a>
            )}
          </div>

          {/* Auth Button */}
          <div>
            {user ? (
              <motion.button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center gap-2 border-2 border-seasalt text-seasalt 
                         px-4 py-2 rounded-lg hover:bg-seasalt hover:text-dark-purple 
                         transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                Sign Out
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setShowAuthModal(true)}
                className="flex items-center gap-2 border-2 border-seasalt text-seasalt 
                         px-4 py-2 rounded-lg hover:bg-seasalt hover:text-dark-purple 
                         transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                Sign In
              </motion.button>
            )}
          </div>
        </div>
      </div>

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode="signin"
        />
      )}
    </nav>
  );
};

export default Navigation;