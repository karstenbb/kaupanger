"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { HistoricalMatch } from "@/types";
import { getResultLabel } from "@/lib/utils";
import { MapPin, ChevronRight } from "lucide-react";

interface ResultCardProps {
  match: HistoricalMatch;
  index: number;
}

export function ResultCard({ match, index }: ResultCardProps) {
  const router = useRouter();
  
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

  const handleClick = () => {
    router.push(`/resultater/${match.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      onClick={handleClick}
      className="p-4 md:p-5 lg:p-6 rounded-2xl glass-card glass-card-hover cursor-pointer active:scale-[0.98] transition-transform"
    >
      {/* Header - Venue & Date */}
      <div className="flex items-center justify-between mb-3 md:mb-4">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-secondary-light shrink-0" />
          <span className="text-[11px] md:text-xs lg:text-sm text-text-secondary uppercase tracking-wide truncate">
            {match.venue}
          </span>
        </div>
        <span className="text-[11px] md:text-xs lg:text-sm text-text-muted whitespace-nowrap ml-3">{formatDate(match.date)}</span>
      </div>

      {/* Score Section */}
      <div className="flex items-center justify-between gap-2">
        {/* K.I.L */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden shrink-0">
            <Image
              src="/images/kil-logo.png"
              alt="K.I.L"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
          <span className="font-medium text-sm md:text-base text-text-primary">K.I.L</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">{kilScore}</span>
          <span className="text-sm md:text-base lg:text-lg text-text-muted">-</span>
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">{opponentScore}</span>
        </div>

        {/* Opponent */}
        <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0 justify-end">
          <span className="font-medium text-sm md:text-base text-text-primary text-right truncate">{opponent.shortName}</span>
          <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full bg-secondary/30 backdrop-blur-sm border border-secondary/40 flex items-center justify-center shrink-0">
            <span className="text-xs md:text-sm lg:text-base font-bold text-secondary-light">
              {opponent.shortName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Result Badge */}
      <div className="flex justify-center items-center mt-3 md:mt-4 gap-2">
        <span
          className={`px-4 md:px-5 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm ${
            match.result === "win" ? "badge-win" : 
            match.result === "loss" ? "badge-loss" : 
            "badge-draw"
          }`}
        >
          {getResultLabel(match.result)}
        </span>
        <ChevronRight className="w-4 h-4 text-text-muted" />
      </div>
    </motion.div>
  );
}
