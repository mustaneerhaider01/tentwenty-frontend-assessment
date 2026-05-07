"use client";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, PlusIcon } from "lucide-react";
import { format } from "date-fns";
import { groupTimesheetEntriesByDate } from "@/lib/utils";
import { mockProjects } from "@/data";
import type { TimesheetEntry } from "@/types/models";
import type { EnrichedTimesheetEntry } from "@/types/responses";
import ManageEntryModal from "./ManageEntryModal";

interface EntryListProps {
  entries: EnrichedTimesheetEntry[];
}

function EntryList({ entries }: EntryListProps) {
  const groupedEntries = groupTimesheetEntriesByDate(entries);

  const [timesheetEntries, setTimesheetEntries] = useState(groupedEntries);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEntryDate, setSelectedEntryDate] = useState("");
  const [editingEntry, setEditingEntry] =
    useState<EnrichedTimesheetEntry | null>(null);

  const onAddTimesheetEntry = (entry: TimesheetEntry) => {
    setTimesheetEntries((curr) => {
      const groupIndex = curr.findIndex((g) => g.date === entry.date);

      const enrichedEntry = {
        ...entry,
        project: mockProjects.find(
          (project) => project.id === entry.projectId,
        )!,
      };

      // group exists → update it
      if (groupIndex !== -1) {
        return curr.map((group, i) => {
          if (i !== groupIndex) return group;

          return {
            ...group,
            entries: [...group.entries, enrichedEntry],
          };
        });
      }

      // new group
      return [
        ...curr,
        {
          date: entry.date,
          entries: [enrichedEntry],
        },
      ];
    });
  };

  const onEditTimesheetEntry = (
    updatedEntry: Partial<EnrichedTimesheetEntry>,
  ) => {
    setTimesheetEntries((currEntries) => {
      return currEntries.map((group) => {
        if (group.date !== updatedEntry.date) {
          return group;
        }

        return {
          ...group,
          entries: group.entries.map((entry) =>
            entry.id === updatedEntry.id
              ? { ...entry, ...updatedEntry }
              : entry,
          ),
        };
      });
    });
  };

  const handleOpenAddModal = (entryDate: string) => {
    setIsModalOpen(true);
    setSelectedEntryDate(entryDate);
  };

  const handleOpenEditModal = (entry: EnrichedTimesheetEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedEntryDate("");
    setEditingEntry(null);
  };

  return (
    <>
      <ManageEntryModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onAddEntry={onAddTimesheetEntry}
        onEditEntry={onEditTimesheetEntry}
        entryDate={selectedEntryDate}
        entryDetails={editingEntry}
        key={editingEntry?.id.toString()}
      />
      <div className="flex flex-col gap-y-5">
        {timesheetEntries.map((group) => (
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
                  <div className="font-medium text-gray-900">{entry.task}</div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400 whitespace-nowrap mr-3">
                      {entry.hours} {entry.hours === 1 ? "hr" : "hrs"}
                    </span>

                    <span className="bg-blue-100 text-primary-800 inline-flex rounded-md px-3 py-1 text-xs font-medium mr-1">
                      {entry.project?.name}
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
                        <DropdownMenuItem
                          onSelect={() => handleOpenEditModal(entry)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-400">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
              <button
                onClick={() => handleOpenAddModal(group.date)}
                className="flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-primary-700 bg-blue-100 p-3 h-11 font-medium text-primary-700 focus-visible:outline-none w-full"
              >
                <PlusIcon className="size-4" /> Add new task
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default EntryList;
