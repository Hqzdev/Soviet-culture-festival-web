"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, BookOpen, Palette, Film } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CultureBlock {
  type: "music" | "literature" | "painting" | "cinema";
  title: string;
  content: string;
}

interface PeriodData {
  id: string;
  years: string;
  title: string;
  subtitle: string;
  image: string;
  culture: CultureBlock[];
}

const PERIOD_LABELS = ["1945–1953", "1953–1964", "1964–1982", "1985–1991"];
const FREQUENCIES = ["74.0", "75.3", "76.8", "78.2"];
const ERA_GRADIENTS = [
  "from-amber-950/40 via-background to-background",
  "from-sky-950/30 via-background to-background",
  "from-stone-800/40 via-background to-background",
  "from-violet-950/30 via-background to-background",
];

const iconMap = {
  music: Music,
  literature: BookOpen,
  painting: Palette,
  cinema: Film,
};

function excerpt(text: string, maxLength = 120) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "…";
}

export function RadioSection({ periods }: { periods: PeriodData[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [signalPlaying, setSignalPlaying] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);

  const period = periods[selectedIndex] ?? periods[0];

  const handleDialChange = (index: number) => {
    if (index === selectedIndex) return;
    setSignalPlaying(true);
    setSelectedIndex(index);
    const t = setTimeout(() => setSignalPlaying(false), 1800);
    return () => clearTimeout(t);
  };

  return (
    <section
      id="radio"
      className="relative py-24 md:py-32 overflow-hidden transition-colors duration-700"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-b ${ERA_GRADIENTS[selectedIndex]} transition-all duration-700`}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest uppercase rounded-full text-primary bg-primary/10 border border-border">
            Интерактив
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Радиоточка времени
          </h2>
          <p className="text-muted-foreground mb-10">
            Крутите ручку — переключайте эпоху. Откройте витрину культуры выбранного периода.
          </p>

          {/* Стеклянная карточка: ручка | частота | кнопка */}
          <motion.div
            layout
            className="glass rounded-3xl border border-border/60 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Круглая ручка с делениями */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Ручка
              </p>
              <div className="relative w-36 h-36 rounded-full border-2 border-border bg-muted/30 flex items-center justify-center">
                {/* 4 деления по кругу: верх, право, низ, лево */}
                {[0, 1, 2, 3].map((i) => {
                  const angle = (i * 90 - 90) * (Math.PI / 180);
                  const r = 44;
                  const x = 50 + r * Math.cos(angle);
                  const y = 50 + r * Math.sin(angle);
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleDialChange(i)}
                      className={`absolute w-9 h-9 rounded-full text-xs font-semibold transition-all z-10 ${
                        selectedIndex === i
                          ? "bg-primary text-primary-foreground scale-110 ring-2 ring-primary/50"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                      }`}
                      style={{
                        left: `${x}%`,
                        top: `${y}%`,
                        transform: "translate(-50%, -50%)",
                      }}
                      title={PERIOD_LABELS[i]}
                    >
                      {i + 1}
                    </button>
                  );
                })}
                {/* Указатель (ручка) */}
                <div
                  className="absolute w-2 h-6 rounded-full bg-primary shadow-md pointer-events-none"
                  style={{
                    transform: `rotate(${selectedIndex * 90}deg) translateY(-22px)`,
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground text-center font-medium">
                {PERIOD_LABELS[selectedIndex]}
              </p>
            </div>

            {/* Частота + анимация сигнала */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Частота
              </p>
              <div className="font-mono text-2xl md:text-3xl font-bold tabular-nums">
                {FREQUENCIES[selectedIndex]} MHz
              </div>
              <AnimatePresence mode="wait">
                {signalPlaying && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-1 mt-2"
                  >
                    {[0, 1, 2, 3, 4].map((i) => (
                      <motion.span
                        key={i}
                        animate={{ height: ["4px", "12px", "4px"] }}
                        transition={{
                          duration: 0.4,
                          repeat: 2,
                          delay: i * 0.08,
                        }}
                        className="w-1 bg-primary rounded-full"
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Кнопка «Открыть витрину эпохи» */}
            <Button
              size="lg"
              className="shrink-0"
              onClick={() => setShowcaseOpen(true)}
            >
              Открыть витрину эпохи
            </Button>
          </motion.div>

          {/* Мини-карточка: что звучит/читают/смотрят/рисуют */}
          <motion.div
            key={selectedIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 glass rounded-2xl border border-border/50 p-4 md:p-6"
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Что звучит, читают, смотрят и рисуют в это время
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {period.culture.map((block) => {
                const Icon = iconMap[block.type];
                return (
                  <div
                    key={block.type}
                    className="rounded-xl bg-muted/40 p-3 border border-border/40"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-primary shrink-0" />
                      <span className="font-medium text-sm">{block.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {excerpt(block.content, 80)}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Модальное окно: Витрина эпохи */}
      <Dialog open={showcaseOpen} onOpenChange={setShowcaseOpen}>
        <DialogContent className="glass border-border/50 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">
              Витрина эпохи: {period.years} — {period.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            {period.culture.map((block) => {
              const Icon = iconMap[block.type];
              return (
                <div key={block.type} className="space-y-2">
                  <div className="flex items-center gap-2 font-semibold">
                    <Icon className="w-5 h-5 text-primary" />
                    {block.title}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                    {excerpt(block.content, 220)}
                  </p>
                </div>
              );
            })}
            <div className="pt-4 border-t border-border">
              <Button
                className="w-full"
                onClick={() => {
                  setShowcaseOpen(false);
                  setPosterOpen(true);
                }}
              >
                Сгенерировать афишу эпохи
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Модальное окно: Афиша эпохи (готовый вид) */}
      <Dialog open={posterOpen} onOpenChange={setPosterOpen}>
        <DialogContent className="glass border-border/50 max-w-lg p-0 overflow-hidden">
          <div className="relative aspect-[3/4] bg-muted">
            <Image
              src={period.image || "/placeholder.svg"}
              alt={period.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm opacity-90">{period.years}</p>
              <h3 className="text-2xl font-bold">{period.title}</h3>
              <p className="text-sm opacity-80 mt-1">{period.subtitle}</p>
            </div>
          </div>
          <p className="p-4 text-center text-sm text-muted-foreground">
            Афиша эпохи «{period.title}» — советская культура второй половины XX века
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
