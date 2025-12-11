"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Match } from "@/types";
import { cn, getCountdown } from "@/lib/utils";
import { MapPin } from "lucide-react";
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
      className="relative overflow-hidden rounded-3xl glass-card"
    >
      {/* Header with live indicator */}
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary uppercase tracking-wide">
            Neste Kamp
          </span>
          {weatherLoading ? (
            <span className="text-xs text-text-secondary">Lastar vêr...</span>
          ) : weather ? (
            <span className="flex items-center gap-1 text-xs text-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>{getWeatherEmoji(weather.symbolCode)}</span>
              <span>{weather.temperature}°C</span>
            </span>
          ) : null}
        </div>
        <span className="px-3 py-1 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs font-medium">
          {isHome ? "Hjemme" : "Borte"}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-6 py-6 px-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
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
          <span className="text-3xl font-bold gradient-text">VS</span>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center overflow-hidden">
            {match.awayTeam.logo ? (
              <Image
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                width={56}
                height={56}
                className="object-contain"
              />
            ) : (
              <span className="text-xl font-bold text-secondary-light">
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

      {/* Venue */}
      <div className="flex items-center justify-center gap-2 px-4 pb-4 text-secondary-light text-sm">
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
        className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      >
        <span className="text-2xl font-bold gradient-text">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs text-text-secondary mt-1">{label}</span>
    </div>
  );
}
