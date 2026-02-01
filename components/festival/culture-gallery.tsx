"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const galleryItems = [
  {
    image: "/images/music-soviet.jpg",
    title: "Музыка эпохи",
    description: "От победных маршей до рок-н-ролла",
    spravka:
      "Советская музыка — от симфоний Шостаковича и Прокофьева до бардовской песни и «Магнитиздата». Эстрада, рок-группы и фестивали переплетались с цензурой и официальной культурой, формируя звуковой ландшафт эпохи.",
  },
  {
    image: "/images/cinema-soviet.jpg",
    title: "Кинематограф",
    description: "Золотой век советского кино",
    spravka:
      "Мосфильм, Ленфильм и студии республик выпускали фильмы, которые становились событиями. Тарковский, Рязанов, Данелия, Михалков — режиссёры, чьи картины до сих пор входят в мировой киноканон и в быт советских зрителей.",
  },
  {
    image: "/images/literature-soviet.jpg",
    title: "Литература",
    description: "Слово как оружие и спасение",
    spravka:
      "«Толстые» журналы, самиздат и цензура задавали контекст. Солженицын, Бродский, Ахмадулина, Высоцкий — голоса, которые читали и переписывали от руки. Литература была и способом выживания, и формой сопротивления.",
  },
];

export function CultureGallery() {
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
              Культурное наследие
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
              Грани советской культуры
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Четыре измерения художественной жизни: музыка, литература,
              живопись и кинематограф
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group relative aspect-[4/5] rounded-3xl overflow-hidden cursor-pointer"
              >
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="glass rounded-2xl p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.spravka}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
