// Player Types
export interface Player {
  id: string;
  name: string;
}

export interface PlayerStats {
  playerId: string;
  playerName: string;
  kills?: number;
  deaths?: number;
  wins?: number;
  losses?: number;
  accuracy?: number;
  score?: number;
  // Add more fields based on actual API response
}

// Server Types
export interface Server {
  serverId?: string;
  id?: string;
  prefix?: string;
  name?: string;
  playerAmount?: number;
  playerCount?: number;
  maxPlayers?: number;
  currentMap?: string;
  map?: string;
  mode?: string;
  region?: string;
  progress?: number;
  url?: string;
  latency?: number;
}

export interface DetailedServer extends Server {
  description?: string;
  settings?: Record<string, any>;
  rotation?: string[];
  // Add more fields based on actual API response
}

// Content Types
export interface DLC {
  id: string;
  name: string;
  price?: number;
  description?: string;
}

export interface GameEvent {
  id: string;
  name: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface Translation {
  [key: string]: string;
}
