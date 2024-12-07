import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import ComingSoon from './components/ComingSoon';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import PricingTable from './components/PricingTable';
import ScrapingForm from './components/ScrapingForm/ScrapingForm';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AgentPage from './pages/Dashboard/AgentPage';
import Dashboard from './pages/Dashboard';
import AgentsPage from './pages/Dashboard/AgentsPage';

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');
  const showMainSite = import.meta.env.VITE_SHOW_MAIN_SITE === 'true';

  return (
    <div className="min-h-screen">
      {!isDashboard && <Navigation />}
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/agents" element={<AgentsPage />} />
        <Route path="/dashboard/agents/:agentId/*" element={<AgentPage />} />
        <Route
          path="/"
          element={
            showMainSite ? (
              <div className="pt-16">
                <Hero />
                <HowItWorks />
                <PricingTable />
                <ScrapingForm />
                <ContactForm />
                <Footer />
              </div>
            ) : (
              <ComingSoon />
            )
          }
        />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
export default App;
