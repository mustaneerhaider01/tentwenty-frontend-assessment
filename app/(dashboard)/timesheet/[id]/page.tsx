import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimesheetWithEntries } from "@/lib/api/timesheets";
import { groupTimesheetEntriesByDate } from "@/lib/utils";
import { format } from "date-fns";
import { Progress } from "@/components/ui/progress";
import EntryList from "@/components/timesheet/EntryList";

export const dynamic = "force-dynamic";

interface TimesheetPageProps {
  params: Promise<{ id: string }>;
}

async function TimesheetPage({ params }: TimesheetPageProps) {
  const { id } = await params;

  const { startDate, endDate, entries, totalHours } =
    await getTimesheetWithEntries(id);

  const progress = Math.round((totalHours / 40) * 100);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
          <CardTitle className="text-gray-900 text-2xl font-bold">
            This week&apos;s timesheet
          </CardTitle>
          <div className="flex flex-col">
            <span className="text-xs font-medium ml-auto text-gray-500 pb-1">
              {progress}%
            </span>
            <Progress value={progress} className="w-48" />
          </div>
        </div>
        <p className="text-gray-500 mt-4">
          {format(new Date(startDate), "dd")} {" - "}
          {format(new Date(endDate), "dd MMMM, yyyy")}
        </p>
      </CardHeader>
      <CardContent className="pb-5">
        <EntryList entries={entries} />
      </CardContent>
    </Card>
  );
}
export default TimesheetPage;
