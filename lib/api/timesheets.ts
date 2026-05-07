import {
  GetTimesheetWithEntriesResponse,
  GetWeeklyTimesheetsResponse,
} from "@/types/responses";
import { getBaseUrl } from "../utils";

export const getWeeklyTimesheets = async (page: number, limit: number) => {
  const response = await fetch(
    `${getBaseUrl()}/api/getWeeklyTimesheets?page=${page}&limit=${limit}`,
  );
  const data: GetWeeklyTimesheetsResponse = await response.json();
  return data;
};

export const getTimesheetWithEntries = async (timesheetId: string) => {
  const response = await fetch(`${getBaseUrl()}/api/timesheets/${timesheetId}`);
  const { data }: GetTimesheetWithEntriesResponse = await response.json();
  return data;
};
