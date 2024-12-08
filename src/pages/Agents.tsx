import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
}

const Agents: React.FC = () => {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });
  
  const [agents, setAgents] = React.useState<Agent[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('all');

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data) setAgents(data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(agents.map(agent => agent.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-purple to-dark-cyan">
      <Navigation />
      <div className="pt-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center py-20"
        >
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6 text-seasalt">
            Our <span className="highlight-text">AI Agents</span>
          </h1>
          <p className="text-xl text-seasalt/80 max-w-3xl mx-auto">
            Discover our collection of specialized AI agents designed to help your business grow
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto pb-20">
          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-seasalt/40" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search agents..."
                className="w-full pl-10 pr-4 py-3 bg-seasalt/5 border border-seasalt/10 rounded-lg
                         text-seasalt placeholder:text-seasalt/40 focus:outline-none focus:border-seasalt/20"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-seasalt/40" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 bg-seasalt/5 border border-seasalt/10 rounded-lg
                         text-seasalt appearance-none cursor-pointer focus:outline-none focus:border-seasalt/20"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-seasalt/60">Loading agents...</p>
            </div>
          ) : filteredAgents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-seasalt/60">No agents found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  className="bg-seasalt/5 backdrop-blur-lg rounded-xl p-6 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => navigate(`/agents/${agent.id}`)}
                >
                  <div className="mb-4">
                    <h3 className="text-xl font-heading font-bold text-seasalt mb-2">
                      {agent.name}
                    </h3>
                    <p className="text-seasalt/60 text-sm">
                      {agent.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-seasalt/40 capitalize">
                      {agent.category}
                    </span>
                    <motion.button
                      className="btn-primary text-sm px-4 py-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Agents;