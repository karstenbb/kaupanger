"use client";

import { motion } from "framer-motion";
import { NextMatchCard } from "@/components/matches/next-match-card";
import { MatchListItem } from "@/components/matches/match-list-item";
import { MatchFilterTabs } from "@/components/matches/match-filter-tabs";
import { useUpcomingMatches, useNextMatch } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { Calendar, Loader2 } from "lucide-react";

export function KamperContent() {
  const { matchFilter, setMatchFilter } = useAppStore();
  const { data: nextMatch, isLoading: nextLoading } = useNextMatch();
  const { data: matches, isLoading: matchesLoading } = useUpcomingMatches(matchFilter);

  return (
    <div className="px-4 space-y-6">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2"
      >
        <Calendar className="w-5 h-5 text-secondary-light" />
        <h2 className="text-lg font-bold gradient-text">Kommende Kamper</h2>
      </motion.div>

      {/* Next Match Card */}
      {nextLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : nextMatch ? (
        <NextMatchCard match={nextMatch} />
      ) : null}

      {/* Filter Tabs */}
      <MatchFilterTabs filter={matchFilter} onFilterChange={setMatchFilter} />

      {/* Match List */}
      <div className="space-y-3">
        {matchesLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : matches && matches.length > 0 ? (
          matches.slice(1).map((match, index) => (
            <MatchListItem key={match.id} match={match} index={index} />
          ))
        ) : (
          <p className="text-center text-text-secondary py-8">
            Ingen kampar funne
          </p>
        )}
      </div>
    </div>
  );
}
