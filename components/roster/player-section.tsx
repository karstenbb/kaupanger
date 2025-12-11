"use client";

import { motion } from "framer-motion";
import { Player } from "@/types";
import { PlayerCard } from "./player-card";

interface PlayerSectionProps {
  title: string;
  players: Player[];
  startIndex: number;
}

export function PlayerSection({ title, players, startIndex }: PlayerSectionProps) {
  if (players.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-2">
        {players.map((player, index) => (
          <PlayerCard
            key={player.id}
            player={player}
            index={startIndex + index}
          />
        ))}
      </div>
    </motion.div>
  );
}
