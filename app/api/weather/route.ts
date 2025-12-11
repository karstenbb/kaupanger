import { NextResponse } from "next/server";

// Kaupanger coordinates
const KAUPANGER_LAT = 61.183;
const KAUPANGER_LON = 7.250;

const WEATHER_API_URL = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${KAUPANGER_LAT}&lon=${KAUPANGER_LON}`;

export async function GET() {
  try {
    const response = await fetch(WEATHER_API_URL, {
      headers: {
        "User-Agent": "KaupangerFotballApp/1.0 kontakt@kaupanger-fotball.no",
      },
      next: {
        revalidate: 1800, // Cache for 30 minutes
      },
    });

    if (!response.ok) {
      throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Extract current weather from the first timeseries entry
    const currentWeather = data.properties?.timeseries?.[0];
    
    if (!currentWeather) {
      throw new Error("No weather data available");
    }

    const instant = currentWeather.data?.instant?.details;
    const next1Hour = currentWeather.data?.next_1_hours;

    const weatherData = {
      temperature: Math.round(instant?.air_temperature ?? 0),
      windSpeed: instant?.wind_speed ?? 0,
      humidity: instant?.relative_humidity ?? 0,
      symbolCode: next1Hour?.summary?.symbol_code ?? "cloudy",
      updatedAt: currentWeather.time,
    };

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Weather fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
