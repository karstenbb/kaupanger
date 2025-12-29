"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Calendar, Trophy, ChevronRight } from "lucide-react";
import { historicalMatches, upcomingMatches } from "@/lib/mock-data";
import { getResultLabel } from "@/lib/utils";
import { NextMatchCard } from "@/components/matches/next-match-card";

export function HomeContent() {
  const router = useRouter();
  
  // Sorter kampar etter dato (nyaste først) og ta dei 5 siste
  const recentMatches = [...historicalMatches]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  const lastMatch = recentMatches[0];
  const nextMatch = upcomingMatches[0];

  // Kalkuler sesongstatistikk
  const wins = historicalMatches.filter(m => m.result === "win").length;
  const draws = historicalMatches.filter(m => m.result === "draw").length;
  const losses = historicalMatches.filter(m => m.result === "loss").length;
  const goalsFor = historicalMatches.reduce((sum, m) => {
    const isHome = m.homeTeam.shortName === "K.I.L";
    return sum + (isHome ? m.homeScore : m.awayScore);
  }, 0);
  const goalsAgainst = historicalMatches.reduce((sum, m) => {
    const isHome = m.homeTeam.shortName === "K.I.L";
    return sum + (isHome ? m.awayScore : m.homeScore);
  }, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      day: "numeric",
      month: "short",
    });
  };

  return (
    <div className="px-4 space-y-6">
      {/* Next Match */}
      {nextMatch && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NextMatchCard match={nextMatch} />
        </motion.div>
      )}

      {/* Season Stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
            <Trophy className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-semibold text-text-primary">Sesong 2025 - 4. divisjon</h2>
        </div>
        <div className="grid grid-cols-4 gap-3 text-center">
          <div className="glass-surface rounded-xl p-3">
            <span className="text-2xl font-bold text-status-win">{wins}</span>
            <p className="text-xs text-text-muted mt-1">Sigrar</p>
          </div>
          <div className="glass-surface rounded-xl p-3">
            <span className="text-2xl font-bold text-status-draw">{draws}</span>
            <p className="text-xs text-text-muted mt-1">Uavgjort</p>
          </div>
          <div className="glass-surface rounded-xl p-3">
            <span className="text-2xl font-bold text-status-loss">{losses}</span>
            <p className="text-xs text-text-muted mt-1">Tap</p>
          </div>
          <div className="glass-surface rounded-xl p-3">
            <span className="text-2xl font-bold gradient-text">{goalsFor}-{goalsAgainst}</span>
            <p className="text-xs text-text-muted mt-1">Mål</p>
          </div>
        </div>
      </motion.div>

      {/* Last Match */}
      {lastMatch && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-secondary-light" />
            <h2 className="font-semibold text-text-primary">Siste kamp</h2>
          </div>
          <div 
            onClick={() => router.push(`/resultater/${lastMatch.id}`)}
            className="glass-card glass-card-hover p-5 cursor-pointer"
          >
            {/* Match Result */}
            <div className="flex items-center justify-between mb-4">
              {/* K.I.L */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden shadow-glass">
                  <Image
                    src="/images/kil-logo.png"
                    alt="K.I.L"
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-text-primary text-sm">K.I.L</span>
              </div>

              {/* Score */}
              <div className="flex flex-col items-center px-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-text-primary">
                    {lastMatch.homeTeam.shortName === "K.I.L" ? lastMatch.homeScore : lastMatch.awayScore}
                  </span>
                  <span className="text-xl text-text-muted">-</span>
                  <span className="text-3xl font-bold text-text-primary">
                    {lastMatch.homeTeam.shortName === "K.I.L" ? lastMatch.awayScore : lastMatch.homeScore}
                  </span>
                </div>
                <span
                  className={`mt-2 px-4 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                    lastMatch.result === "win" ? "badge-win" : 
                    lastMatch.result === "loss" ? "badge-loss" : 
                    "badge-draw"
                  }`}
                >
                  {getResultLabel(lastMatch.result)}
                </span>
              </div>

              {/* Opponent */}
              <div className="flex flex-col items-center gap-2 flex-1">
                <div className="w-14 h-14 rounded-full bg-secondary/30 backdrop-blur-sm border border-secondary/40 flex items-center justify-center shadow-glass">
                  <span className="text-lg font-bold text-secondary-light">
                    {(lastMatch.homeTeam.shortName === "K.I.L" 
                      ? lastMatch.awayTeam.shortName 
                      : lastMatch.homeTeam.shortName
                    ).substring(0, 3).toUpperCase()}
                  </span>
                </div>
                <span className="font-medium text-text-primary text-sm">
                  {lastMatch.homeTeam.shortName === "K.I.L" 
                    ? lastMatch.awayTeam.shortName 
                    : lastMatch.homeTeam.shortName}
                </span>
              </div>
            </div>

            {/* Match Info */}
            <div className="flex items-center justify-between text-sm text-text-muted border-t border-white/10 pt-3">
              <span>{formatDate(lastMatch.date)} • {lastMatch.venue}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Recent Results Title */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <h2 className="font-semibold text-text-primary">Siste resultat</h2>
        <button 
          onClick={() => router.push("/resultater")}
          className="text-primary text-sm font-medium hover:underline"
        >
          Sjå alle →
        </button>
      </motion.div>

      {/* Recent Matches List */}
      <div className="space-y-2">
        {recentMatches.slice(1).map((match, index) => {
          const isKilHome = match.homeTeam.shortName === "K.I.L";
          const kilScore = isKilHome ? match.homeScore : match.awayScore;
          const opponentScore = isKilHome ? match.awayScore : match.homeScore;
          const opponent = isKilHome ? match.awayTeam : match.homeTeam;

          return (
            <motion.div
              key={match.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              onClick={() => router.push(`/resultater/${match.id}`)}
              className="flex items-center gap-3 p-3 glass-card glass-card-hover cursor-pointer"
            >
              {/* Result indicator */}
              <div 
                className={`w-1.5 h-10 rounded-full ${
                  match.result === "win" ? "bg-gradient-to-b from-status-win to-status-win/50" : 
                  match.result === "loss" ? "bg-gradient-to-b from-status-loss to-status-loss/50" : 
                  "bg-gradient-to-b from-status-draw to-status-draw/50"
                }`}
              />
              
              {/* Match info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-text-primary">K.I.L</span>
                  <span className="text-primary font-bold">{kilScore} - {opponentScore}</span>
                  <span className="font-medium text-text-primary truncate">{opponent.shortName}</span>
                </div>
                <span className="text-xs text-text-muted">{formatDate(match.date)}</span>
              </div>

              <ChevronRight className="w-4 h-4 text-text-muted flex-shrink-0" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
