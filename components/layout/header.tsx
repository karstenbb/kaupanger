"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, Home, Users, Trophy, Calendar, ExternalLink, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  subtitle?: string;
  showLogo?: boolean;
}

export function Header({ title, subtitle, showLogo = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between p-4 md:p-6 lg:p-8">
      <div className="flex items-center gap-3 md:gap-4">
        {showLogo && (
          <div className="w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Image
              src="/images/kil-logo.png"
              alt="K.I.L Logo"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>
        )}
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold gradient-text">{title}</h1>
          {subtitle && (
            <p className="text-xs md:text-sm text-text-secondary">{subtitle}</p>
          )}
        </div>
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="text-text-secondary hover:text-primary hover:bg-primary/10 transition-colors">
            <Menu className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 glass-card border-white/20">
          <DropdownMenuLabel className="text-primary text-xs font-semibold">Navigasjon</DropdownMenuLabel>
          <DropdownMenuItem asChild>
            <Link href="/" className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10">
              <Home className="w-4 h-4 text-primary" />
              <span>Heim</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/kamper" className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10">
              <Calendar className="w-4 h-4 text-secondary-light" />
              <span>Kampar</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/tropp" className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10">
              <Users className="w-4 h-4 text-accent" />
              <span>Tropp</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/resultater" className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10">
              <Trophy className="w-4 h-4 text-primary" />
              <span>Resultat</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuLabel className="text-secondary-light text-xs font-semibold">Eksterne lenker</DropdownMenuLabel>
          
          <DropdownMenuItem asChild>
            <a 
              href="https://www.fotball.no/fotballdata/lag/hjem/?fiksId=192266" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <ExternalLink className="w-4 h-4 text-secondary-light" />
              <span>Kaupanger på fotball.no</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a 
              href="https://www.instagram.com/kaupangeril/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <Instagram className="w-4 h-4 text-pink-400" />
              <span>Instagram</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a 
              href="https://www.facebook.com/kaupangeril" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <Facebook className="w-4 h-4 text-blue-400" />
              <span>Facebook</span>
            </a>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-white/20" />
          <DropdownMenuLabel className="text-accent text-xs font-semibold">Kontakt</DropdownMenuLabel>
          
          <DropdownMenuItem asChild>
            <a 
              href="mailto:post@kaupanger-il.no" 
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <Mail className="w-4 h-4 text-accent" />
              <span>post@kaupanger-il.no</span>
            </a>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <a 
              href="https://maps.google.com/?q=Kaupanger+Idrettspark" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 cursor-pointer hover:bg-white/10 focus:bg-white/10"
            >
              <MapPin className="w-4 h-4 text-accent" />
              <span>Kaupanger Idrettspark</span>
            </a>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
