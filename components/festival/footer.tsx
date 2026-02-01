"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const CAPSULE_LINES = [
  "Советская культура 1945–1991: музыка, кино, литература, живопись.",
  "Фестиваль «Код Времени» — краткий вывод: мы сохраняем голоса и образы эпохи,",
  "чтобы память не растворилась и следующие поколения могли переосмыслить наследие.",
  "",
  "Год создания: 2026",
];

const CHAR_DELAY_MS = 28;
const LINE_START_DELAY_MS = 200;

function useTypewriter(lines: string[], isActive: boolean) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!isActive || lines.length === 0 || lineIndex >= lines.length) return;

    const line = lines[lineIndex];
    const lineComplete = charIndex >= (line?.length ?? 0);

    if (lineComplete) {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line]);
        setLineIndex((i) => i + 1);
        setCharIndex(0);
      }, LINE_START_DELAY_MS);
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => setCharIndex((c) => c + 1), CHAR_DELAY_MS);
    return () => clearTimeout(t);
  }, [isActive, lines, lineIndex, charIndex]);

  const isComplete = lineIndex >= lines.length && lines.length > 0;
  const currentLine = lines[lineIndex] ?? "";
  const currentVisible = currentLine.slice(0, charIndex);

  return {
    displayedLines,
    currentLine: currentVisible,
    showCursor: isActive && !isComplete,
    isComplete,
  };
}

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [startTyping, setStartTyping] = useState(false);

  useEffect(() => {
    if (isInView && !startTyping) setStartTyping(true);
  }, [isInView, startTyping]);

  const { displayedLines, currentLine, showCursor, isComplete } = useTypewriter(
    CAPSULE_LINES,
    startTyping
  );

  return (
    <footer id="capsule" className="relative py-24 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-5xl mx-auto"
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest uppercase rounded-full text-primary bg-primary/10 border border-border">
            Капсула времени
          </span>

          <div
            className="rounded-2xl border border-border bg-muted/50 dark:bg-muted/30 p-6 md:p-10 font-mono text-sm md:text-base leading-relaxed text-foreground selection:bg-primary/20"
            style={{ minHeight: "260px" }}
          >
            <div className="space-y-0.5 text-muted-foreground">
              {displayedLines.map((line, i) => (
                <div key={i}>
                  {line || "\u00A0"}
                </div>
              ))}
              <div className="inline">
                {currentLine}
                {showCursor && (
                  <span
                    className="inline-block w-2 h-4 ml-0.5 align-middle bg-primary animate-pulse"
                    style={{ animationDuration: "1s" }}
                    aria-hidden
                  />
                )}
              </div>
              {isComplete && (
                <span
                  className="inline-block w-2 h-4 align-middle bg-primary/60 animate-pulse"
                  style={{ animationDuration: "1.2s" }}
                  aria-hidden
                />
              )}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              Проект создан в образовательных целях. Все материалы носят
              информационный характер.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
