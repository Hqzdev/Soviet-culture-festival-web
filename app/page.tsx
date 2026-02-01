import { Navigation } from "@/components/festival/navigation";
import { Hero } from "@/components/festival/hero";
import { About } from "@/components/festival/about";
import { CultureGallery } from "@/components/festival/culture-gallery";
import { TimelineNav } from "@/components/festival/timeline-nav";
import { RadioSection } from "@/components/festival/radio-section";
import { PeriodSection } from "@/components/festival/period-section";
import { Footer } from "@/components/festival/footer";
import { periodsData } from "@/lib/periods-data";

export default function FestivalPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <About />
      <CultureGallery />
      <TimelineNav />
      <RadioSection periods={periodsData} />
      
      {/* Period Sections */}
      {periodsData.map((period) => (
        <PeriodSection key={period.id} period={period} />
      ))}
      
      <Footer />
    </main>
  );
}
