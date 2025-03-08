"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div ref={ref} className={`relative ${className}`}>
      <div className="absolute -left-20 top-3">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          animate={{
            height: svgHeight,
          }}
          className="relative h-full w-20"
        >
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="absolute left-8 top-0 h-full w-[2px] text-slate-400/20"
            fill="none"
          >
            <line
              x1="1"
              y1="0"
              x2="1"
              y2={svgHeight}
              strokeWidth="2"
              stroke="currentColor"
              className="opacity-20"
            />
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2={y1}
              strokeWidth="2"
              stroke="currentColor"
              className="opacity-100"
            />
          </svg>
        </motion.div>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
}; 