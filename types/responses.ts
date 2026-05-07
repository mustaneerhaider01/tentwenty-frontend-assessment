import type { AppUser, Timesheet } from "./models";

export interface EnrichedTimesheet extends Timesheet {
  totalHours: number;
  status: string;
  user: Pick<AppUser, "id" | "username">;
}

export interface GetWeeklyTimesheetsResponse {
  data: EnrichedTimesheet[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}
