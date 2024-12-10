import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, Bot } from 'lucide-react';

interface AgentHeroProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const AgentHero: React.FC<AgentHeroProps> = ({ title, description, icon }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="agent-hero" className="relative min-h-[80vh] flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="w-20 h-20 bg-caribbean-current/20 rounded-2xl flex items-center justify-center mb-8">
            {icon || <Bot className="w-10 h-10 text-caribbean-current" />}
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt">
            {title}
          </h1>
          <p className="text-xl text-seasalt/80 mb-12 max-w-2xl">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-6">
            <motion.button
              className="btn-primary flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-10 w-72 h-72 bg-caribbean-current rounded-full 
                   mix-blend-multiply filter blur-xl opacity-70"
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
          className="absolute bottom-1/4 right-10 w-72 h-72 bg-dark-cyan rounded-full 
                   mix-blend-multiply filter blur-xl opacity-70"
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
      </div>
    </section>
  );
};

export default AgentHero;