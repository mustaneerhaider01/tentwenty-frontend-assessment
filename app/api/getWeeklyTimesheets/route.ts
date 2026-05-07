import { NextRequest, NextResponse } from "next/server";
import { mockTimesheets, mockTimesheetEntries, mockUsers } from "@/data";
import { TIMESHEET_STATUS } from "@/app/constants";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const enrichedTimesheets = mockTimesheets.map((timesheet) => {
    const entries = mockTimesheetEntries.filter(
      (entry) => entry.timesheetId === timesheet.id,
    );

    const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

    let status = TIMESHEET_STATUS.missing;

    if (totalHours > 0 && totalHours < 40) {
      status = TIMESHEET_STATUS.incomplete;
    }

    if (totalHours >= 40) {
      status = TIMESHEET_STATUS.completed;
    }

    const user = mockUsers.find((user) => user.id === timesheet.userId);

    return {
      ...timesheet,
      totalHours,
      status,
      user: {
        id: user?.id,
        username: user?.username,
      },
    };
  });

  const paginatedTimesheets = enrichedTimesheets.slice(startIndex, endIndex);

  return NextResponse.json({
    data: paginatedTimesheets,
    pagination: {
      page,
      limit,
      totalItems: enrichedTimesheets.length,
      totalPages: Math.ceil(enrichedTimesheets.length / limit),
    },
  });
}
