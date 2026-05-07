"use client";

import { Minus, Plus } from "lucide-react";

interface HoursFieldProps {
  value: number;
  onChange: (value: number) => void;
}

export default function HoursField({ value, onChange }: HoursFieldProps) {
  const decrement = () => {
    if (value <= 1) return;
    onChange(value - 1);
  };

  const increment = () => {
    if (value >= 24) return;
    onChange(value + 1);
  };

  return (
    <div
      className="
        inline-flex items-center overflow-hidden
        rounded-lg border border-gray-300
      "
    >
      <button
        type="button"
        onClick={decrement}
        className="
          flex h-10 w-9 items-center justify-center
          border-r border-gray-300
          bg-gray-100
        "
      >
        <Minus className="size-4 text-gray-800 stroke-3" />
      </button>

      <div
        className="
          flex h-10 min-w-11 items-center
          justify-center text-sm text-gray-500
        "
      >
        {value}
      </div>

      <button
        type="button"
        onClick={increment}
        className="
          flex h-10 w-9 items-center justify-center
          border-l border-gray-300
          bg-gray-100
        "
      >
        <Plus className="size-4 text-gray-800 stroke-3" />
      </button>
    </div>
  );
}
