import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { ProjectCarousel } from "@/components/home/ProjectCarousel";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <ProjectCarousel />
      <SpecialtiesSection />
      <TestimonialsSection />
    </Layout>
  );
};

export default Index;
