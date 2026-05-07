"use client";

import { useMemo } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/bootstrap.css";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages?: number;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages = 0,
}: DataTableProps<TData, TValue>) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 5;

  const pagination: PaginationState = useMemo(
    () => ({
      pageIndex: Number(page) - 1,
      pageSize: Number(limit),
    }),
    [page, limit],
  );

  const updatePagination = (nextPage: number, nextLimit: number) => {
    const next = new URLSearchParams(searchParams.toString());

    next.set("page", String(nextPage));
    next.set("limit", String(nextLimit));

    router.push(`${pathname}?${next.toString()}`);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function" ? updater(pagination) : updater;

      const pageSizeChanged = newState.pageSize !== pagination.pageSize;

      const nextPage = pageSizeChanged ? 1 : newState.pageIndex + 1;
      const nextLimit = newState.pageSize;
      updatePagination(nextPage, nextLimit);
    },
    manualPagination: true,
    defaultColumn: {
      size: 200, // starting column size
      minSize: 30, // enforced during column resizing
      maxSize: 800, // enforced during column resizing
    },
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="overflow-hidden rounded-lg shadow-soft">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-50">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-gray-500 capitalize font-semibold"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={
                        typeof cell.column.columnDef.meta?.className ===
                        "function"
                          ? cell.column.columnDef.meta.className(row.original)
                          : cell.column.columnDef.meta?.className
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between mt-6">
        <Select
          value={String(limit)}
          onValueChange={(nextLimit) => table.setPageSize(+nextLimit)}
        >
          <SelectTrigger
            iconClassName="stroke-3 text-[#4A5565]"
            className="border-[#E5E7EB] text-[#4A5565] bg-[#F9FAFB] rounded-xl pl-3.5 pr-3 shadow-select font-medium"
          >
            <SelectValue className="Select" />
          </SelectTrigger>
          <SelectContent>
            {[20, 15, 10, 5].map((num) => (
              <SelectItem key={num} value={String(num)}>
                {num} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ResponsivePagination
          current={Number(page)}
          total={totalPages}
          onPageChange={(nextPage) => table.setPageIndex(nextPage - 1)}
          previousLabel={
            <div className="flex items-center gap-1">
              <ChevronLeftIcon className="h-4 w-4 text-gray-500" />
              <span className="hidden sm:inline">Previous</span>
            </div>
          }
          nextLabel={
            <div className="flex items-center gap-1">
              <span className="hidden sm:inline">Next</span>
              <ChevronRightIcon className="h-4 w-4 text-gray-500" />
            </div>
          }
          extraClassName="justify-content-center mt-6 mb-1"
        />
      </div>
    </>
  );
}
