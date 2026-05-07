"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { type DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateRangePickerProps {
  placeholder?: string;
  className?: string;
}

function DateRangePicker({
  placeholder = "Pick a date",
  className,
}: DateRangePickerProps) {
  const [date, setDate] = useState<DateRange | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date-ranger-picker"
          className={cn(
            "justify-start pl-3 pr-2.5 py-5 font-normal shadow-none border-gray-300 rounded-lg",
            className,
          )}
        >
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "LLL dd, y")} -{" "}
                {format(date.to, "LLL dd, y")}
              </>
            ) : (
              format(date.from, "LLL dd, y")
            )
          ) : (
            <span className="text-gray-500">{placeholder}</span>
          )}
          <ChevronDownIcon className="pointer-events-none size-4 text-gray-500 ml-auto" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

export default DateRangePicker;
