/**
 * Hook for å hente cached data frå JSON-fil
 * Dataen blir oppdatert dagleg av cron job
 */

import { useQuery } from "@tanstack/react-query";
import { Match, HistoricalMatch } from "@/types";

interface CachedData {
  upcomingMatches: Match[];
  results: HistoricalMatch[];
  table: TableRow[];
  lastUpdated: string;
}

interface TableRow {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

async function fetchCachedData(): Promise<CachedData | null> {
  try {
    const response = await fetch("/data/matches.json", {
      next: { revalidate: 3600 }, // Re-valider kvar time
    });
    
    if (!response.ok) {
      return null;
    }
    
    return response.json();
  } catch {
    return null;
  }
}

/**
 * Hook for å hente cached kampdata
 * Fallback til mock-data om ingen cached data finst
 */
export function useCachedData() {
  return useQuery({
    queryKey: ["cachedData"],
    queryFn: fetchCachedData,
    staleTime: 1000 * 60 * 60, // 1 time
    gcTime: 1000 * 60 * 60 * 24, // 24 timar
  });
}

/**
 * Hook for å hente kommande kampar
 */
export function useCachedUpcomingMatches() {
  const { data, ...rest } = useCachedData();
  return {
    data: data?.upcomingMatches ?? [],
    ...rest,
  };
}

/**
 * Hook for å hente resultat
 */
export function useCachedResults() {
  const { data, ...rest } = useCachedData();
  return {
    data: data?.results ?? [],
    ...rest,
  };
}

/**
 * Hook for å hente tabell
 */
export function useCachedTable() {
  const { data, ...rest } = useCachedData();
  return {
    data: data?.table ?? [],
    ...rest,
  };
}

/**
 * Hook for å sjekke når data sist blei oppdatert
 */
export function useDataLastUpdated() {
  const { data, ...rest } = useCachedData();
  return {
    data: data?.lastUpdated ?? null,
    ...rest,
  };
}
