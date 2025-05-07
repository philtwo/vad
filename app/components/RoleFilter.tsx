'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { ValorantAgent } from '../types/valorant';
import { LineMdCloseCircle } from './ExitButton';

interface RoleFilterProps {
  agents: ValorantAgent[];
  uniqueRoles: string[];
}

export default function RoleFilter({ agents, uniqueRoles }: RoleFilterProps) {
  const [selectedRole, setSelectedRole] = useState('all');
  const [hoveredAgent, setHoveredAgent] = useState<ValorantAgent | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const showFullPortraitContainer = () => {
    const container = document.getElementById('full-portrait-container');
    if (container?.classList.contains('show')) {
      container?.classList.remove('show');
      container?.scrollTo({ top: 0 });
    } else {
      container?.classList.add('show');
      container?.scrollTo({ top: 0 });
    }
  };

function Loading() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></svg>
  )
};

  const handleClickOutside = (event: MouseEvent) => {
    const container = menuRef.current;
    if (container && !container.contains(event.target as Node)) {
      container.classList.remove('show');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const filteredAgents = selectedRole === 'all'
    ? agents
    : agents.filter(agent => agent.role.displayName === selectedRole);

  return (
    <div style={{ display: 'flex' }}>
      {/* Left side for full portrait */}
      <div id="full-portrait-container" ref={menuRef}>
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
                  <img
                    src={ability.displayIcon}
                    width="50"
                    loading='lazy'
                  />
                  <h4>{ability.displayName}</h4>
                  <p>{ability.description}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* FULL hoveredAgent portrait to the right */}
      {hoveredAgent && (
      <Suspense fallback={<Loading />}>
      <img
            src={hoveredAgent.fullPortrait}
            alt={hoveredAgent.displayName}
            id="full-portrait"
            loading='lazy'/>
      </Suspense>
      )}
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