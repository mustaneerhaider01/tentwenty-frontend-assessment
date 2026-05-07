import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <Loader className="size-10 animate-spin text-primary-700" />
    </div>
  );
}

export default Loading;
