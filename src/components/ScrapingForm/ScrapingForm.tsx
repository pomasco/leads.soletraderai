import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import TestScrapingForm from '../TestScrapingForm/TestScrapingForm';

const ScrapingForm: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="scraping-form" className="bg-seasalt py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-purple mb-6">
            Try Our Lead Generation
          </h2>
          <p className="text-xl text-dark-purple/80">
            Test our lead generation capabilities with a free search.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <TestScrapingForm />
        </motion.div>
      </div>
    </section>
  );
};

export default ScrapingForm;