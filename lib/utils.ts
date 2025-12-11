import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("no-NO", {
    day: "numeric",
    month: "short",
  });
}

export function getDayOfWeek(dateString: string): string {
  const date = new Date(dateString);
  const days = ["Søndag", "Måndag", "Tysdag", "Onsdag", "Torsdag", "Fredag", "Laurdag"];
  return days[date.getDay()];
}

export function getCountdown(dateString: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function getResultColor(
  homeScore: number,
  awayScore: number,
  isHome: boolean
): "win" | "draw" | "loss" {
  const ourScore = isHome ? homeScore : awayScore;
  const theirScore = isHome ? awayScore : homeScore;

  if (ourScore > theirScore) return "win";
  if (ourScore < theirScore) return "loss";
  return "draw";
}

export function getResultLabel(result: "win" | "draw" | "loss"): string {
  switch (result) {
    case "win":
      return "Siger";
    case "draw":
      return "Uavgjort";
    case "loss":
      return "Tap";
  }
}
