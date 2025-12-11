"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Match } from "@/types";
import { cn, getCountdown } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MapPin, Ticket } from "lucide-react";
import { useWeather } from "@/lib/api";
import { getWeatherEmoji } from "@/types/weather";

interface NextMatchCardProps {
  match: Match;
}

export function NextMatchCard({ match }: NextMatchCardProps) {
  const [countdown, setCountdown] = useState(getCountdown(`${match.date}T${match.time}`));
  const { data: weather, isLoading: weatherLoading } = useWeather();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown(`${match.date}T${match.time}`));
    }, 1000);

    return () => clearInterval(timer);
  }, [match.date, match.time]);

  const isHome = match.location === "home";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background-card to-background-elevated border border-surface-border"
    >
      {/* Header with live indicator */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-primary uppercase tracking-wide">
            Neste Kamp
          </span>
          {weatherLoading ? (
            <span className="text-xs text-text-secondary">Lastar vêr...</span>
          ) : weather ? (
            <span className="flex items-center gap-1 text-xs text-status-win">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-status-win opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-status-win"></span>
              </span>
              <span>{getWeatherEmoji(weather.symbolCode)}</span>
              <span>{weather.temperature}°C</span>
            </span>
          ) : null}
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
          {isHome ? "Hjemme" : "Borte"}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-6 py-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {match.homeTeam.logo ? (
              <Image
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-text-primary">
                {match.homeTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-text-primary">{match.homeTeam.shortName}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-3xl font-bold text-primary">VS</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-accent-cyan/20 flex items-center justify-center overflow-hidden">
            {match.awayTeam.logo ? (
              <Image
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-accent-cyan">
                {match.awayTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-text-primary">{match.awayTeam.shortName}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="flex justify-center gap-4 px-4 pb-4">
        <CountdownUnit value={countdown.days} label="DAGER" />
        <CountdownUnit value={countdown.hours} label="TIMER" />
        <CountdownUnit value={countdown.minutes} label="MIN" />
      </div>

      {/* Buy tickets button */}
      {match.ticketUrl && (
        <div className="px-4 pb-4">
          <Button className="w-full gap-2" size="lg">
            <Ticket className="w-4 h-4" />
            Kjøp Billetter
          </Button>
        </div>
      )}

      {/* Venue */}
      <div className="flex items-center justify-center gap-2 px-4 pb-4 text-text-secondary text-sm">
        <MapPin className="w-4 h-4" />
        <span>{match.venue}</span>
      </div>
    </motion.div>
  );
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        key={value}
        initial={{ scale: 1.1, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-16 h-16 rounded-xl bg-surface flex items-center justify-center"
      >
        <span className="text-2xl font-bold text-text-primary">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-text-secondary mt-1">{label}</span>
    </div>
  );
}
