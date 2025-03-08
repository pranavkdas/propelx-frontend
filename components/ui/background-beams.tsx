"use client";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({
  className,
}: {
  className?: string;
}) => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveBeams = (e: MouseEvent) => {
      if (!beamsRef.current) return;
      
      const { clientX, clientY } = e;
      const x = clientX / window.innerWidth;
      const y = clientY / window.innerHeight;
      
      beamsRef.current.style.setProperty("--x", x.toString());
      beamsRef.current.style.setProperty("--y", y.toString());
    };

    window.addEventListener("mousemove", moveBeams);
    return () => window.removeEventListener("mousemove", moveBeams);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={cn(
        "pointer-events-none fixed inset-0 z-30 transition duration-300 lg:absolute",
        className
      )}
      style={{
        background: `radial-gradient(circle at calc(var(--x, 0.5) * 100%) calc(var(--y, 0.5) * 100%), 
          rgba(14, 165, 233, 0.15), 
          transparent 20%)`
      }}
    />
  );
}; 