import {
  GetTimesheetWithEntriesResponse,
  GetWeeklyTimesheetsResponse,
} from "@/types/responses";

export const getWeeklyTimesheets = async (page: number, limit: number) => {
  const response = await fetch(
    `${process.env.API_BASE_URL!}/api/getWeeklyTimesheets?page=${page}&limit=${limit}`,
  );
  const data: GetWeeklyTimesheetsResponse = await response.json();
  return data;
};

export const getTimesheetWithEntries = async (timesheetId: string) => {
  const response = await fetch(
    `${process.env.API_BASE_URL!}/api/timesheets/${timesheetId}`,
  );
  const { data }: GetTimesheetWithEntriesResponse = await response.json();
  return data;
};
