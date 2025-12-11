"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function Header({ title, subtitle, showLogo = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4">
      <div className="flex items-center gap-3">
        {showLogo && (
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-white flex items-center justify-center">
            <Image
              src="/images/kil-logo.png"
              alt="K.I.L Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h1 className="text-xl font-bold text-text-primary">{title}</h1>
          {subtitle && (
            <p className="text-xs text-text-secondary">{subtitle}</p>
          )}
        </div>
      </div>
      <Button variant="ghost" size="icon" className="text-text-secondary">
        <Menu className="w-5 h-5" />
      </Button>
    </header>
  );
}
