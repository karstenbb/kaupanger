"use client";

import { motion } from "framer-motion";
import { HistoricalMatch } from "@/types";
import { getResultLabel } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface ResultCardProps {
  match: HistoricalMatch;
  index: number;
}

export function ResultCard({ match, index }: ResultCardProps) {
  const isHomeGame = match.venueType === "home";
  
  // Determine if K.I.L is home or away team
  const isKilHome = match.homeTeam.shortName === "K.I.L";
  const kilScore = isKilHome ? match.homeScore : match.awayScore;
  const opponentScore = isKilHome ? match.awayScore : match.homeScore;
  const opponent = isKilHome ? match.awayTeam : match.homeTeam;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).toUpperCase();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className="p-4 rounded-2xl bg-background-card border border-surface-border"
    >
      {/* Header - Venue & Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-text-muted" />
          <span className="text-xs text-text-secondary uppercase tracking-wide">
            {match.venue}
          </span>
        </div>
        <span className="text-xs text-text-muted">{formatDate(match.date)}</span>
      </div>

      {/* Score Section */}
      <div className="flex items-center justify-between">
        {/* K.I.L */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center">
            <span className="text-sm font-bold text-primary">K.I.L</span>
          </div>
          <span className="font-medium text-text-primary">K.I.L</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-text-primary">{kilScore}</span>
          <span className="text-text-muted">-</span>
          <span className="text-2xl font-bold text-text-primary">{opponentScore}</span>
        </div>

        {/* Opponent */}
        <div className="flex items-center gap-3">
          <span className="font-medium text-text-primary text-right">{opponent.shortName}</span>
          <div className="w-10 h-10 rounded-full bg-accent-cyan/20 flex items-center justify-center">
            <span className="text-sm font-bold text-accent-cyan">
              {opponent.shortName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Result Badge */}
      <div className="flex justify-center mt-4">
        <span
          className={`px-4 py-1 rounded-full text-xs font-semibold text-background ${
            match.result === "win" ? "bg-status-win" : 
            match.result === "loss" ? "bg-status-loss" : 
            "bg-status-draw"
          }`}
        >
          {getResultLabel(match.result)}
        </span>
      </div>
    </motion.div>
  );
}
