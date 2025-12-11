"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, User, Briefcase, MapPin, Loader2, ExternalLink } from "lucide-react";
import { useStaffById } from "@/lib/api";
import { Button } from "@/components/ui/button";

interface StaffDetailContentProps {
  staffId: string;
}

export function StaffDetailContent({ staffId }: StaffDetailContentProps) {
  const { data: staff, isLoading } = useStaffById(staffId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!staff) {
    return (
      <div className="px-4 py-8 text-center">
        <p className="text-text-secondary">Fann ikkje denne personen</p>
        <Link href="/tropp">
          <Button variant="outline" className="mt-4">
            Tilbake til tropp
          </Button>
        </Link>
      </div>
    );
  }

  const roleColor = staff.role === "head_coach" ? "from-primary to-primary-light" : "from-accent-cyan to-accent-teal";

  return (
    <div className="px-4 space-y-6 pb-8">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="pt-4"
      >
        <Link href="/tropp" className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Tilbake til tropp</span>
        </Link>
      </motion.div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col items-center text-center"
      >
        {/* Avatar */}
        <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${roleColor} p-1`}>
          <div className="w-full h-full rounded-full bg-background-card flex items-center justify-center overflow-hidden">
            {staff.image ? (
              <img
                src={staff.image}
                alt={`${staff.firstName} ${staff.lastName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-text-muted" />
            )}
          </div>
        </div>

        {/* Name */}
        <h1 className="text-2xl font-bold text-text-primary mt-4">
          {staff.firstName} {staff.lastName}
        </h1>

        {/* Role Badge */}
        <div className={`mt-2 px-4 py-1.5 rounded-full bg-gradient-to-r ${roleColor}`}>
          <span className="text-sm font-semibold text-white">{staff.roleLabel}</span>
        </div>
      </motion.div>

      {/* Roles Section */}
      {staff.roles && staff.roles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          <h2 className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Aktive Roller
          </h2>
          
          <div className="space-y-2">
            {staff.roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.05 }}
                className="p-4 rounded-xl bg-background-card border border-surface-border"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-text-primary">{role.title}</h3>
                    {role.team && (
                      <p className="text-sm text-accent-cyan">{role.team}</p>
                    )}
                    <div className="flex items-center gap-1 text-sm text-text-secondary">
                      <MapPin className="w-3 h-3" />
                      <span>{role.club}</span>
                    </div>
                    <p className="text-xs text-text-muted">{role.krets}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* External Link to fotball.no */}
      {staff.fiksId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href={`https://www.fotball.no/fotballdata/person/profil/?fiksId=${staff.fiksId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-surface border border-surface-border hover:border-primary transition-colors text-text-secondary hover:text-primary"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm font-medium">Sjå profil på fotball.no</span>
          </a>
        </motion.div>
      )}
    </div>
  );
}
