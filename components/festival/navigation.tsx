"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "О проекте", href: "#about" },
  { label: "1945–1953", href: "#period-1945" },
  { label: "1953–1964", href: "#period-1953" },
  { label: "1964–1982", href: "#period-1964" },
  { label: "1985–1991", href: "#period-1985" },
  { label: "Капсула времени", href: "#capsule" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center pt-4 px-4 gap-3"
      >
        {/* Кружок с иконкой — отдельно */}
        <a
          href="#"
          className="flex shrink-0 items-center justify-center rounded-full overflow-hidden border border-border bg-background/60 hover:bg-muted/50 transition-colors"
          aria-label="Код Времени"
        >
          <Image
            src="/images/icon.png"
            alt=""
            width={60}
            height={60}
            className="rounded-full object-cover"
          />
        </a>

        {/* Капсула с пунктами — отдельно, не соединена с кружком */}
        <nav className="hidden lg:flex items-center rounded-full bg-muted/50 border border-border px-4 py-2 gap-1">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-background/60 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Кнопка мобильного меню */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden shrink-0 rounded-full"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <nav className="relative z-50 flex flex-col items-center justify-center h-full gap-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
