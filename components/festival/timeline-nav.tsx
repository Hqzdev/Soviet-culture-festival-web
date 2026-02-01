"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const periods = [
  { id: "period-1945", years: "1945–1953", label: "Триумф и траур" },
  { id: "period-1953", years: "1953–1964", label: "Оттепель" },
  { id: "period-1964", years: "1964–1982", label: "Застой" },
  { id: "period-1985", years: "1985–1991", label: "Перестройка" },
];

export function TimelineNav() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 mb-8 text-sm font-medium tracking-widest uppercase glass rounded-full text-primary">
              Хронология
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Путешествие во времени
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Четыре эпохи советской культуры — от победы до перестройки
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-border hidden lg:block" />

            <div className="grid lg:grid-cols-4 gap-6">
              {periods.map((period, index) => (
                <motion.a
                  key={period.id}
                  href={`#${period.id}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative"
                >
                  {/* Dot */}
                  <div className="hidden lg:flex absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-border group-hover:bg-primary transition-colors duration-300 z-10" />

                  {/* Card */}
                  <div className="glass rounded-2xl p-6 lg:mt-8 hover:bg-secondary/50 transition-all duration-300">
                    <span className="text-primary font-mono text-sm">
                      {period.years}
                    </span>
                    <h3 className="text-xl font-semibold mt-2 group-hover:text-primary transition-colors">
                      {period.label}
                    </h3>
                    <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                      <span>Исследовать</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
