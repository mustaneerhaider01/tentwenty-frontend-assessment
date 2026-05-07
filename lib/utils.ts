import type { Project, TimesheetEntry } from "@/types/models";
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

export function groupTimesheetEntriesByDate(
  entries: (TimesheetEntry & { project: Project })[],
) {
  return Object.values(
    entries.reduce(
      (acc, entry) => {
        if (!acc[entry.date]) {
          acc[entry.date] = {
            date: entry.date,
            entries: [],
          };
        }

        acc[entry.date].entries.push(entry);

        return acc;
      },
      {} as Record<
        string,
        { date: string; entries: (TimesheetEntry & { project: Project })[] }
      >,
    ),
  );
}
