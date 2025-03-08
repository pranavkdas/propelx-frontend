"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Card {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export const CardStack = ({ items }: { items: Card[] }) => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  return (
    <div className="relative h-[400px] w-full">
      <AnimatePresence>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className={`absolute inset-0 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg cursor-pointer
              ${selectedCard === item.id ? "z-30" : "z-" + (20 - index)}`}
            initial={false}
            animate={{
              scale: selectedCard === item.id ? 1.05 : 1,
              y: selectedCard === item.id ? -20 : index * 20,
              opacity: selectedCard === null ? 1 : selectedCard === item.id ? 1 : 0.7,
            }}
            transition={{
              duration: 0.2,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            onClick={() => setSelectedCard(selectedCard === item.id ? null : item.id)}
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400">{item.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}; 