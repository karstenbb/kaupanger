"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Match } from "@/types";
import { formatDate, getDayOfWeek } from "@/lib/utils";
import { MapPin, ExternalLink } from "lucide-react";

interface MatchListItemProps {
  match: Match;
  index: number;
}

export function MatchListItem({ match, index }: MatchListItemProps) {
  const isHome = match.location === "home";
  
  // Vis lag i rett rekkefølgje: heimelaget først
  const leftTeam = match.homeTeam;
  const rightTeam = match.awayTeam;

  const handleClick = () => {
    if (match.fiksId) {
      window.open(`https://www.fotball.no/fotballdata/kamp/?fiksId=${match.fiksId}`, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={handleClick}
      className="p-4 md:p-5 lg:p-6 rounded-2xl glass-card glass-card-hover cursor-pointer active:scale-[0.98]"
    >
      {/* Date and location badge */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 text-text-secondary text-xs md:text-sm">
          <span>{getDayOfWeek(match.date)}</span>
          <span>•</span>
          <span>{formatDate(match.date)}</span>
          <span>•</span>
          <span>{match.time}</span>
        </div>
        <span className={`px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium ${
          isHome 
            ? "bg-primary/20 text-primary border border-primary/30" 
            : "bg-secondary/20 text-secondary-light border border-secondary/30"
        }`}>
          {isHome ? "Heime" : "Borte"}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-3 md:gap-4 lg:gap-5">
        {/* Left team (home team) */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
          <span className={`font-medium text-sm md:text-base lg:text-lg ${leftTeam.shortName === "K.I.L" ? "text-primary" : "text-text-primary"}`}>
            {leftTeam.shortName}
          </span>
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
            {leftTeam.logo ? (
              <Image
                src={leftTeam.logo}
                alt={leftTeam.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span className="text-xs md:text-sm font-bold text-text-primary">
                {leftTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* VS */}
        <span className="text-lg md:text-xl lg:text-2xl font-bold text-text-muted px-2">VS</span>

        {/* Right team (away team) */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 justify-start">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
            {rightTeam.logo ? (
              <Image
                src={rightTeam.logo}
                alt={rightTeam.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span className="text-xs md:text-sm font-bold text-text-primary">
                {rightTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className={`font-medium text-sm md:text-base lg:text-lg ${rightTeam.shortName === "K.I.L" ? "text-primary" : "text-text-primary"}`}>
            {rightTeam.shortName}
          </span>
        </div>
      </div>

      {/* Venue */}
      <div className="flex items-center justify-center gap-1 mt-3 md:mt-4 text-xs md:text-sm text-text-secondary">
        <MapPin className="w-3 h-3 md:w-4 md:h-4" />
        <span>{match.venue}</span>
        <ExternalLink className="w-3 h-3 md:w-4 md:h-4 ml-1 text-primary/60" />
      </div>
    </motion.div>
  );
}
