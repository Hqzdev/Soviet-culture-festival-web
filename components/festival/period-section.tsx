"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Music, BookOpen, Palette, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  interactives?: { title: string; description: string; icon: string }[];
}

const iconMap = {
  music: Music,
  literature: BookOpen,
  painting: Palette,
  cinema: Film,
};

export function PeriodSection({ period }: { period: PeriodData }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<string>("music");

  const getIcon = (type: string) => {
    const Icon = iconMap[type as keyof typeof iconMap] || Music;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <section id={period.id} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src={period.image || "/placeholder.svg"}
          alt={period.title}
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Period Header */}
          <div className="mb-16">
            <span className="inline-block px-4 py-2 mb-6 text-sm font-medium tracking-widest uppercase glass rounded-full text-primary">
              {period.years}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              {period.title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              {period.subtitle}
            </p>
          </div>

          {/* Culture Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3">
              {period.culture.map((block) => (
                <Button
                  key={block.type}
                  variant={activeTab === block.type ? "default" : "outline"}
                  onClick={() => setActiveTab(block.type)}
                  className={`gap-2 transition-all duration-300 ${
                    activeTab === block.type
                      ? "bg-primary text-primary-foreground"
                      : "glass hover:bg-secondary"
                  }`}
                >
                  {getIcon(block.type)}
                  {block.title}
                </Button>
              ))}
            </div>
          </div>

          {/* Culture Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-8 md:p-12 mb-16"
          >
            {period.culture
              .filter((block) => block.type === activeTab)
              .map((block) => (
                <div key={block.type}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/20 text-primary">
                      {getIcon(block.type)}
                    </div>
                    <h3 className="text-2xl font-semibold">{block.title}</h3>
                  </div>
                  <p className="text-lg leading-relaxed text-foreground/90">
                    {block.content}
                  </p>
                </div>
              ))}
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
