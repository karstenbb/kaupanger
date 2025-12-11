"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Player } from "@/types";
import { ChevronRight } from "lucide-react";

interface PlayerCardProps {
  player: Player;
  index: number;
}

export function PlayerCard({ player, index }: PlayerCardProps) {
  return (
    <Link href={`/tropp/${player.id}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="flex items-center justify-between p-3 rounded-xl glass-card glass-card-hover cursor-pointer group"
      >
        <div className="flex items-center gap-3">
          {/* Player Number Badge */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/40 to-secondary/30 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
            <span className="text-xl font-bold text-primary">#{player.number}</span>
          </div>

          {/* Player Info */}
          <div className="flex flex-col">
            <span className="font-semibold text-text-primary">
              {player.firstName} {player.lastName}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-light">{player.positionLabel}</span>
              {player.isInjured && (
                <span className="text-xs text-status-injured">• {player.injuryNote}</span>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          {player.appearances !== undefined && (
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-text-primary">{player.appearances}</span>
              <span className="text-[10px] text-text-muted uppercase">Kampar</span>
            </div>
          )}
          {player.goals !== undefined && player.goals > 0 && (
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-accent">{player.goals}</span>
              <span className="text-[10px] text-text-muted uppercase">Mål</span>
            </div>
          )}
          {(player.yellowCards !== undefined && player.yellowCards > 0) || (player.redCards !== undefined && player.redCards > 0) ? (
            <div className="flex items-center gap-1">
              {player.yellowCards !== undefined && player.yellowCards > 0 && (
                <div className="flex items-center gap-0.5">
                  <div className="w-3 h-4 bg-primary rounded-sm shadow-sm"></div>
                  <span className="text-xs text-text-secondary">{player.yellowCards}</span>
                </div>
              )}
              {player.redCards !== undefined && player.redCards > 0 && (
                <div className="flex items-center gap-0.5">
                  <div className="w-3 h-4 bg-red-500 rounded-sm shadow-sm"></div>
                  <span className="text-xs text-text-secondary">{player.redCards}</span>
                </div>
              )}
            </div>
          ) : null}
          <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
        </div>
      </motion.div>
    </Link>
  );
}
