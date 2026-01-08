/**
 * Scraper for å hente data frå fotball.no
 * Køyrer dagleg via cron job for å oppdatere kampdata
 */

import { Match, HistoricalMatch, Team } from "@/types";

// Kaupanger sitt lag-ID på fotball.no
const KAUPANGER_FIKS_ID = "192266";
const KAUPANGER_TEAM: Team = {
  id: "kil",
  name: "K.I.L",
  shortName: "K.I.L",
  logo: "/images/kil-logo.png",
};

// Base URLs
const FOTBALL_NO_BASE = "https://www.fotball.no/fotballdata";

interface ScrapedMatch {
  fiksId: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: "upcoming" | "completed";
  homeTeamLogo?: string;
  awayTeamLogo?: string;
}

interface ScrapedTableRow {
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

/**
 * Hent HTML frå ein URL
 */
async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; KaupangerApp/1.0)",
      "Accept": "text/html,application/xhtml+xml",
    },
    next: { revalidate: 86400 }, // Cache i 24 timar
  });
  
  if (!response.ok) {
    throw new Error(`Feil ved henting av ${url}: ${response.status}`);
  }
  
  return response.text();
}

/**
 * Parse dato frå norsk format til ISO
 */
function parseNorwegianDate(dateStr: string): string {
  // Format: "lørdag 21.03.26" eller "21.03.2026"
  const match = dateStr.match(/(\d{1,2})\.(\d{1,2})\.(\d{2,4})/);
  if (!match) return "";
  
  const [, day, month, year] = match;
  const fullYear = year.length === 2 ? `20${year}` : year;
  return `${fullYear}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
}

/**
 * Hent kommande kampar for Kaupanger
 */
export async function fetchUpcomingMatches(): Promise<Match[]> {
  try {
    const url = `${FOTBALL_NO_BASE}/lag/kamper-og-resultater/?fiksId=${KAUPANGER_FIKS_ID}`;
    const html = await fetchHtml(url);
    
    const matches: Match[] = [];
    
    // Regex for å finne kamp-info i HTML
    // Leiter etter kampar som ikkje har resultat (kommande)
    const matchPattern = /fiksId=(\d+).*?(\d{1,2}\.\d{1,2}\.\d{2,4}).*?(\d{2}:\d{2}).*?class="match-team[^"]*"[^>]*>([^<]+)<.*?class="match-team[^"]*"[^>]*>([^<]+)</gi;
    
    let match;
    while ((match = matchPattern.exec(html)) !== null) {
      const [, fiksId, date, time, homeTeam, awayTeam] = match;
      
      // Sjekk om dette er ein kommande kamp (ikkje spelt enno)
      const matchDate = new Date(parseNorwegianDate(date));
      if (matchDate > new Date()) {
        const isHome = homeTeam.toLowerCase().includes("kaupanger");
        
        matches.push({
          id: `fiks-${fiksId}`,
          homeTeam: isHome ? KAUPANGER_TEAM : {
            id: fiksId,
            name: homeTeam.trim(),
            shortName: homeTeam.trim(),
            logo: `https://images.fotball.no/clublogos/${fiksId}.png`,
          },
          awayTeam: isHome ? {
            id: fiksId,
            name: awayTeam.trim(),
            shortName: awayTeam.trim(),
            logo: `https://images.fotball.no/clublogos/${fiksId}.png`,
          } : KAUPANGER_TEAM,
          date: parseNorwegianDate(date),
          time,
          venue: "", // Må hentast frå kampdetaljar
          location: isHome ? "home" : "away",
          status: "upcoming",
        });
      }
    }
    
    return matches;
  } catch (error) {
    console.error("Feil ved henting av kommande kampar:", error);
    return [];
  }
}

/**
 * Hent detaljar for ein spesifikk kamp
 */
export async function fetchMatchDetails(fiksId: string): Promise<ScrapedMatch | null> {
  try {
    const url = `${FOTBALL_NO_BASE}/kamp/?fiksId=${fiksId}`;
    const html = await fetchHtml(url);
    
    // Parse kamp-info frå HTML
    const dateMatch = html.match(/(\d{1,2}\.\d{1,2}\.\d{2,4})/);
    const timeMatch = html.match(/(\d{2}:\d{2})/);
    const venueMatch = html.match(/Stadion:\s*<[^>]+>([^<]+)</);
    const teamsMatch = html.match(/class="match-team[^"]*"[^>]*>([^<]+)<[\s\S]*?class="match-team[^"]*"[^>]*>([^<]+)</);
    const scoreMatch = html.match(/(\d+)\s*-\s*(\d+)/);
    
    if (!dateMatch || !teamsMatch) return null;
    
    const date = parseNorwegianDate(dateMatch[1]);
    const matchDate = new Date(date);
    const isCompleted = matchDate < new Date() && scoreMatch;
    
    return {
      fiksId,
      homeTeam: teamsMatch[1].trim(),
      awayTeam: teamsMatch[2].trim(),
      homeScore: isCompleted && scoreMatch ? parseInt(scoreMatch[1]) : undefined,
      awayScore: isCompleted && scoreMatch ? parseInt(scoreMatch[2]) : undefined,
      date,
      time: timeMatch ? timeMatch[1] : "00:00",
      venue: venueMatch ? venueMatch[1].trim() : "",
      status: isCompleted ? "completed" : "upcoming",
    };
  } catch (error) {
    console.error(`Feil ved henting av kampdetaljar for ${fiksId}:`, error);
    return null;
  }
}

/**
 * Hent tabell for Kaupanger sin divisjon
 */
export async function fetchTable(): Promise<ScrapedTableRow[]> {
  try {
    const url = `${FOTBALL_NO_BASE}/lag/hjem/?fiksId=${KAUPANGER_FIKS_ID}&underside=tabeller`;
    const html = await fetchHtml(url);
    
    const table: ScrapedTableRow[] = [];
    
    // Parse tabell-rader ([\s\S] i staden for . med s-flagg)
    const rowPattern = /<tr[^>]*>[\s\S]*?(\d+)\.?\s*<[\s\S]*?class="team[^"]*"[^>]*>([^<]+)<[\s\S]*?(\d+)[\s\S]*?(\d+)[\s\S]*?(\d+)[\s\S]*?(\d+)[\s\S]*?(\d+)[\s\S]*?(\d+)[\s\S]*?([+-]?\d+)[\s\S]*?(\d+)/gi;
    
    let match;
    while ((match = rowPattern.exec(html)) !== null) {
      const [, pos, team, played, wins, draws, losses, gf, ga, gd, points] = match;
      table.push({
        position: parseInt(pos),
        team: team.trim(),
        played: parseInt(played),
        wins: parseInt(wins),
        draws: parseInt(draws),
        losses: parseInt(losses),
        goalsFor: parseInt(gf),
        goalsAgainst: parseInt(ga),
        goalDiff: parseInt(gd),
        points: parseInt(points),
      });
    }
    
    return table;
  } catch (error) {
    console.error("Feil ved henting av tabell:", error);
    return [];
  }
}

/**
 * Hent alle resultat for sesongen
 */
export async function fetchResults(): Promise<HistoricalMatch[]> {
  try {
    const url = `${FOTBALL_NO_BASE}/lag/kamper-og-resultater/?fiksId=${KAUPANGER_FIKS_ID}`;
    const html = await fetchHtml(url);
    
    const results: HistoricalMatch[] = [];
    
    // Parse ferdigspelte kampar
    const matchPattern = /fiksId=(\d+).*?(\d{1,2}\.\d{1,2}\.\d{2,4}).*?class="match-team[^"]*"[^>]*>([^<]+)<.*?(\d+)\s*-\s*(\d+).*?class="match-team[^"]*"[^>]*>([^<]+)</gi;
    
    let match;
    let id = 1;
    while ((match = matchPattern.exec(html)) !== null) {
      const [, fiksId, date, homeTeam, homeScore, awayScore, awayTeam] = match;
      
      const parsedDate = parseNorwegianDate(date);
      const matchDate = new Date(parsedDate);
      
      // Berre ferdigspelte kampar
      if (matchDate < new Date()) {
        const isHome = homeTeam.toLowerCase().includes("kaupanger");
        const kilScore = isHome ? parseInt(homeScore) : parseInt(awayScore);
        const oppScore = isHome ? parseInt(awayScore) : parseInt(homeScore);
        
        let result: "win" | "draw" | "loss";
        if (kilScore > oppScore) result = "win";
        else if (kilScore < oppScore) result = "loss";
        else result = "draw";
        
        results.push({
          id: `h${id++}`,
          homeTeam: isHome ? KAUPANGER_TEAM : {
            id: fiksId,
            name: homeTeam.trim(),
            shortName: homeTeam.trim(),
          },
          awayTeam: isHome ? {
            id: fiksId,
            name: awayTeam.trim(),
            shortName: awayTeam.trim(),
          } : KAUPANGER_TEAM,
          date: parsedDate,
          venue: "", // Må hentast separat
          venueType: isHome ? "home" : "away",
          homeScore: parseInt(homeScore),
          awayScore: parseInt(awayScore),
          result,
          season: new Date(parsedDate).getFullYear().toString(),
          fiksId,
        });
      }
    }
    
    return results;
  } catch (error) {
    console.error("Feil ved henting av resultat:", error);
    return [];
  }
}

/**
 * Hovudfunksjon som hentar all data
 */
export async function scrapeAllData() {
  console.log("Startar datahenting frå fotball.no...");
  
  const [upcomingMatches, results, table] = await Promise.all([
    fetchUpcomingMatches(),
    fetchResults(),
    fetchTable(),
  ]);
  
  console.log(`Henta ${upcomingMatches.length} kommande kampar`);
  console.log(`Henta ${results.length} resultat`);
  console.log(`Henta ${table.length} tabell-rader`);
  
  return {
    upcomingMatches,
    results,
    table,
    lastUpdated: new Date().toISOString(),
  };
}
