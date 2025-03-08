"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Product {
  title: string;
  link: string;
  thumbnail: string;
}

export const HeroParallax = ({
  products,
}: {
  products: Product[];
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  return (
    <div
      ref={containerRef}
      className="h-[300vh] py-40 overflow-hidden bg-black"
    >
      <motion.div
        style={{ scale, opacity }}
        className="sticky top-0 flex min-h-screen items-center justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {products.map((product) => (
            <a
              key={product.title}
              href={product.link}
              className="relative group rounded-lg overflow-hidden"
            >
              <div className="relative aspect-[16/9]">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="object-cover w-full h-full rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-xl font-bold">{product.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}; 