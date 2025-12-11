import { create } from "zustand";
import { MatchFilter, RosterTab } from "@/types";

interface AppState {
  // Match filters
  matchFilter: MatchFilter;
  setMatchFilter: (filter: MatchFilter) => void;

  // Roster tabs
  rosterTab: RosterTab;
  setRosterTab: (tab: RosterTab) => void;

  // Selected season for results
  selectedSeason: string;
  setSelectedSeason: (season: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Match filters
  matchFilter: "all",
  setMatchFilter: (filter) => set({ matchFilter: filter }),

  // Roster tabs
  rosterTab: "players",
  setRosterTab: (tab) => set({ rosterTab: tab }),

  // Selected season
  selectedSeason: "2025",
  setSelectedSeason: (season) => set({ selectedSeason: season }),
}));
