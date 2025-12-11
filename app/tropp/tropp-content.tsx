"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, Loader2, Share2, RefreshCw, ExternalLink } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlayerSection } from "@/components/roster/player-section";
import { StaffCard } from "@/components/roster/staff-card";
import { usePlayersByPosition, useStaff } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Player } from "@/types";

function filterPlayers(players: Player[], query: string): Player[] {
  if (!query.trim()) return players;
  const lowerQuery = query.toLowerCase();
  return players.filter(
    (player) =>
      player.firstName.toLowerCase().includes(lowerQuery) ||
      player.lastName.toLowerCase().includes(lowerQuery) ||
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(lowerQuery) ||
      player.number.toString().includes(query)
  );
}

export function TroppContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: playersByPosition, isLoading: playersLoading, refetch: refetchPlayers } = usePlayersByPosition();
  const { data: staffData, isLoading: staffLoading, refetch: refetchStaff } = useStaff();

  const filteredPlayers = useMemo(() => {
    if (!playersByPosition) return null;
    return {
      keepers: filterPlayers(playersByPosition.keepers, searchQuery),
      defenders: filterPlayers(playersByPosition.defenders, searchQuery),
      midfielders: filterPlayers(playersByPosition.midfielders, searchQuery),
      forwards: filterPlayers(playersByPosition.forwards, searchQuery),
    };
  }, [playersByPosition, searchQuery]);

  const totalResults = filteredPlayers
    ? filteredPlayers.keepers.length +
      filteredPlayers.defenders.length +
      filteredPlayers.midfielders.length +
      filteredPlayers.forwards.length
    : 0;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "K.I.L Fotball - Troppen",
          text: "Sjekk ut troppen til Kaupanger IL!",
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Lenke kopiert til utklippstavla!");
    }
  };

  const handleRefresh = () => {
    refetchPlayers();
    refetchStaff();
  };

  const handleOpenFotballNo = () => {
    window.open("https://www.fotball.no/fotballdata/lag/hjem/?fiksId=192266", "_blank");
  };

  return (
    <div className="px-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center pt-4 pb-2 relative">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border-2 border-primary/40 flex items-center justify-center p-1 shadow-glass">
            <Image
              src="/images/kil-logo.png"
              alt="K.I.L Logo"
              width={72}
              height={72}
              className="rounded-full object-contain"
            />
          </div>
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-xs text-primary font-semibold bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-full border border-primary/30">2025</span>
        </div>
        <h1 className="text-xl font-bold gradient-text mt-4">K.I.L Fotball</h1>
        <p className="text-sm text-text-secondary">Troppen</p>
        
        {/* Menu button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 right-0 text-text-muted hover:text-text-primary"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleShare} className="cursor-pointer">
              <Share2 className="w-4 h-4 mr-2" />
              Del troppen
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRefresh} className="cursor-pointer">
              <RefreshCw className="w-4 h-4 mr-2" />
              Oppdater data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleOpenFotballNo} className="cursor-pointer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Sjå på fotball.no
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-light" />
        <input
          type="text"
          placeholder="Søk etter namn eller nr"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full h-11 pl-11 pr-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/20 text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 text-sm transition-all"
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
            ) : filteredPlayers ? (
              <motion.div
                key="content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {searchQuery && (
                  <p className="text-sm text-text-secondary">
                    {totalResults} {totalResults === 1 ? "resultat" : "resultat"} for "{searchQuery}"
                  </p>
                )}
                {filteredPlayers.keepers.length > 0 && (
                  <PlayerSection
                    title="Keepere"
                    players={filteredPlayers.keepers}
                    startIndex={0}
                  />
                )}
                {filteredPlayers.defenders.length > 0 && (
                  <PlayerSection
                    title="Forsvarere"
                    players={filteredPlayers.defenders}
                    startIndex={filteredPlayers.keepers.length}
                  />
                )}
                {filteredPlayers.midfielders.length > 0 && (
                  <PlayerSection
                    title="Midtbanespillere"
                    players={filteredPlayers.midfielders}
                    startIndex={filteredPlayers.keepers.length + filteredPlayers.defenders.length}
                  />
                )}
                {filteredPlayers.forwards.length > 0 && (
                  <PlayerSection
                    title="Angripere"
                    players={filteredPlayers.forwards}
                    startIndex={
                      filteredPlayers.keepers.length +
                      filteredPlayers.defenders.length +
                      filteredPlayers.midfielders.length
                    }
                  />
                )}
                {totalResults === 0 && searchQuery && (
                  <div className="text-center py-12">
                    <p className="text-text-secondary">Ingen spelarar funne for "{searchQuery}"</p>
                  </div>
                )}
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
