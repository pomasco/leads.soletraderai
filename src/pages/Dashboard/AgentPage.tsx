import React from 'react';
import { useParams } from 'react-router-dom';
import LeadsyAgent from './Agents/LeadsyAgent';
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
    return <LeadsyAgent />;
  }

  return null;
};

export default AgentPage;