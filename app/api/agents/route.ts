import { NextResponse } from 'next/server';
import { ValorantApiResponse } from '@/app/types/valorant';

export async function GET() {
  try {
    const response = await fetch('https://valorant-api.com/v1/agents');
    const data: ValorantApiResponse = await response.json();
    
    // filter the duplicate sova out
    const playableAgents = data.data
      .filter(agent => agent.isPlayableCharacter)
      .filter((agent, index, self) => 
        index === self.findIndex(a => a.displayName === agent.displayName)
      );

    return NextResponse.json(playableAgents);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch agents' },
      { status: 500 }
    );
  }
} 