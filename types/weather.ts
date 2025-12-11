// Weather types from Met.no API
export interface WeatherData {
  temperature: number;
  windSpeed: number;
  humidity: number;
  symbolCode: string;
  updatedAt: string;
}

// Weather symbol mapping to icons
export const weatherSymbolToEmoji: Record<string, string> = {
  clearsky_day: "☀️",
  clearsky_night: "🌙",
  clearsky_polartwilight: "🌅",
  fair_day: "🌤️",
  fair_night: "🌙",
  fair_polartwilight: "🌅",
  partlycloudy_day: "⛅",
  partlycloudy_night: "☁️",
  partlycloudy_polartwilight: "⛅",
  cloudy: "☁️",
  fog: "🌫️",
  lightrain: "🌦️",
  rain: "🌧️",
  heavyrain: "🌧️",
  lightrainshowers_day: "🌦️",
  lightrainshowers_night: "🌧️",
  rainshowers_day: "🌦️",
  rainshowers_night: "🌧️",
  heavyrainshowers_day: "🌧️",
  heavyrainshowers_night: "🌧️",
  lightsleet: "🌨️",
  sleet: "🌨️",
  heavysleet: "🌨️",
  lightsnow: "🌨️",
  snow: "❄️",
  heavysnow: "❄️",
  lightssleetshowers_day: "🌨️",
  sleetshowers_day: "🌨️",
  lightsnowshowers_day: "🌨️",
  snowshowers_day: "🌨️",
  thunder: "⛈️",
  lightrainandthunder: "⛈️",
  rainandthunder: "⛈️",
  heavyrainandthunder: "⛈️",
};

export function getWeatherEmoji(symbolCode: string): string {
  // Remove any _day, _night, _polartwilight suffix for matching
  const baseCode = symbolCode.split("_")[0];
  return weatherSymbolToEmoji[symbolCode] || weatherSymbolToEmoji[baseCode] || "🌡️";
}
