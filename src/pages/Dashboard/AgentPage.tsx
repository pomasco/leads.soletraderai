import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import ScrapingForm from '../../components/ScrapingForm/ScrapingForm';
import { supabase } from '../../lib/supabase';
import SideMenu from '../../components/Dashboard/SideMenu';

const AgentPage: React.FC = () => {
  const { agentId } = useParams();
  const [agent, setAgent] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchAgent = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .eq('id', agentId)
        .single();
      
      if (!error && data) {
        setAgent(data);
      }
      setLoading(false);
    };

    fetchAgent();
  }, [agentId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-purple">
        <SideMenu />
        <div className="pl-64 p-8">
          <div className="text-seasalt">Loading...</div>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen bg-dark-purple">
        <SideMenu />
        <div className="pl-64 p-8">
          <div className="text-seasalt">Agent not found</div>
        </div>
      </div>
    );
  }

  if (agentId === 'leadsy') {
    return (
      <div className="min-h-screen bg-dark-purple">
        <SideMenu />
        <div className="pl-64">
          <div className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <motion.a
                href="/dashboard"
                className="text-seasalt hover:text-celadon transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                <ArrowLeft className="w-6 h-6" />
              </motion.a>
              <h1 className="text-3xl font-heading font-bold text-seasalt">
                {agent.name}
              </h1>
            </div>
            <ScrapingForm />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default AgentPage;