// Match types
export type MatchLocation = "home" | "away";
export type MatchStatus = "upcoming" | "live" | "completed";

export interface Team {
  id: string;
  name: string;
  shortName: string;
  logo?: string;
}

export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string; // ISO string
  time: string;
  venue: string;
  location: MatchLocation;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  ticketUrl?: string;
}

// Player types
export type PlayerPosition = "keeper" | "defender" | "midfielder" | "forward";

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  position: PlayerPosition;
  positionLabel: string;
  number: number;
  image?: string;
  isInjured?: boolean;
  injuryNote?: string;
  appearances?: number;
  goals?: number;
  yellowCards?: number;
  redCards?: number;
}

// Staff types
export type StaffRole = "head_coach" | "assistant_coach" | "goalkeeper_coach" | "physio" | "manager";

export interface StaffRoleItem {
  title: string;
  team?: string;
  club: string;
  krets: string;
}

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: StaffRole;
  roleLabel: string;
  image?: string;
  fiksId?: string;
  roles?: StaffRoleItem[];
}

// Result types
export type MatchResult = "win" | "draw" | "loss";

export interface HistoricalMatch {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  date: string;
  venue: string;
  venueType: "home" | "away" | "neutral";
  homeScore: number;
  awayScore: number;
  halfTimeHome?: number;
  halfTimeAway?: number;
  result: MatchResult;
  season: string;
  fiksId?: string;
}

// Season type
export interface Season {
  id: string;
  label: string;
  startYear: number;
  endYear: number;
}

// Navigation types
export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: string;
};

// Filter types
export type MatchFilter = "all" | "home" | "away";
export type RosterTab = "players" | "staff";

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}
