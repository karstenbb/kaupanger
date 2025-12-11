"use client";

import { motion } from "framer-motion";
import { Match } from "@/types";
import { formatDate, getDayOfWeek } from "@/lib/utils";
import { MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MatchListItemProps {
  match: Match;
  index: number;
}

export function MatchListItem({ match, index }: MatchListItemProps) {
  const isHome = match.location === "home";
  const opponent = isHome ? match.awayTeam : match.homeTeam;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="flex items-center justify-between p-4 rounded-2xl bg-background-card border border-surface-border hover:border-surface-light transition-colors"
    >
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="flex flex-col items-center text-text-secondary">
          <span className="text-xs">{formatDate(match.date)}</span>
          <span className="text-xs">{getDayOfWeek(match.date)}</span>
        </div>

        {/* Vertical divider */}
        <div className="h-10 w-px bg-surface-border" />

        {/* Team info */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              isHome ? "bg-surface text-text-primary" : "bg-accent-cyan/20 text-accent-cyan"
            }`}>
              {opponent.shortName.substring(0, 2).toUpperCase()}
            </div>
            <span className="font-medium text-text-primary">{opponent.name}</span>
            {!isHome && <Users className="w-4 h-4 text-text-secondary" />}
          </div>
          <div className="flex items-center gap-1 text-xs text-text-secondary">
            <MapPin className="w-3 h-3" />
            <span>{match.venue}</span>
          </div>
        </div>
      </div>

      {/* Time & Actions */}
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-text-primary">{match.time}</span>
        {match.ticketUrl && (
          <Button variant="outline" size="sm">
            Kjøp Billetter
          </Button>
        )}
      </div>
    </motion.div>
  );
}
