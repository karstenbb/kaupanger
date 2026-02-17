"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Match } from "@/types";
import { getCountdown } from "@/lib/utils";
import { MapPin, ExternalLink } from "lucide-react";
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

  const handleClick = () => {
    if (match.fiksId) {
      window.open(`https://www.fotball.no/fotballdata/kamp/?fiksId=${match.fiksId}`, "_blank");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={handleClick}
      className="relative overflow-hidden rounded-3xl glass-card cursor-pointer active:scale-[0.99]"
    >
      {/* Header with live indicator */}
      <div className="flex items-center justify-between p-4 md:p-5 lg:p-6 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm font-semibold text-primary uppercase tracking-wide">
            Neste Kamp
          </span>
          {weatherLoading ? (
            <span className="text-xs text-text-secondary">Lastar vêr...</span>
          ) : weather ? (
            <span className="flex items-center gap-1 text-xs md:text-sm text-accent">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              <span>{getWeatherEmoji(weather.symbolCode)}</span>
              <span>{weather.temperature}°C</span>
            </span>
          ) : null}
        </div>
        <span className="px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 text-primary text-xs md:text-sm font-medium">
          {isHome ? "Hjemme" : "Borte"}
        </span>
      </div>

      {/* Teams */}
      <div className="flex items-center justify-center gap-6 md:gap-10 lg:gap-12 py-6 md:py-8 lg:py-10 px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
            {match.homeTeam.logo ? (
              <Image
                src={match.homeTeam.logo}
                alt={match.homeTeam.name}
                width={112}
                height={112}
                className="object-contain"
              />
            ) : (
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-text-primary">
                {match.homeTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm md:text-base lg:text-lg font-medium text-text-primary">{match.homeTeam.shortName}</span>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text">VS</span>
        </div>

        <div className="flex flex-col items-center gap-2 md:gap-3">
          <div className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center overflow-hidden">
            {match.awayTeam.logo ? (
              <Image
                src={match.awayTeam.logo}
                alt={match.awayTeam.name}
                width={112}
                height={112}
                className="object-contain"
              />
            ) : (
              <span className="text-xl md:text-2xl lg:text-3xl font-bold text-secondary-light">
                {match.awayTeam.shortName.substring(0, 3).toUpperCase()}
              </span>
            )}
          </div>
          <span className="text-sm md:text-base lg:text-lg font-medium text-text-primary">{match.awayTeam.shortName}</span>
        </div>
      </div>

      {/* Countdown */}
      <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6">
        <CountdownUnit value={countdown.days} label="DAGER" />
        <CountdownUnit value={countdown.hours} label="TIMER" />
        <CountdownUnit value={countdown.minutes} label="MIN" />
      </div>

      {/* Venue */}
      <div className="flex items-center justify-center gap-2 px-4 md:px-6 lg:px-8 pb-4 md:pb-5 lg:pb-6 text-secondary-light text-sm md:text-base">
        <MapPin className="w-4 h-4 md:w-5 md:h-5" />
        <span>{match.venue}</span>
        <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-primary/60" />
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
        className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      >
        <span className="text-2xl md:text-3xl lg:text-4xl font-bold gradient-text">
          {String(value).padStart(2, "0")}
        </span>
      </motion.div>
      <span className="text-xs md:text-sm text-text-secondary mt-1">{label}</span>
    </div>
  );
}
