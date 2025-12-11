"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, MapPin, Calendar, ExternalLink, Users } from "lucide-react";
import { historicalMatches } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { getResultLabel } from "@/lib/utils";

export default function MatchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.id as string;
  
  const match = historicalMatches.find(m => m.id === matchId);
  
  if (!match) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary mb-2">Kamp ikkje funnen</h1>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Tilbake
          </Button>
        </div>
      </div>
    );
  }

  const isKilHome = match.homeTeam.shortName === "K.I.L";
  const kilScore = isKilHome ? match.homeScore : match.awayScore;
  const opponentScore = isKilHome ? match.awayScore : match.homeScore;
  const opponent = isKilHome ? match.awayTeam : match.homeTeam;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nb-NO", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const fiksUrl = match.fiksId 
    ? `https://www.fotball.no/fotballdata/kamp/?fiksId=${match.fiksId}`
    : null;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Tilbake</span>
          </button>
          {fiksUrl && (
            <a
              href={fiksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-secondary-light hover:text-primary transition-colors text-sm"
            >
              <span>fotball.no</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Match Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          {/* Date & Venue */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-secondary-light mb-1">
              <Calendar className="w-4 h-4" />
              <span className="text-sm capitalize">{formatDate(match.date)}</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-text-muted">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{match.venue}</span>
            </div>
          </div>

          {/* Teams & Score */}
          <div className="flex items-center justify-between">
            {/* K.I.L */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/kil-logo.png"
                  alt="K.I.L"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <span className="font-semibold text-text-primary">K.I.L</span>
            </div>

            {/* Score */}
            <div className="flex flex-col items-center px-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold gradient-text">{kilScore}</span>
                <span className="text-2xl text-text-muted">-</span>
                <span className="text-4xl font-bold text-text-primary">{opponentScore}</span>
              </div>
              {match.halfTimeHome !== undefined && match.halfTimeAway !== undefined && (
                <span className="text-xs text-text-muted mt-1">
                  Pause: {isKilHome ? match.halfTimeHome : match.halfTimeAway} - {isKilHome ? match.halfTimeAway : match.halfTimeHome}
                </span>
              )}
              <span
                className={`mt-3 px-4 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                  match.result === "win" ? "badge-win" : 
                  match.result === "loss" ? "badge-loss" : 
                  "badge-draw"
                }`}
              >
                {getResultLabel(match.result)}
              </span>
            </div>

            {/* Opponent */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center">
                <span className="text-xl font-bold text-secondary-light">
                  {opponent.shortName.substring(0, 3).toUpperCase()}
                </span>
              </div>
              <span className="font-semibold text-text-primary">{opponent.shortName}</span>
            </div>
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold gradient-text">Kampinfo</h2>
          </div>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Turnering</span>
              <span className="text-text-primary">4. divisjon Menn</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Sesong</span>
              <span className="text-text-primary">{match.season}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Kamp</span>
              <span className="text-text-primary">{match.venueType === "home" ? "Heimekamp" : "Bortekamp"}</span>
            </div>
          </div>
        </motion.div>

        {/* External Link Button */}
        {fiksUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-3"
          >
            <a
              href={fiksUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-primary to-primary-light hover:opacity-90 rounded-2xl text-background font-semibold transition-all shadow-glass"
            >
              <Users className="w-5 h-5" />
              <span>Sjå lagoppstilling og målscorarar</span>
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-text-muted">
              Opnar fotball.no med full kampinfo, lagoppstilling og hendingar
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
