import React from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

interface User {
  email?: string;
  user_metadata?: {
    full_name?: string;
  };
}

const AuthButton: React.FC = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [credits, setCredits] = React.useState<number>(0);
  const [showAuthModal, setShowAuthModal] = React.useState(false);

  React.useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        fetchCredits(session.user.id);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchCredits(session.user.id);
      } else {
        setUser(null);
        setCredits(0);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCredits = async (userId: string) => {
    const { data, error } = await supabase
      .from('credits')
      .select('amount')
      .eq('user_id', userId)
      .single();

    if (data && !error) {
      setCredits(data.amount);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <p className="text-seasalt">
          Welcome, {user.user_metadata?.full_name || user.email}!
          <span className="ml-2">
            You have {credits} credits remaining.
          </span>
        </p>
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Buy Credits
        </motion.button>
        <motion.button
          onClick={handleSignOut}
          className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                   hover:bg-seasalt hover:text-dark-purple transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Sign Out
        </motion.button>
      </div>
    );
  }

  return (
    <>
      <motion.button
        onClick={() => setShowAuthModal(true)}
        className="border-2 border-seasalt text-seasalt px-4 py-2 rounded-lg 
                 hover:bg-seasalt hover:text-dark-purple transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Sign In
      </motion.button>

      {showAuthModal && (
        <div className="fixed inset-0 bg-dark-purple/80 flex items-center justify-center z-50">
          <div className="bg-seasalt p-8 rounded-lg max-w-md w-full">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#246a73',
                      brandAccent: '#acf7c1',
                    },
                  },
                },
              }}
              providers={['google']}
              onlyThirdPartyProviders
            />
            <button
              onClick={() => setShowAuthModal(false)}
              className="mt-4 text-dark-purple hover:text-caribbean-current"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthButton;