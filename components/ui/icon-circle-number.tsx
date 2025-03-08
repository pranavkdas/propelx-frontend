import { cn } from "@/lib/utils";

interface IconCircleNumberProps {
  number: number;
  className?: string;
}

export const IconCircleNumber = ({ number, className }: IconCircleNumberProps) => {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center",
        "text-blue-600 dark:text-blue-400 font-bold text-lg",
        "border-2 border-blue-500/20 dark:border-blue-400/20",
        className
      )}
    >
      {number}
    </div>
  );
}; 