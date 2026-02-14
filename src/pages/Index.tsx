import { HeroSection } from "@/components/home/HeroSection";
import { ConversationSection } from "@/components/home/ConversationSection";
import { ProjectShowcase } from "@/components/home/ProjectShowcase";
import { AboutSection } from "@/components/home/AboutSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LazySection } from "@/components/LazySection";

const Index = () => {
  return (
    <>
      <HeroSection />
      <LazySection minHeight="30vh">
        <ConversationSection />
      </LazySection>
      <LazySection minHeight="35vh">
        <ProjectShowcase />
      </LazySection>
      <LazySection minHeight="40vh">
        <AboutSection />
      </LazySection>
      <LazySection minHeight="35vh">
        <TestimonialsSection />
      </LazySection>
    </>
  );
};

export default Index;
