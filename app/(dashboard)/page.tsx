import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DateRangePicker from "@/components/ui/date-range-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIMESHEET_STATUS } from "../constants";
import { DataTable } from "@/components/ui/data-table";
import { getWeeklyTimesheets } from "@/lib/api/timesheets";
import { timesheetColumns } from "./columns";

export const dynamic = "force-dynamic";

interface TimesheetsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function TimesheetsPage({
  searchParams,
}: TimesheetsPageProps) {
  const params = await searchParams;

  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 5;

  const { data: timesheets, pagination } = await getWeeklyTimesheets(
    page,
    limit,
  );

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900 text-2xl font-bold">
            Your Timesheets
          </CardTitle>
          <div className="flex gap-2.5 mt-5">
            <DateRangePicker placeholder="Date Range" className="w-[152px]" />
            <Select>
              <SelectTrigger className="w-[140px] pl-3 pr-2.5 py-5">
                <SelectValue placeholder="Status" className="text-gray-900" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(TIMESHEET_STATUS).map(([k, v]) => (
                  <SelectItem key={k} value={String(v)}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={timesheetColumns}
            data={timesheets}
            totalPages={pagination?.totalPages}
          />
        </CardContent>
      </Card>
    </div>
  );
}
