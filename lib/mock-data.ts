import { Match, Player, Staff, HistoricalMatch, Season, Team } from "@/types";

// Club team
export const clubTeam: Team = {
  id: "kil",
  name: "K.I.L",
  shortName: "K.I.L",
  logo: "/images/kil-logo.png",
};

// Upcoming matches
export const upcomingMatches: Match[] = [
  {
    id: "1",
    homeTeam: clubTeam,
    awayTeam: {
      id: "fc-riverside",
      name: "FC Riverside",
      shortName: "Riverside",
      logo: "/images/teams/riverside.png",
    },
    date: "2025-12-15",
    time: "19:00",
    venue: "K.I.L Stadion • Hovedbanen",
    location: "home",
    status: "upcoming",
    ticketUrl: "/billetter/1",
  },
  {
    id: "2",
    homeTeam: {
      id: "north-hills",
      name: "North Hills Utd",
      shortName: "North Hills",
      logo: "/images/teams/north-hills.png",
    },
    awayTeam: clubTeam,
    date: "2025-11-19",
    time: "15:30",
    venue: "North Hills Arena, Manchester",
    location: "away",
    status: "upcoming",
  },
  {
    id: "3",
    homeTeam: clubTeam,
    awayTeam: {
      id: "city-strikers",
      name: "City Strikers",
      shortName: "Strikers",
      logo: "/images/teams/city-strikers.png",
    },
    date: "2025-11-26",
    time: "20:00",
    venue: "K.I.L Stadion • Hovedbanen",
    location: "home",
    status: "upcoming",
    ticketUrl: "/billetter/3",
  },
  {
    id: "4",
    homeTeam: {
      id: "forest-rovers",
      name: "Forest Rovers",
      shortName: "Forest",
      logo: "/images/teams/forest-rovers.png",
    },
    awayTeam: clubTeam,
    date: "2025-12-02",
    time: "18:45",
    venue: "The Green Park, Leeds",
    location: "away",
    status: "upcoming",
  },
];

// Players
export const players: Player[] = [
  // Keepers
  {
    id: "p1",
    firstName: "John",
    lastName: "Doe",
    position: "keeper",
    positionLabel: "Keeper",
    number: 1,
  },
  {
    id: "p2",
    firstName: "Marcus",
    lastName: "Webb",
    position: "keeper",
    positionLabel: "Keeper",
    number: 13,
  },
  // Defenders
  {
    id: "p3",
    firstName: "Alex",
    lastName: "Smith",
    position: "defender",
    positionLabel: "Midtstopper",
    number: 4,
  },
  {
    id: "p4",
    firstName: "Mike",
    lastName: "Ross",
    position: "defender",
    positionLabel: "Høyreback",
    number: 2,
    isInjured: true,
    injuryNote: "Skadet",
  },
  {
    id: "p5",
    firstName: "David",
    lastName: "Chen",
    position: "defender",
    positionLabel: "Venstreback",
    number: 3,
  },
  // Midfielders
  {
    id: "p6",
    firstName: "Sam",
    lastName: "Kent",
    position: "midfielder",
    positionLabel: "Sentral midtbane",
    number: 8,
  },
  {
    id: "p7",
    firstName: "Lucas",
    lastName: "Silva",
    position: "midfielder",
    positionLabel: "Offensiv midtbane",
    number: 10,
  },
  // Forwards
  {
    id: "p8",
    firstName: "Chris",
    lastName: "Green",
    position: "forward",
    positionLabel: "Spiss",
    number: 9,
  },
];

// Staff
export const staff: Staff[] = [
  {
    id: "s1",
    firstName: "Thomas",
    lastName: "Berg",
    role: "head_coach",
    roleLabel: "Hovedtrener",
  },
  {
    id: "s2",
    firstName: "Erik",
    lastName: "Hansen",
    role: "assistant_coach",
    roleLabel: "Assistenttrener",
  },
  {
    id: "s3",
    firstName: "Ole",
    lastName: "Nilsen",
    role: "goalkeeper_coach",
    roleLabel: "Keepertrener",
  },
];

// Seasons
export const seasons: Season[] = [
  { id: "2023-24", label: "Sesong 2023/24", startYear: 2023, endYear: 2024 },
  { id: "2022-23", label: "Sesong 2022/23", startYear: 2022, endYear: 2023 },
  { id: "2021-22", label: "Sesong 2021/22", startYear: 2021, endYear: 2022 },
];

// Historical matches / Results
export const historicalMatches: HistoricalMatch[] = [
  {
    id: "h1",
    homeTeam: clubTeam,
    awayTeam: {
      id: "rangers",
      name: "Rangers",
      shortName: "Rangers",
    },
    date: "2023-10-12",
    venue: "Hjemmebane",
    venueType: "home",
    homeScore: 3,
    awayScore: 1,
    result: "win",
    season: "2023-24",
  },
  {
    id: "h2",
    homeTeam: {
      id: "deer-fc",
      name: "Deer FC",
      shortName: "Deer FC",
    },
    awayTeam: clubTeam,
    date: "2023-09-28",
    venue: "City Arena",
    venueType: "away",
    homeScore: 2,
    awayScore: 2,
    result: "draw",
    season: "2023-24",
  },
  {
    id: "h3",
    homeTeam: clubTeam,
    awayTeam: {
      id: "mt-utd",
      name: "Mt. Utd",
      shortName: "Mt. Utd",
    },
    date: "2023-09-14",
    venue: "Mountain Peak",
    venueType: "away",
    homeScore: 0,
    awayScore: 2,
    result: "loss",
    season: "2023-24",
  },
  {
    id: "h4",
    homeTeam: clubTeam,
    awayTeam: {
      id: "pine-v",
      name: "Pine V.",
      shortName: "Pine V.",
    },
    date: "2023-09-01",
    venue: "Hjemmebane",
    venueType: "home",
    homeScore: 1,
    awayScore: 0,
    result: "win",
    season: "2023-24",
  },
];

// Group players by position
export const getPlayersByPosition = () => {
  return {
    keepers: players.filter((p) => p.position === "keeper"),
    defenders: players.filter((p) => p.position === "defender"),
    midfielders: players.filter((p) => p.position === "midfielder"),
    forwards: players.filter((p) => p.position === "forward"),
  };
};

// Filter matches
export const filterMatches = (filter: "all" | "home" | "away") => {
  if (filter === "all") return upcomingMatches;
  return upcomingMatches.filter((m) => m.location === filter);
};

// Get results by season
export const getResultsBySeason = (seasonId: string) => {
  return historicalMatches.filter((m) => m.season === seasonId);
};
