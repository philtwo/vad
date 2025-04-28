import { JSX } from "react";

export interface ValorantAgent {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  fullPortrait: string;
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: {
    map(arg0: (ability: any) => JSX.Element): import("react").ReactNode;
    slot: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  isPlayableCharacter: boolean;
  
}

export interface ValorantApiResponse {
  status: number;
  data: ValorantAgent[];
} 