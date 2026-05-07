import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import DateRangePicker from "../../components/ui/date-range-picker";

// Minimal jsdom polyfills commonly needed by Radix UI (Popover).
if (!("ResizeObserver" in globalThis)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!("matchMedia" in globalThis)) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).matchMedia = () => ({
    matches: false,
    media: "",
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  });
}

// Avoid brittle calendar DOM interactions; focus on DateRangePicker behavior.
vi.mock("@/components/ui/calendar", () => ({
  Calendar: (props: { onSelect?: (range: unknown) => void }) => (
    <button
      type="button"
      onClick={() =>
        props.onSelect?.({
          from: new Date("2026-05-01T00:00:00.000Z"),
          to: new Date("2026-05-07T00:00:00.000Z"),
        })
      }
    >
      Mock calendar select
    </button>
  ),
}));

describe("DateRangePicker", () => {
  it("renders placeholder, then shows formatted range after selection", async () => {
    render(<DateRangePicker placeholder="Pick a date range" />);

    // Initial state: placeholder shown.
    expect(screen.getByText("Pick a date range")).toBeTruthy();

    // Open popover (trigger is the button).
    fireEvent.click(screen.getByRole("button", { name: /pick a date range/i }));

    // Select a date range via mocked Calendar.
    fireEvent.click(
      screen.getByRole("button", { name: /mock calendar select/i }),
    );

    // The trigger text should update with formatted dates.
    expect(screen.getByText("May 01, 2026 - May 07, 2026")).toBeTruthy();
  });
});
