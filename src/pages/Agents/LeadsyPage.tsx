import React from 'react';
import { motion } from 'framer-motion';
import Navigation from '../../components/Navigation';
import Hero from '../../components/Hero';
import HowItWorks from '../../components/HowItWorks';
import ScrapingForm from '../../components/ScrapingForm/ScrapingForm';
import ContactForm from '../../components/ContactForm';
import Footer from '../../components/Footer';

const LeadsyPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <HowItWorks />
        <ScrapingForm />
        <ContactForm />
        <Footer />
      </div>
    </div>
  );
};

export default LeadsyPage;