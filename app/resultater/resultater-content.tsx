"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Filter, Loader2, Plus, Share2, ExternalLink, Trophy, X } from "lucide-react";
import { useState } from "react";
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
  const [fabOpen, setFabOpen] = useState(false);

  const handleShare = async () => {
    setFabOpen(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "K.I.L Fotball - Resultater",
          text: `Sjekk ut resultata til Kaupanger IL i ${selectedSeason}!`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Lenke kopiert til utklippstavla!");
    }
  };

  const handleOpenFotballNo = () => {
    setFabOpen(false);
    window.open("https://www.fotball.no/fotballdata/lag/kamper-og-resultater/?fiksId=192266", "_blank");
  };

  const handleOpenTable = () => {
    setFabOpen(false);
    window.open("https://www.fotball.no/fotballdata/turnering/tabell/?fiksId=189466", "_blank");
  };

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
      <div className="fixed bottom-24 right-4 z-50">
        <AnimatePresence>
          {fabOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-background/60 backdrop-blur-sm"
                onClick={() => setFabOpen(false)}
              />
              
              {/* Menu items */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-16 right-0 flex flex-col gap-3 items-end"
              >
                <button
                  onClick={handleShare}
                  className="flex items-center gap-3 glass-card px-4 py-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary">Del resultata</span>
                  <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                    <Share2 className="w-5 h-5 text-secondary-light" />
                  </div>
                </button>
                
                <button
                  onClick={handleOpenTable}
                  className="flex items-center gap-3 glass-card px-4 py-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary">Sjå tabellen</span>
                  <div className="w-10 h-10 rounded-full bg-accent/30 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-accent" />
                  </div>
                </button>
                
                <button
                  onClick={handleOpenFotballNo}
                  className="flex items-center gap-3 glass-card px-4 py-3 rounded-full hover:bg-white/20 transition-colors"
                >
                  <span className="text-sm font-medium text-text-primary">Opna fotball.no</span>
                  <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-primary" />
                  </div>
                </button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
        
        {/* FAB Button */}
        <motion.div
          animate={{ rotate: fabOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            size="icon"
            onClick={() => setFabOpen(!fabOpen)}
            className="w-14 h-14 rounded-full shadow-glass bg-gradient-to-br from-primary to-primary-light hover:opacity-90 transition-opacity"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
