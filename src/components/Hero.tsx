import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import WaveAnimation from './WaveAnimation';
import AuthModal from './AuthModal';
import { supabase } from '../lib/supabase';

const Hero: React.FC = () => {
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pb-[120px]">
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          initialMode={isSignUp ? 'signup' : 'signin'}
        />
      )}
      <div className="absolute top-4 right-4 z-10 flex gap-4">
        {user ? (
          <motion.button
            onClick={() => supabase.auth.signOut()}
            className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                     hover:bg-seasalt hover:text-dark-purple transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign Out
          </motion.button>
        ) : (
          <motion.button
            onClick={() => {
              setIsSignUp(false);
              setShowAuthModal(true);
            }}
            className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                     hover:bg-seasalt hover:text-dark-purple transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sign In
          </motion.button>
        )}
      </div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight">
            Find Leads <span className="highlight-text">Faster</span>, <span className="highlight-text">Smarter</span>, and <span className="highlight-text">Effortlessly</span>.
          </h1>
          <p className="font-heading font-light text-xl sm:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
            Scrape verified leads from Google Maps in minutes and grow your business with precision.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ marginBottom: '3rem' }}
        >
          <motion.button
            className="btn-primary w-48"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSignUp(true);
              setShowAuthModal(true);
            }}
          >
            Get Started Now
          </motion.button>
          <motion.button
            className="btn-secondary w-48"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToHowItWorks}
          >
            Learn More
          </motion.button>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <ChevronDown className="w-8 h-8 text-seasalt cursor-pointer" onClick={scrollToHowItWorks} />
        </motion.div>
      </div>

      <WaveAnimation />

      {/* Animated background elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 bg-caribbean-current rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-10 w-72 h-72 bg-dark-cyan rounded-full mix-blend-multiply filter blur-xl opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      />
    </section>
  );
};

export default Hero;