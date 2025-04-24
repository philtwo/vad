import { ValorantAgent } from './types/valorant';
import RoleFilter from './components/RoleFilter';

async function getAgents(): Promise<ValorantAgent[]> {
  const res = await fetch('https://valorant-api.com/v1/agents', {cache: 'no-store'});
  const data = await res.json();
  
  return data.data
    .filter((agent: ValorantAgent) => agent.isPlayableCharacter)
    .filter((agent: ValorantAgent, index: number, self: ValorantAgent[]) => 
      index === self.findIndex((a: ValorantAgent) => a.displayName === agent.displayName)
    );
}

export default async function Home() {
  const agents = await getAgents();
  const uniqueRoles = Array.from(new Set(agents.map(agent => agent.role.displayName)));

  return (
    <main>
      <h1>Valorant Agents</h1>
      <RoleFilter agents={agents} uniqueRoles={uniqueRoles} />
    </main>
  );
}
