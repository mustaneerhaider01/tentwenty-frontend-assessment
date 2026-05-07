"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "next/navigation";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { mockProjects, mockTimesheetEntries } from "@/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import HoursField from "../ui/hourse-field";
import { workTypeOptions } from "@/app/constants";
import type { TimesheetEntry } from "@/types/models";
import type { EnrichedTimesheetEntry } from "@/types/responses";

export const createTimesheetEntryFormSchema = z.object({
  projectId: z.number({ error: "Please select a project" }).int().min(1, {
    message: "Please select a project",
  }),
  workType: z.string().trim().min(1, {
    message: "Please select type of work",
  }),
  task: z
    .string()
    .trim()
    .min(1, {
      message: "Task description is required",
    })
    .max(500, {
      message: "Task description cannot exceed 500 characters",
    }),
  hours: z
    .number()
    .min(1, {
      message: "Hours must be at least 1",
    })
    .max(24, {
      message: "Hours cannot exceed 24",
    }),
});

type CreateTimesheetEntrySchema = z.infer<
  typeof createTimesheetEntryFormSchema
>;

interface ManageEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEntry: (entry: TimesheetEntry) => void;
  onEditEntry: (entry: Partial<EnrichedTimesheetEntry>) => void;
  entryDate: string;
  entryDetails?: EnrichedTimesheetEntry | null;
}

function ManageEntryModal({
  isOpen,
  onClose,
  onAddEntry,
  onEditEntry,
  entryDate,
  entryDetails,
}: ManageEntryModalProps) {
  const { id } = useParams<{ id: string }>();
  const form = useForm<CreateTimesheetEntrySchema>({
    resolver: zodResolver(createTimesheetEntryFormSchema),
    defaultValues: {
      projectId: entryDetails ? entryDetails.projectId : undefined,
      workType: entryDetails ? "BUG_FIXING" : "",
      task: entryDetails ? entryDetails.task : "",
      hours: entryDetails ? entryDetails.hours : 1,
    },
  });

  const {
    control,
    formState: { isDirty, isValid, dirtyFields },
    handleSubmit,
    reset,
  } = form;

  const isEditing = Object.keys(entryDetails || {}).length;

  const handleClose = (open: boolean) => {
    if (!open) {
      onClose();
      reset();
    }
  };

  const onSubmit: SubmitHandler<CreateTimesheetEntrySchema> = async (
    values,
  ) => {
    if (isEditing) {
      const updatedEntry = {
        id: entryDetails?.id,
        date: entryDetails?.date,
        ...Object.keys(dirtyFields).reduce(
          (acc, field) => ({
            ...acc,
            [field]: values[field as keyof CreateTimesheetEntrySchema],
          }),
          {},
        ),
        ...(Object.keys(dirtyFields).includes("projectId")
          ? {
              project: mockProjects.find(
                (project) => project.id === values.projectId,
              ),
            }
          : {}),
      } as Partial<EnrichedTimesheetEntry>;

      onEditEntry(updatedEntry);
    } else {
      const newEntry: TimesheetEntry = {
        id: mockTimesheetEntries[mockTimesheetEntries.length - 1].id + 1,
        date: entryDate,
        hours: values.hours,
        projectId: values.projectId,
        task: values.task,
        timesheetId: Number(id),
      };

      onAddEntry(newEntry);
    }
    handleClose(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent
        className="px-0 md:max-w-[646px] py-5"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader className="border-b px-6 border-gray-200 pb-5">
          <DialogTitle>{!isEditing ? "Add New" : "Update"} Entry</DialogTitle>
          <DialogDescription hidden />
        </DialogHeader>
        <div className="px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Controller
              name="projectId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-sm">
                  <FieldLabel>Select Project *</FieldLabel>
                  <Select
                    value={field.value?.toString()}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Project Name" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockProjects.map((project) => (
                        <SelectItem
                          key={project.id}
                          value={project.id.toString()}
                        >
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="workType"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-sm">
                  <FieldLabel>Type of Work *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Bug fixes" />
                    </SelectTrigger>
                    <SelectContent>
                      {workTypeOptions.map((workType) => (
                        <SelectItem key={workType.value} value={workType.value}>
                          {workType.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="task"
              control={control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="max-w-[500px]"
                >
                  <FieldLabel htmlFor={field.name}>
                    Task Description *
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="Write text here..."
                    rows={8}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <FieldDescription className="text-xs text-gray-500 ml-0.5">
                    A note for extra info
                  </FieldDescription>
                </Field>
              )}
            />
            <Controller
              name="hours"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="max-w-fit">
                  <FieldLabel htmlFor={field.name}>Hours *</FieldLabel>
                  <HoursField value={field.value} onChange={field.onChange} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <DialogFooter className="gap-3.5 border-t border-gray-200 pt-5 -mx-6 px-6 sm:justify-start">
              <Button
                type="submit"
                className="grow min-h-[37px]"
                disabled={!isValid || !isDirty}
              >
                {isEditing ? "Save" : "Add"} entry
              </Button>
              <Button
                type="button"
                variant="outline"
                className="grow min-h-[37px]"
                onClick={() => handleClose(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ManageEntryModal;
