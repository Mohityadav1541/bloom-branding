import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ClientLogos } from "@/components/home/ClientLogos";
import { InstagramPreview } from "@/components/home/InstagramPreview";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesPreview />
        <PortfolioPreview />
        <StatsSection />
        <TestimonialsSection />
        <ClientLogos />
        <InstagramPreview />
        <CTASection />
      </main>
      <Footer />
    </PageTransition>
  );
};

export default Index;
