import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Check, Zap, Crown } from 'lucide-react';

const plans = [
  {
    name: 'Starter Scraper',
    price: 20,
    credits: '1,000',
    color: '#9333EA', // Purple
    features: [
      'Up to 1,000 leads',
      'CSV export'
    ],
    icon: Check
  },
  {
    name: 'Pro Scraper',
    price: 90,
    credits: '10,000',
    color: '#3B82F6', // Blue
    popular: true,
    features: [
      'Up to 10,000 leads',
      'CSV export'
    ],
    icon: Crown
  },
  {
    name: 'Enterprise Scraper',
    price: 150,
    credits: '20,000',
    color: '#EC4899', // Pink
    features: [
      'Up to 20,000 leads',
      'CSV export'
    ],
    icon: Zap
  }
];

const PricingTable: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedPlan, setSelectedPlan] = React.useState(1); // Pro plan selected by default

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="pricing" className="bg-seasalt py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading font-bold text-4xl sm:text-5xl text-dark-purple mb-6">
            Flexible Plans for Every Business
          </h2>
          <p className="text-xl text-dark-purple/80 max-w-3xl mx-auto">
            Pick the plan that suits your needs. Buy credits and start scraping today!
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`pricing-card bg-white rounded-2xl shadow-lg ${
                selectedPlan === index ? 'selected' : ''
              }`}
              onClick={() => setSelectedPlan(index)}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4">
                  <div className="bg-caribbean-current text-seasalt text-sm font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Popular
                  </div>
                </div>
              )}
              
              <div 
                className="pricing-header"
                style={{ backgroundColor: plan.color }}
              >
                <plan.icon className="w-8 h-8 mb-4" />
                <h3 className="font-sans font-semibold text-2xl text-dark-purple mb-4">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className="ml-2 opacity-80">/ package</span>
                </div>
                <div>
                  <span className="text-2xl font-semibold">
                    {plan.credits}
                  </span>
                  <span className="ml-2 opacity-80">credits</span>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8 text-dark-purple">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-dark-purple/80">
                      <Check 
                        className="w-5 h-5 flex-shrink-0" 
                        style={{ color: plan.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <motion.button
                  className={`pricing-button ${
                    selectedPlan === index ? 'pricing-button-selected' : 'pricing-button-default'
                  }`}
                  style={{ 
                    backgroundColor: selectedPlan === index ? plan.color : 'transparent',
                    borderColor: plan.color,
                    color: selectedPlan === index ? '#fcfafa' : plan.color
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPlan === index ? 'Selected Plan' : 'Select Plan'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PricingTable;