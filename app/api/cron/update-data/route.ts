import { NextResponse } from "next/server";
import { scrapeAllData } from "@/lib/scraper";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

// Denne API-routen kan kallast av ein cron job for å oppdatere data dagleg
// Bruk eit hemmeleg token for å sikre at berre autoriserte kall går gjennom

const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  // Sjekk autorisering
  const authHeader = request.headers.get("authorization");
  
  if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json(
      { error: "Uautorisert" },
      { status: 401 }
    );
  }
  
  try {
    console.log("Startar dagleg datahenting...");
    
    // Hent all data frå fotball.no
    const data = await scrapeAllData();
    
    // Lagre til JSON-fil i public-mappa for statisk serving
    const dataDir = join(process.cwd(), "public", "data");
    
    // Opprett mappe om den ikkje finst
    await mkdir(dataDir, { recursive: true });
    
    // Skriv data til fil
    await writeFile(
      join(dataDir, "matches.json"),
      JSON.stringify(data, null, 2),
      "utf-8"
    );
    
    console.log("Data oppdatert:", new Date().toISOString());
    
    return NextResponse.json({
      success: true,
      message: "Data oppdatert",
      lastUpdated: data.lastUpdated,
      stats: {
        upcomingMatches: data.upcomingMatches.length,
        results: data.results.length,
        tableRows: data.table.length,
      },
    });
  } catch (error) {
    console.error("Feil ved datahenting:", error);
    
    return NextResponse.json(
      { 
        error: "Feil ved datahenting",
        details: error instanceof Error ? error.message : "Ukjent feil"
      },
      { status: 500 }
    );
  }
}

// Tillat også POST for manuell triggering
export async function POST(request: Request) {
  return GET(request);
}
