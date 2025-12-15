import { useQuery } from "@tanstack/react-query";
import { 
  upcomingMatches, 
  players, 
  staff, 
  seasons,
  getPlayersByPosition,
  getResultsBySeason
} from "@/lib/mock-data";
import { Match, Player, Staff, HistoricalMatch, Season, MatchFilter } from "@/types";
import { WeatherData } from "@/types/weather";

// Simulate API delay for realistic behavior
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Weather API
async function fetchWeather(): Promise<WeatherData> {
  const response = await fetch("/api/weather");
  if (!response.ok) {
    throw new Error("Failed to fetch weather");
  }
  return response.json();
}

export function useWeather() {
  return useQuery({
    queryKey: ["weather"],
    queryFn: fetchWeather,
    staleTime: 30 * 60 * 1000, // 30 minutes
    refetchInterval: 30 * 60 * 1000, // Refetch every 30 minutes
  });
}

// API functions - these can be replaced with real API calls later
async function fetchUpcomingMatches(): Promise<Match[]> {
  await delay(300);
  return upcomingMatches;
}

async function fetchPlayers(): Promise<Player[]> {
  await delay(300);
  return players;
}

async function fetchStaff(): Promise<Staff[]> {
  await delay(300);
  return staff;
}

async function fetchHistoricalMatches(seasonId: string): Promise<HistoricalMatch[]> {
  await delay(300);
  return getResultsBySeason(seasonId);
}

async function fetchSeasons(): Promise<Season[]> {
  await delay(100);
  return seasons;
}

// React Query hooks
export function useUpcomingMatches(filter?: MatchFilter) {
  return useQuery({
    queryKey: ["matches", "upcoming", filter],
    queryFn: async () => {
      const matches = await fetchUpcomingMatches();
      if (filter && filter !== "all") {
        return matches.filter((m) => m.location === filter);
      }
      return matches;
    },
  });
}

export function useNextMatch() {
  return useQuery({
    queryKey: ["matches", "next"],
    queryFn: async () => {
      const matches = await fetchUpcomingMatches();
      return matches[0] || null;
    },
  });
}

export function usePlayers() {
  return useQuery({
    queryKey: ["players"],
    queryFn: fetchPlayers,
  });
}

export function usePlayerById(id: string) {
  return useQuery({
    queryKey: ["players", id],
    queryFn: async () => {
      await delay(200);
      return players.find((p) => p.id === id) || null;
    },
    enabled: !!id,
  });
}

export function usePlayersByPosition() {
  return useQuery({
    queryKey: ["players", "byPosition"],
    queryFn: async () => {
      await delay(300);
      return getPlayersByPosition();
    },
  });
}

export function useStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: fetchStaff,
  });
}

export function useStaffById(id: string) {
  return useQuery({
    queryKey: ["staff", id],
    queryFn: async () => {
      await delay(200);
      return staff.find((s) => s.id === id) || null;
    },
    enabled: !!id,
  });
}

export function useHistoricalMatches(seasonId: string) {
  return useQuery({
    queryKey: ["matches", "historical", seasonId],
    queryFn: () => fetchHistoricalMatches(seasonId),
    enabled: !!seasonId,
  });
}

export function useSeasons() {
  return useQuery({
    queryKey: ["seasons"],
    queryFn: fetchSeasons,
  });
}
