"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, Users, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/" as const, label: "Heim", icon: Home },
  { href: "/kamper" as const, label: "Kamper", icon: Calendar },
  { href: "/tropp" as const, label: "Tropp", icon: Users },
  { href: "/resultater" as const, label: "Resultat", icon: Trophy },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop/Tablet Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-20 lg:w-24 z-50 flex-col items-center py-6 gap-4">
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent backdrop-blur-xl" />
        <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-1.5 w-14 lg:w-16 h-14 lg:h-16 rounded-xl",
                "transition-all duration-200",
                isActive && "bg-primary/10 border border-primary/20"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6 lg:w-7 lg:h-7 transition-colors",
                  isActive ? "text-primary" : "text-text-muted"
                )}
              />
              <span
                className={cn(
                  "text-[10px] lg:text-xs font-medium transition-colors",
                  isActive ? "text-text-primary" : "text-text-muted"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-area-pb">
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/80 to-transparent backdrop-blur-xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="relative flex items-center justify-around h-16 max-w-lg mx-auto px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-16 h-full relative",
                  "transition-colors duration-200"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isActive ? "text-primary" : "text-text-muted"
                  )}
                />
                <span
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isActive ? "text-text-primary" : "text-text-muted"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
