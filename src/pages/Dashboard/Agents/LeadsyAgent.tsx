import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScrapingForm from '../../../components/ScrapingForm/ScrapingForm';

const LeadsyAgent: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link to="/dashboard/agents" className="text-seasalt hover:text-celadon transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </Link>
        </motion.div>
        <h1 className="text-3xl font-heading font-bold text-seasalt">
          Leadsy
        </h1>
      </div>
      <ScrapingForm />
    </div>
  );
};

export default LeadsyAgent;