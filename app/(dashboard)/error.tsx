"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-[30vh] items-center justify-center gap-4">
      <h1 className="text-3xl text-destructive font-bold">
        An Error Occurred!
      </h1>
      <h2 className="text-xl text-destructive">
        {error.message || "Something went wrong!"}
      </h2>
      <Button
        onClick={
          // Attempt to recover by re-fetching and re-rendering the segment
          () => unstable_retry()
        }
        className="w-24"
      >
        Try again
      </Button>
    </div>
  );
}
