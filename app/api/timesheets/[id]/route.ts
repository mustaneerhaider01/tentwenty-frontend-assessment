import { NextRequest, NextResponse } from "next/server";

import { mockProjects, mockTimesheets, mockTimesheetEntries } from "@/data";
import { TIMESHEET_STATUS } from "@/app/constants";

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/timesheets/[id]">,
) {
  const { id } = await ctx.params;

  const parsedTimesheetId = Number(id);

  if (Number.isNaN(parsedTimesheetId)) {
    return NextResponse.json(
      {
        message: "Invalid Timesheet ID",
      },
      {
        status: 400,
      },
    );
  }

  const timesheet = mockTimesheets.find(
    (timesheet) => timesheet.id === parsedTimesheetId,
  );

  if (!timesheet) {
    return NextResponse.json(
      {
        message: "Timesheet not found",
      },
      {
        status: 404,
      },
    );
  }

  const entries = mockTimesheetEntries
    .filter((entry) => entry.timesheetId === parsedTimesheetId)
    .map((entry) => {
      const project = mockProjects.find(
        (project) => project.id === entry.projectId,
      );

      return {
        ...entry,
        project,
      };
    });

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  const status =
    totalHours === 0
      ? TIMESHEET_STATUS.missing
      : totalHours >= 40
        ? TIMESHEET_STATUS.completed
        : TIMESHEET_STATUS.incomplete;

  return NextResponse.json({
    data: {
      ...timesheet,
      totalHours,
      status,
      entries,
    },
  });
}
