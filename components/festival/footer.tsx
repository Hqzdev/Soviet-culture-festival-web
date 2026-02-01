"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Анна Петрова", role: "Куратор проекта" },
  { name: "Дмитрий Иванов", role: "Исторический консультант" },
  { name: "Мария Сидорова", role: "UX/UI дизайнер" },
  { name: "Алексей Козлов", role: "Веб-разработчик" },
  { name: "Елена Новикова", role: "Контент-редактор" },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <footer id="team" className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Team Section */}
          <div className="mb-20">
            <span className="inline-block px-4 py-2 mb-8 text-sm font-medium tracking-widest uppercase glass rounded-full text-primary">
              Команда проекта
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-12 text-balance">
              Создатели фестиваля
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass rounded-2xl p-6 text-center hover:bg-secondary/50 transition-all duration-300"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-12 border-t border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">Код Времени</h3>
                <p className="text-muted-foreground">
                  Советская культура 1945–1991
                </p>
              </div>

              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <span>Цифровой фестиваль-архив</span>
                <span className="hidden md:inline">•</span>
                <span>2024</span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border/30 text-center">
              <p className="text-sm text-muted-foreground/70">
                Проект создан в образовательных целях. Все материалы носят
                информационный характер.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
