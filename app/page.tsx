import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { SkillsSection } from "@/components/skills-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <SkillsSection /> 
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}