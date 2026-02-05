import { HeroSection } from "@/components/home/HeroSection";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { KeyStrengthsSection } from "@/components/home/KeyStrengthsSection";
import { AboutSection } from "@/components/home/AboutSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <KeyStrengthsSection />
      <AboutSection />
      <SpecialtiesSection />
      <PhilosophySection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
