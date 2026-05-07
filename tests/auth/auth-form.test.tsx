import { describe, expect, it, vi, beforeEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import AuthForm from "../../components/auth/auth-form";

// Minimal jsdom polyfills commonly needed by Radix UI.
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

const pushMock = vi.hoisted(() => vi.fn());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

const signInMock = vi.hoisted(() => vi.fn());
vi.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => signInMock(...args),
}));

vi.mock("sonner", () => ({
  toast: {
    loading: vi.fn(() => "toast-id"),
    dismiss: vi.fn(),
    error: vi.fn(),
  },
}));

describe("AuthForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows validation errors and does not attempt sign-in", async () => {
    render(<AuthForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "not-an-email" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    // Real-world expectation: invalid inputs block auth request.
    await waitFor(() => {
      expect(signInMock).not.toHaveBeenCalled();
    });

    // Errors from zod schema should be visible to the user.
    expect(screen.getByText(/invalid email/i)).toBeTruthy();
    expect(screen.getByText(/atleast 8 characters/i)).toBeTruthy();
  });

  it("submits credentials and navigates on successful sign-in", async () => {
    signInMock.mockResolvedValue({ error: null });

    render(<AuthForm />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });
    const signInButtons = screen.getAllByRole("button", { name: /sign in/i });
    const submitButton =
      signInButtons.find((btn) => btn.getAttribute("type") === "submit") ??
      signInButtons[0];
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signInMock).toHaveBeenCalledWith("credentials", {
        email: "user@example.com",
        password: "password123",
        redirect: false,
      });
    });

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/");
    });
  });
});
