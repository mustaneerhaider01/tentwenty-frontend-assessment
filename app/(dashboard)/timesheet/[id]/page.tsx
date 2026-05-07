import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getTimesheetWithEntries } from "@/lib/api/timesheets";
import { groupTimesheetEntriesByDate } from "@/lib/utils";
import { format } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, PlusIcon } from "lucide-react";

export const dynamic = "force-dynamic";

interface TimesheetPageProps {
  params: Promise<{ id: string }>;
}

async function TimesheetPage({ params }: TimesheetPageProps) {
  const { id } = await params;

  const { startDate, endDate, entries } = await getTimesheetWithEntries(id);

  const groupedEntries = groupTimesheetEntriesByDate(entries);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900 text-2xl font-bold">
          This week&apos;s timesheet
        </CardTitle>
        <p className="text-gray-500 mt-4">
          {format(new Date(startDate), "dd")} {" - "}
          {format(new Date(endDate), "dd MMMM, yyyy")}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-5">
          {groupedEntries.map((group) => (
            <div
              key={group.date}
              className="grid grid-cols-[50px_1fr] sm:grid-cols-[100px_1fr] gap-6"
            >
              {/* LEFT DATE */}
              <div className="font-semibold text-gray-900 text-lg whitespace-nowrap">
                {format(new Date(group.date), "MMM dd")}
              </div>

              {/* RIGHT ENTRIES */}
              <div className="space-y-2.5">
                {group.entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2.5 h-11"
                  >
                    {/* TASK */}
                    <div className="font-medium text-gray-900">
                      {entry.task}
                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center">
                      <span className="text-sm text-gray-400 whitespace-nowrap mr-3">
                        {entry.hours} hrs
                      </span>

                      <span className="bg-blue-100 text-primary-800 inline-flex rounded-md px-3 py-1 text-xs font-medium mr-1">
                        {entry.project.name}
                      </span>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <EllipsisIcon className="size-5 text-gray-500" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-[97px] space-y-1"
                        >
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600 focus:text-red-400">
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
                <button className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-primary-700 bg-blue-100 p-3 h-11 font-medium text-primary-700 focus-visible:outline-none w-full">
                  <PlusIcon className="size-4" /> Add new task
                </button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default TimesheetPage;
