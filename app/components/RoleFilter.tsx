'use client';

import { useState } from 'react';
import { ValorantAgent } from '../types/valorant';

interface RoleFilterProps {
  agents: ValorantAgent[];
  uniqueRoles: string[];
}

export default function RoleFilter({ agents, uniqueRoles }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredAgents = selectedRole === 'all'
    ? agents
    : agents.filter(agent => agent.role.displayName === selectedRole);

  return (
    <>
      <div>
        <label className="filter" htmlFor="role-select">Filter by Role: </label>
        <select
          id="role-select"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="all">All Roles</option>
          {uniqueRoles.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
      <ul id="agents-list">
        {filteredAgents.map(agent => (
          <li key={agent.uuid}>
            <img
              src={agent.displayIcon}
              alt={agent.displayName}
              width="100"
            />
            <h3>{agent.displayName}</h3>
            <p>{agent.role.displayName}</p>
          </li>
        ))}
      </ul>
    </>
  );
} 