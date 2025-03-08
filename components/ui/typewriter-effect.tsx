"use client";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect } from "react";
import { cn } from "@/lib/utils";


export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.1,
          delay: stagger(0.1),
        }
      );
    }
  }, [isInView, animate]);

  return (
    <motion.div
      ref={scope}
      className={cn("text-center text-4xl md:text-6xl font-bold", className)}
    >
      {words.map((word, idx) => (
        <motion.span
          initial={{ opacity: 0 }}
          key={`${word.text}-${idx}`}
          className={cn("inline-block", word.className)}
        >
          {word.text}&nbsp;
        </motion.span>
      ))}
    </motion.div>
  );
}; 