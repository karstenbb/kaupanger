"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlayerSection } from "@/components/roster/player-section";
import { StaffCard } from "@/components/roster/staff-card";
import { usePlayersByPosition, useStaff } from "@/lib/api";
import { Button } from "@/components/ui/button";

export function TroppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: playersByPosition, isLoading: playersLoading } = usePlayersByPosition();
  const { data: staffData, isLoading: staffLoading } = useStaff();

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center pt-4 pb-2">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-background-card to-background-elevated border-2 border-primary/30 flex items-center justify-center">
            <div className="text-center">
              <span className="text-xs text-accent-cyan font-medium">2024</span>
              <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center mt-1">
                <span className="text-sm font-bold text-primary">K.I.L</span>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold text-text-primary mt-4">K.I.L Fotball</h1>
        <p className="text-sm text-text-secondary">Troppen</p>
        
        {/* Menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 text-text-muted"
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
        <input
          type="text"
          placeholder="Søk etter navn eller nr"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface border border-surface-border text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="players" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="players">Spillere</TabsTrigger>
          <TabsTrigger value="staff">Trenere</TabsTrigger>
        </TabsList>

        <TabsContent value="players">
          <AnimatePresence mode="wait">
            {playersLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </motion.div>
            ) : playersByPosition ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <PlayerSection
                  title="Keepere"
                  players={playersByPosition.keepers}
                  startIndex={0}
                />
                <PlayerSection
                  title="Forsvarere"
                  players={playersByPosition.defenders}
                  startIndex={playersByPosition.keepers.length}
                />
                <PlayerSection
                  title="Midtbanespillere"
                  players={playersByPosition.midfielders}
                  startIndex={playersByPosition.keepers.length + playersByPosition.defenders.length}
                />
                <PlayerSection
                  title="Angripere"
                  players={playersByPosition.forwards}
                  startIndex={
                    playersByPosition.keepers.length +
                    playersByPosition.defenders.length +
                    playersByPosition.midfielders.length
                  }
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </TabsContent>

        <TabsContent value="staff">
          <AnimatePresence mode="wait">
            {staffLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center py-12"
              >
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </motion.div>
            ) : staffData ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                  Trenerteamet
                </h3>
                <div className="space-y-2">
                  {staffData.map((member, index) => (
                    <StaffCard key={member.id} staff={member} index={index} />
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </TabsContent>
      </Tabs>
    </div>
  );
}
