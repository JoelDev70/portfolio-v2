import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // On fetch les projets directement ici (Server Component)
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}

