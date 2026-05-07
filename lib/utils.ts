import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  if (process.env.NODE_ENV === "production") {
    return process.env.VERCEL_URL!;
  }

  return "http://localhost:3000";
}
