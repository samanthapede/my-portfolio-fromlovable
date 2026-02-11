import { HeroSection } from "@/components/home/HeroSection";
import { ConversationSection } from "@/components/home/ConversationSection";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <ConversationSection />
      <ProjectShowcase />
      <AboutSection />
      <SpecialtiesSection />
      <TestimonialsSection />
    </>
  );
};

export default Index;
