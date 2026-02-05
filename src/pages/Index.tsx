import { HeroSection } from "@/components/home/HeroSection";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { KeyStrengthsSection } from "@/components/home/KeyStrengthsSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { PhilosophySection } from "@/components/home/PhilosophySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <AboutSection />
      <KeyStrengthsSection />
      <SpecialtiesSection />
      <PhilosophySection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
