import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { supabase } from '../../lib/supabase';
import AuthModal from '../AuthModal';
import AuthOverlay from '../AuthOverlay';
import StepMenu from './StepMenu';
import KeywordsStep from './KeywordsStep';
import LocationStep from './LocationStep';
import ResultsStep from './ResultsStep';
import DownloadStep from './DownloadStep';

const ScrapingForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [user, setUser] = React.useState(null);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const [isSignUp, setIsSignUp] = React.useState(false);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Form state
  const [keywords, setKeywords] = React.useState<string[]>([]);
  const [country, setCountry] = React.useState('');
  const [city, setCity] = React.useState('');
  const [results, setResults] = React.useState(100);
  const [currentStep, setCurrentStep] = React.useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ keywords, country, city, results });
    setCurrentStep(4); // Move to download step
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <KeywordsStep keywords={keywords} setKeywords={setKeywords} />;
      case 2:
        return (
          <LocationStep
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
          />
        );
      case 3:
        return <ResultsStep results={results} setResults={setResults} />;
      case 4:
        return <DownloadStep />;
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return keywords.some(k => k.trim().length > 0);
      case 2:
        return country && city;
      case 3:
        return results >= 100;
      default:
        return false;
    }
  };

  return (
    <section id="scraping-form" className="bg-seasalt py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {showAuthModal && (
          <AuthModal
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode={isSignUp ? 'signup' : 'signin'}
          />
        )}
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-purple mb-6">
            Start Generating Leads
          </h2>
          <p className="text-xl text-dark-purple/80">
            Follow these simple steps to begin gathering your leads.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg relative overflow-hidden"
        >
          <div className="flex">
            {!user && (
              <AuthOverlay
                onSignIn={() => {
                  setIsSignUp(false);
                  setShowAuthModal(true);
                }}
                onSignUp={() => {
                  setIsSignUp(true);
                  setShowAuthModal(true);
                }}
              />
            )}
            <StepMenu currentStep={currentStep} onStepClick={setCurrentStep} />
            <div className="flex-1 p-8">
              <form onSubmit={handleSubmit} className="h-full flex flex-col">
                <div className="flex-1">
                  {renderStepContent()}
                </div>
                {currentStep < 4 && (
                  <div className="flex justify-end pt-8">
                    <motion.button
                      type={currentStep === 3 ? 'submit' : 'button'}
                      onClick={() => currentStep < 3 && setCurrentStep(prev => prev + 1)}
                      className="btn-primary"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!canProceed()}
                    >
                      {currentStep === 3 ? 'Generate Leads' : 'Continue'}
                    </motion.button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrapingForm;