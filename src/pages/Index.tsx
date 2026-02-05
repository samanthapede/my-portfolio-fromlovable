import { HeroSection } from "@/components/home/HeroSection";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ProjectShowcase />
      <AboutSection />
      <SpecialtiesSection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
