"use client";

import { motion } from "framer-motion";
import { Player } from "@/types";
import { ChevronRight } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  index: number;
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-3 rounded-xl bg-background-card border border-surface-border hover:border-surface-light transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        {/* Player Image */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-cyan/30 to-accent-blue/30 flex items-center justify-center overflow-hidden">
          {player.image ? (
            <img
              src={player.image}
              alt={`${player.firstName} ${player.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-accent-cyan">
              {player.firstName[0]}{player.lastName[0]}
            </span>
          )}
        </div>

        {/* Player Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-text-primary">
            {player.firstName} {player.lastName}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{player.positionLabel}</span>
            {player.isInjured && (
              <span className="text-xs text-status-injured">• {player.injuryNote}</span>
            )}
          </div>
        </div>
      </div>

      {/* Number & Arrow */}
      <div className="flex items-center gap-2">
        <span className="text-xl font-bold text-accent-cyan">#{player.number}</span>
        <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors" />
      </div>
    </motion.div>
  );
}
