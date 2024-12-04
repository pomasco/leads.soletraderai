import React from 'react';
import { motion } from 'framer-motion';

interface LocationStepProps {
  country: string;
  setCountry: (country: string) => void;
  city: string;
  setCity: (city: string) => void;
}

const countries = ['Australia', 'New Zealand', 'United States', 'United Kingdom'];
const cities = {
  'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'],
  'New Zealand': ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'],
  'United States': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'],
  'United Kingdom': ['London', 'Manchester', 'Birmingham', 'Leeds', 'Liverpool']
};

const LocationStep: React.FC<LocationStepProps> = ({ 
  country, setCountry, city, setCity 
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-heading font-medium text-dark-purple">
        Select your location
      </h3>
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="block text-sm font-medium text-dark-purple mb-2">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
              setCity('');
            }}
            className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                     focus:border-caribbean-current focus:outline-none transition-colors
                     text-dark-purple bg-white"
          >
            <option value="">Select a country</option>
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium text-dark-purple mb-2">
            City
          </label>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!country}
            className="w-full px-4 py-3 rounded-lg border-2 border-caribbean-current/20 
                     focus:border-caribbean-current focus:outline-none transition-colors
                     text-dark-purple bg-white disabled:bg-gray-100 
                     disabled:cursor-not-allowed"
          >
            <option value="">Select a city</option>
            {country && cities[country as keyof typeof cities].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </motion.div>
      </div>
    </div>
  );
};

export default LocationStep;