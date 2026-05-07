import { GetWeeklyTimesheetsResponse } from "@/types/responses";
import { getBaseUrl } from "../utils";

export const getWeeklyTimesheets = async (page: number, limit: number) => {
  const response = await fetch(
    `${getBaseUrl()}/api/getWeeklyTimesheets?page=${page}&limit=${limit}`,
  );
  const data: GetWeeklyTimesheetsResponse = await response.json();
  return data;
};
