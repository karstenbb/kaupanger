"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Target, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePlayerById } from "@/lib/api";
import { Loader2 } from "lucide-react";

interface PlayerDetailContentProps {
  playerId: string;
}

export function PlayerDetailContent({ playerId }: PlayerDetailContentProps) {
  const router = useRouter();
  const { data: player, isLoading } = usePlayerById(playerId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!player) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-text-secondary">Fann ikkje spelaren</p>
        <Button onClick={() => router.back()}>Tilbake</Button>
      </div>
    );
  }

  const positionColors: Record<string, string> = {
    keeper: "from-primary/30 to-primary-light/20",
    defender: "from-secondary/30 to-secondary-light/20",
    midfielder: "from-accent/30 to-accent-light/20",
    forward: "from-primary/30 to-secondary/20",
  };

  const positionTextColors: Record<string, string> = {
    keeper: "text-primary",
    defender: "text-secondary-light",
    midfielder: "text-accent",
    forward: "text-primary",
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Header */}
      <div className="relative">
        <div className={`h-48 bg-gradient-to-br ${positionColors[player.position] || "from-primary/20 to-primary-light/20"}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
        
        {/* Back button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="absolute top-4 left-4 bg-background/50 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>

        {/* Player number badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center border-4 border-background shadow-glass">
            <span className="text-4xl font-bold text-background">#{player.number}</span>
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="px-4 pt-16">
        {/* Name and position */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h1 className="text-2xl font-bold gradient-text">
            {player.firstName} {player.lastName}
          </h1>
          <p className={`text-sm font-medium mt-1 ${positionTextColors[player.position] || "text-primary"}`}>
            {player.positionLabel}
          </p>
          {player.isInjured && (
            <div className="flex items-center justify-center gap-1 mt-2 text-status-injured">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">{player.injuryNote || "Skadet"}</span>
            </div>
          )}
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 gap-4 mb-8"
        >
          <StatCard
            icon={<Calendar className="w-5 h-5" />}
            label="Kampar"
            value={player.appearances ?? 0}
            color="text-secondary-light"
          />
          <StatCard
            icon={<Target className="w-5 h-5" />}
            label="Mål"
            value={player.goals ?? 0}
            color="text-accent"
          />
          <StatCard
            icon={<div className="w-4 h-5 bg-primary rounded-sm" />}
            label="Gule kort"
            value={player.yellowCards ?? 0}
            color="text-primary"
          />
          <StatCard
            icon={<div className="w-4 h-5 bg-red-500 rounded-sm" />}
            label="Raude kort"
            value={player.redCards ?? 0}
            color="text-red-500"
          />
        </motion.div>

        {/* Stats breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-lg font-semibold gradient-text">Sesongstatistikk 2025</h2>
          
          <div className="glass-card rounded-2xl p-4 space-y-4">
            <StatRow label="Kampar spelt" value={player.appearances ?? 0} />
            <StatRow label="Mål skora" value={player.goals ?? 0} />
            <StatRow 
              label="Mål per kamp" 
              value={player.appearances && player.appearances > 0 
                ? ((player.goals ?? 0) / player.appearances).toFixed(2) 
                : "0.00"
              } 
            />
            <StatRow label="Gule kort" value={player.yellowCards ?? 0} />
            <StatRow label="Raude kort" value={player.redCards ?? 0} />
          </div>
        </motion.div>

        {/* Position info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <h2 className="text-lg font-semibold gradient-text mb-4">Spelarinfo</h2>
          
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Draktnummer</span>
              <span className="text-text-primary font-medium">#{player.number}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Posisjon</span>
              <span className={`font-medium ${positionTextColors[player.position] || "text-primary"}`}>
                {player.positionLabel}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Klubb</span>
              <span className="text-text-primary font-medium">K.I.L</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  color: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2">
      <div className={color}>{icon}</div>
      <span className="text-3xl font-bold text-text-primary">{value}</span>
      <span className="text-xs text-text-muted uppercase tracking-wide">{label}</span>
    </div>
  );
}

function StatRow({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-text-secondary">{label}</span>
      <span className="text-text-primary font-semibold">{value}</span>
    </div>
  );
}
