"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Match, MatchFilter } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MatchFilterTabsProps {
  filter: MatchFilter;
  onFilterChange: (filter: MatchFilter) => void;
}

const filters: { value: MatchFilter; label: string }[] = [
  { value: "all", label: "Alle Kamper" },
  { value: "home", label: "Hjemme" },
  { value: "away", label: "Borte" },
];

export function MatchFilterTabs({ filter, onFilterChange }: MatchFilterTabsProps) {
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Button
          key={f.value}
          variant={filter === f.value ? "secondary" : "outline"}
          size="sm"
          onClick={() => onFilterChange(f.value)}
          className={cn(
            "relative backdrop-blur-sm transition-all",
            filter === f.value 
              ? "bg-primary/20 border-primary/40 text-primary" 
              : "bg-white/5 border-white/20 text-text-secondary hover:bg-white/10 hover:text-text-primary"
          )}
        >
          {f.label}
          {filter === f.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg -z-10 border border-primary/30"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
