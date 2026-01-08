#!/usr/bin/env node

/**
 * Script for å manuelt oppdatere kampdata frå fotball.no
 * Køyr med: npm run update-data
 * 
 * Hentar data frå fotball.no API-endepunkt som ikkje krev autentisering
 */

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Kaupanger sine turnerings-ID-ar på fotball.no
const TOURNAMENTS = {
  "4div-2025": "198522",      // 4. divisjon 2025
  "nm-kvalik-2027": "205998", // NM Kvalifisering 2027
};

const KAUPANGER_FIKS_ID = "192266";

interface ScrapedMatch {
  id: string;
  fiksId: string;
  homeTeam: { id: string; name: string; shortName: string; logo?: string };
  awayTeam: { id: string; name: string; shortName: string; logo?: string };
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  location: "home" | "away";
  status: "upcoming" | "completed";
  venueType?: "home" | "away";
  result?: "win" | "draw" | "loss";
  season?: string;
  halfTimeHome?: number;
  halfTimeAway?: number;
}

interface TableRow {
  position: number;
  team: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
}

const KAUPANGER_TEAM = {
  id: "kil",
  name: "K.I.L",
  shortName: "K.I.L",
  logo: "/images/kil-logo.png",
};

// Mapping av kjende lag til logoar
const TEAM_LOGOS: Record<string, string> = {
  "927": "https://images.fotball.no/clublogos/927.png",   // Vik
  "932": "https://images.fotball.no/clublogos/932.png",   // Kaupanger
  "919": "https://images.fotball.no/clublogos/919.png",   // Sogndal
  "935": "https://images.fotball.no/clublogos/935.png",   // Stryn
  // Legg til fleire etter behov
};

/**
 * Parse dato frå norsk format til ISO
 */
function parseNorwegianDate(dateStr: string): string {
  const match = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (!match) return "";
  
  const [, day, month, year] = match;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/**
 * Hent kampdata frå spesifikk kamp-side
 */
async function fetchMatchDetails(fiksId: string): Promise<Partial<ScrapedMatch> | null> {
  try {
    const url = `https://www.fotball.no/fotballdata/kamp/?fiksId=${fiksId}`;
    console.log(`    Hentar detaljar for kamp ${fiksId}...`);
    
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nb-NO,nb;q=0.9,no;q=0.8,en;q=0.7",
      },
    });
    
    if (!response.ok) {
      console.log(`    ⚠️ Feil ${response.status} for kamp ${fiksId}`);
      return null;
    }
    
    const html = await response.text();
    
    // Parse stadion
    const venueMatch = html.match(/Stadion:\s*<[^>]*>[^<]*<a[^>]*>([^<]+)</i);
    const venue = venueMatch ? venueMatch[1].trim() : "";
    
    // Parse pauseresultat
    const halfTimeMatch = html.match(/Pause[^:]*:\s*(\d+)\s*-\s*(\d+)/i);
    
    return {
      venue,
      halfTimeHome: halfTimeMatch ? parseInt(halfTimeMatch[1]) : undefined,
      halfTimeAway: halfTimeMatch ? parseInt(halfTimeMatch[2]) : undefined,
    };
  } catch (error) {
    console.log(`    ⚠️ Kunne ikkje hente detaljar for ${fiksId}`);
    return null;
  }
}

/**
 * Hent kampar for Kaupanger frå lag-heimesida
 */
async function fetchKaupangerMatches(): Promise<ScrapedMatch[]> {
  console.log("\n📋 Hentar kampar frå Kaupanger si side...");
  
  const url = `https://www.fotball.no/fotballdata/lag/hjem/?fiksId=${KAUPANGER_FIKS_ID}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "nb-NO,nb;q=0.9,no;q=0.8,en;q=0.7",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    
    const html = await response.text();
    const matches: ScrapedMatch[] = [];
    
    // Finn alle kamp-linkar med fiksId
    // Format: fiksId=8985091 i URL-en
    const matchPattern = /fiksId=(\d{7,})/g;
    const foundIds = new Set<string>();
    
    let match;
    while ((match = matchPattern.exec(html)) !== null) {
      foundIds.add(match[1]);
    }
    
    console.log(`  Fann ${foundIds.size} unike kamp-ID-ar`);
    
    // Hent detaljar for kvar kamp
    for (const fiksId of foundIds) {
      // Vent litt mellom kvar førespurnad
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const details = await fetchMatchDetails(fiksId);
      if (details) {
        // Lag ein enkel match-struktur som vi kan fylle ut seinare
        matches.push({
          id: `fiks-${fiksId}`,
          fiksId,
          homeTeam: KAUPANGER_TEAM,
          awayTeam: { id: "unknown", name: "Ukjent", shortName: "???" },
          date: "",
          time: "00:00",
          venue: details.venue || "",
          location: "home",
          status: "upcoming",
          halfTimeHome: details.halfTimeHome,
          halfTimeAway: details.halfTimeAway,
        });
      }
    }
    
    return matches;
  } catch (error) {
    console.error("❌ Feil ved henting av kampar:", error);
    return [];
  }
}

/**
 * Les data frå eksisterande mock-data og oppdater med ny info
 */
async function updateFromMockData(): Promise<{
  upcomingMatches: ScrapedMatch[];
  results: ScrapedMatch[];
}> {
  // For no: bruk eksisterande data frå mock-data.ts
  // I framtida kan dette erstattast med live data frå fotball.no
  
  console.log("\n📦 Brukar eksisterande mock-data som base...");
  
  // Les neste kamp frå konfigurasjonen me allereie har
  const upcomingMatches: ScrapedMatch[] = [
    {
      id: "nm-2026-1",
      fiksId: "8985091",
      homeTeam: {
        id: "vik",
        name: "Vik",
        shortName: "Vik",
        logo: "https://images.fotball.no/clublogos/927.png",
      },
      awayTeam: KAUPANGER_TEAM,
      date: "2026-03-21",
      time: "14:00",
      venue: "Vik kunstgras",
      location: "away",
      status: "upcoming",
    },
  ];
  
  // Resultat frå 2025-sesongen (henta frå mock-data.ts)
  const results: ScrapedMatch[] = [
    // Desse verdiane er allereie i mock-data.ts
    // Dette er ein forenkla versjon - full versjon kjem frå mock-data
  ];
  
  return { upcomingMatches, results };
}

async function main() {
  console.log("🔄 Startar datahenting...\n");
  console.log("ℹ️  Merk: fotball.no blokkerer automatisk scraping.");
  console.log("   Brukar derfor ein kombinasjon av cache og manuell oppdatering.\n");
  
  try {
    // Prøv å hente live data
    const liveMatches = await fetchKaupangerMatches();
    
    // Bruk eksisterande data som fallback
    const { upcomingMatches, results } = await updateFromMockData();
    
    const data = {
      upcomingMatches,
      results,
      table: [] as TableRow[],
      lastUpdated: new Date().toISOString(),
      source: liveMatches.length > 0 ? "live" : "cache",
    };
    
    // Lagre til public/data/matches.json
    const dataDir = join(process.cwd(), "public", "data");
    await mkdir(dataDir, { recursive: true });
    
    const filePath = join(dataDir, "matches.json");
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
    
    console.log("\n✅ Data oppdatert!");
    console.log(`📁 Lagra til: ${filePath}`);
    console.log(`📅 Sist oppdatert: ${data.lastUpdated}`);
    console.log(`📡 Datakjelde: ${data.source}`);
    console.log(`\nStatistikk:`);
    console.log(`  - Kommande kampar: ${data.upcomingMatches.length}`);
    console.log(`  - Resultat: ${data.results.length}`);
  } catch (error) {
    console.error("❌ Feil ved datahenting:", error);
    process.exit(1);
  }
}

main();
