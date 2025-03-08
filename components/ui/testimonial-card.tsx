import { Card } from "@/components/ui/card";
import Image from "next/image";

interface TestimonialProps {
  testimonial: {
    name: string;
    role: string;
    company: string;
    image: string;
    quote: string;
  };
}

export const TestimonialCard = ({ testimonial }: TestimonialProps) => {
  return (
    <Card className="p-6 h-full bg-white dark:bg-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col">
      <div className="flex-1">
        <div className="relative w-14 h-14 mb-6">
          <div className="absolute -left-1 -top-1 w-14 h-14 bg-blue-500/20 rounded-full animate-pulse" />
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-700">
            {/* Placeholder avatar until image is loaded */}
            <div className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-400">
              {testimonial.name[0]}
            </div>
            {/* Uncomment when you have actual images */}
            {/* <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            /> */}
          </div>
        </div>

        <blockquote className="text-slate-700 dark:text-slate-300 mb-6 relative">
          <span className="absolute -left-2 -top-2 text-4xl text-blue-500/20">"</span>
          <p className="relative z-10">{testimonial.quote}</p>
        </blockquote>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 mt-4">
        <p className="font-semibold text-slate-900 dark:text-white">
          {testimonial.name}
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          {testimonial.role} at {testimonial.company}
        </p>
      </div>
    </Card>
  );
}; 