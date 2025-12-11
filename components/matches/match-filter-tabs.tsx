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
            "relative",
            filter === f.value && "bg-surface border-surface-light"
          )}
        >
          {f.label}
          {filter === f.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-surface rounded-lg -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
        </Button>
      ))}
    </div>
  );
}
