'use client';

import { useState } from 'react';
import { ValorantAgent } from '../types/valorant';

interface RoleFilterProps {
  agents: ValorantAgent[];
  uniqueRoles: string[];
}

export default function RoleFilter({ agents, uniqueRoles }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState('all');
  const [hoveredAgent, setHoveredAgent] = useState<ValorantAgent | null>(null);

  const filteredAgents = selectedRole === 'all'
    ? agents
    : agents.filter(agent => agent.role.displayName === selectedRole);

  return (
    <div style={{ display: 'flex' }}>
      {/* Left side for full portrait */}
      <div id="full-portrait-container">
        {hoveredAgent && (
          <img
            src={hoveredAgent.fullPortrait}
            alt={hoveredAgent.displayName}
            id="full-portrait"
            loading='lazy'
          />
        )}
      </div>

      {/* Right side for agent list */}
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
        <ul id="agents-list">
          {filteredAgents.map(agent => (
            <li
              key={agent.uuid}
              onMouseEnter={() => setHoveredAgent(agent)} // Set hovered agent
              onMouseLeave={() => setHoveredAgent(null)} // Clear hovered agent
            >
              <img
                id="display-icon"
                src={agent.displayIcon}
                alt={agent.displayName}
                width="100"
                loading='lazy'
              />
              <h3>{agent.displayName}</h3>
              <p>{agent.role.displayName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}