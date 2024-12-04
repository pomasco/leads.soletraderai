import React from 'react';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PricingTable from './components/PricingTable';
import ScrapingForm from './components/ScrapingForm/ScrapingForm';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Hero />
      <HowItWorks />
      <PricingTable />
      <ScrapingForm />
      <ContactForm />
      <Footer />
    </div>
  );

}
export default App;
