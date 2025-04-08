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
  isPlayableCharacter: boolean;
}

export interface ValorantApiResponse {
  status: number;
  data: ValorantAgent[];
} 