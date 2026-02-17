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
      className="p-4 md:p-5 lg:p-6 rounded-2xl glass-card glass-card-hover cursor-pointer active:scale-[0.98]"
    >
      {/* Header - Venue & Date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-secondary-light" />
          <span className="text-xs md:text-sm text-text-secondary uppercase tracking-wide">
            {match.venue}
          </span>
        </div>
        <span className="text-xs md:text-sm text-text-muted">{formatDate(match.date)}</span>
      </div>

      {/* Score Section */}
      <div className="flex items-center justify-between">
        {/* K.I.L */}
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
            <Image
              src="/images/kil-logo.png"
              alt="K.I.L"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
          <span className="font-medium text-sm md:text-base lg:text-lg text-text-primary">K.I.L</span>
        </div>

        {/* Score */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">{kilScore}</span>
          <span className="text-base md:text-lg lg:text-xl text-text-muted">-</span>
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">{opponentScore}</span>
        </div>

        {/* Opponent */}
        <div className="flex items-center gap-3 md:gap-4">
          <span className="font-medium text-sm md:text-base lg:text-lg text-text-primary text-right">{opponent.shortName}</span>
          <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-secondary/30 backdrop-blur-sm border border-secondary/40 flex items-center justify-center">
            <span className="text-sm md:text-base lg:text-lg font-bold text-secondary-light">
              {opponent.shortName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* Result Badge */}
      <div className="flex justify-center items-center mt-4 gap-2">
        <span
          className={`px-4 md:px-5 lg:px-6 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-semibold backdrop-blur-sm ${
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
