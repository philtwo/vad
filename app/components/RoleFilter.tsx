'use client';

import { useState } from 'react';
import { ValorantAgent } from '../types/valorant';
import ImageWithPlaceholder from './ImageWithPlaceHolder';
import { Icon } from "@iconify/react";
import { LineMdCloseCircle } from './ExitButton';

interface RoleFilterProps {
  agents: ValorantAgent[];
  uniqueRoles: string[];
}

export default function RoleFilter({ agents, uniqueRoles }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState('all');
  const [hoveredAgent, setHoveredAgent] = useState<ValorantAgent | null>(null);

  const showFullPortraitContainer = () => {
    const container = document.getElementById('full-portrait-container');
    if (container?.classList.contains('show')) {
      container.classList.remove('show');
    }
    else {
      container?.classList.add('show');
      container?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredAgents = selectedRole === 'all'
    ? agents
    : agents.filter(agent => agent.role.displayName === selectedRole);

  return (
    <div style={{ display: 'flex' }}>
      {/* Left side for full portrait */}
      <div id="full-portrait-container">
      <button id="exit-button" onClick={showFullPortraitContainer}><LineMdCloseCircle /></button>
        {hoveredAgent && (
          <div id="selected-agent">
            <img
              src={hoveredAgent.displayIcon}
              alt={hoveredAgent.displayName}
              id="display-icon"
              loading='lazy'
            />
            <h3>{hoveredAgent.displayName}</h3>
            <p id='agent-desc'>{hoveredAgent.description}</p>
            <hr />
            <h4>Abilities:</h4>
            <ul id="abilities-list">
              {hoveredAgent.abilities.map(ability => (
                <li key={ability.slot}>
                  <ImageWithPlaceholder
                    src={ability.displayIcon}
                    width="50"
                    loading='lazy'
                    placeholderSrc="./public/line-md--loading-loop.svg"
                  />
                  <h4>{ability.displayName}</h4>
                  <p>{ability.description}</p>
                </li>
              ))}
            </ul>
            {/* full portait to the right */}
            <ImageWithPlaceholder
              src={hoveredAgent.fullPortrait}
              alt={hoveredAgent.displayName}
              placeholderSrc="./public/line-md--loading-loop.svg"
              id="full-portrait"
              loading='lazy'/>
          </div>
        )}
      </div>

      {/* agent select list */}
      <div id="agents">
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
              onClick={() => {
                setHoveredAgent(agent); // Set picked agent
                showFullPortraitContainer(); // Show full agent container
              }} 
              // onMouseLeave={() => setHoveredAgent(null)} // Clear picked agent
            >
              <img id="roleIcon" src={agent.role.displayIcon}/>
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