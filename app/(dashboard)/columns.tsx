"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { type EnrichedTimesheet } from "@/types/responses";
import { TIMESHEET_STATUS } from "../constants";
import { cn } from "@/lib/utils";

export const timesheetColumns: ColumnDef<EnrichedTimesheet>[] = [
  {
    accessorKey: "weekNumber",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-7 w-full -mr-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          WEEK #
          <ArrowDown className="size-4 ml-auto stroke-3 shrink-0" />
        </button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="font-medium text-gray-900">
          {row.original.weekNumber}
        </div>
      );
    },
    meta: {
      className: "bg-gray-50 w-24",
    },
  },
  {
    id: "dateRange",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-2.5 w-48 lg:w-[18rem]"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATE
          <ArrowDown className="size-4 stroke-3" />
        </button>
      );
    },
    sortingFn: (rowA, rowB) => {
      return (
        new Date(rowA.original.startDate).getTime() -
        new Date(rowB.original.startDate).getTime()
      );
    },
    cell: ({ row }) => {
      const startDate = format(new Date(row.original.startDate), "d");

      const endDate = format(new Date(row.original.endDate), "d MMMM, yyyy");

      return (
        <span className="text-gray-500">
          {startDate} - {endDate}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <button
          className="flex items-center gap-5 w-40 lg:w-60"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STATUS
          <ArrowDown className="size-4 stroke-3" />
        </button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status;

      const styles = {
        [TIMESHEET_STATUS.completed]: "bg-green-100 text-green-800",
        [TIMESHEET_STATUS.incomplete]: "bg-yellow-100 text-yellow-800",
        [TIMESHEET_STATUS.missing]: "bg-pink-100 text-pink-800",
      };

      return (
        <span
          className={cn(
            "inline-flex rounded-md px-3 py-1 text-xs font-medium",
            styles[status],
          )}
        >
          {status.toUpperCase()}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="text-center">ACTIONS</div>;
    },
    cell: ({ row }) => {
      const status = row.original.status;

      const actionLabel =
        status === TIMESHEET_STATUS.missing
          ? "Create"
          : status === TIMESHEET_STATUS.incomplete
            ? "Update"
            : "View";

      return (
        <div className="text-center">
          <Link
            href={`/timesheet/${row.original.id}`}
            className="text-primary-600 hover:underline text-base font-normal"
          >
            {actionLabel}
          </Link>
        </div>
      );
    },
  },
];
