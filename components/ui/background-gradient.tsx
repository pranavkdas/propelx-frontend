"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradient = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const handleMouseMove = (event: MouseEvent) => {
      if (!hovered) return;

      const rect = div.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      div.style.setProperty("--mouse-x", `${x}px`);
      div.style.setProperty("--mouse-y", `${y}px`);
    };

    div.addEventListener("mousemove", handleMouseMove);
    return () => div.removeEventListener("mousemove", handleMouseMove);
  }, [hovered]);

  return (
    <div
      ref={divRef}
      className={cn(
        "relative h-full bg-slate-950 rounded-[22px] p-0.5 transition-all duration-500",
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0 rounded-[22px] transition-all duration-500">
        <div
          className={cn(
            "absolute inset-[-1px] rounded-[22px] opacity-0 transition-all duration-500",
            hovered && "opacity-100"
          )}
          style={{
            background:
              "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(120,119,198,0.15), transparent 40%)",
          }}
        />
      </div>
      <div className="relative h-full bg-white dark:bg-slate-900 rounded-[20px]">
        {children}
      </div>
    </div>
  );
}; 