"use client";

import { motion } from "framer-motion";
import { Staff } from "@/types";
import { ChevronRight } from "lucide-react";

interface StaffCardProps {
  staff: Staff;
  index: number;
}

export function StaffCard({ staff, index }: StaffCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-3 rounded-xl bg-background-card border border-surface-border hover:border-surface-light transition-all cursor-pointer group"
    >
      <div className="flex items-center gap-3">
        {/* Staff Image */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary-dark/30 flex items-center justify-center overflow-hidden">
          {staff.image ? (
            <img
              src={staff.image}
              alt={`${staff.firstName} ${staff.lastName}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-lg font-bold text-primary">
              {staff.firstName[0]}{staff.lastName[0]}
            </span>
          )}
        </div>

        {/* Staff Info */}
        <div className="flex flex-col">
          <span className="font-semibold text-text-primary">
            {staff.firstName} {staff.lastName}
          </span>
          <span className="text-sm text-text-secondary">{staff.roleLabel}</span>
        </div>
      </div>

      {/* Arrow */}
      <ChevronRight className="w-5 h-5 text-text-muted group-hover:text-text-secondary transition-colors" />
    </motion.div>
  );
}
