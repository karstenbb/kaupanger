"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, Loader2, Plus } from "lucide-react";
import { ResultCard } from "@/components/results/result-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useHistoricalMatches, useSeasons } from "@/lib/api";
import { useAppStore } from "@/lib/store";

export function ResultaterContent() {
  const { selectedSeason, setSelectedSeason } = useAppStore();
  const { data: seasons } = useSeasons();
  const { data: results, isLoading } = useHistoricalMatches(selectedSeason);

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background-card to-background-elevated border-2 border-primary/30 flex items-center justify-center p-1">
          <Image
            src="/images/kil-logo.png"
            alt="K.I.L Logo"
            width={72}
            height={72}
            className="rounded-full object-contain"
          />
        </div>
        <h1 className="text-xl font-bold text-text-primary mt-4">K.I.L Fotball</h1>
        <p className="text-sm text-text-secondary uppercase tracking-wide">
          Resultater 4. divisjon
        </p>
      </div>

      {/* Season Selector */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-text-secondary">
          <Calendar className="w-4 h-4" />
        </div>
        <Select value={selectedSeason} onValueChange={setSelectedSeason}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Velg sesong" />
          </SelectTrigger>
          <SelectContent>
            {seasons?.map((season) => (
              <SelectItem key={season.id} value={season.id}>
                {season.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Results List */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center py-12"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </motion.div>
        ) : results && results.length > 0 ? (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {results.map((match, index) => (
              <ResultCard key={match.id} match={match} index={index} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-text-secondary">Ingen resultat for denne sesongen</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-24 right-4 max-w-lg mx-auto">
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-elevated"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
