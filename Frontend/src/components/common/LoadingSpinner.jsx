import { Loader2 } from "lucide-react";

const LoadingSpinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3">
      <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400" />
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
        {label}
      </p>
    </div>
  );
};

export default LoadingSpinner;