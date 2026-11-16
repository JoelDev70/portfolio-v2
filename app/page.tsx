import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { ProjectsSection } from "@/components/projects-section";
import { SkillsSection } from "@/components/skills-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { ContactSection } from "@/components/contact-section";
import { prisma } from "@/lib/prisma";
import { AISection } from "@/components/ai-section";

export default async function Home() {
  // On fetch les projets directement ici (Server Component)
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      {/* <AISection />  */}
      <ServicesSection />
      <ProjectsSection projects={projects} />
      <SkillsSection />
      <TestimonialsSection />
      <ContactSection />
    </main>
  );
}




// import { Hero } from "@/components/hero";
// import { ServicesSection } from "@/components/services-section";
// import { ProjectsSection } from "@/components/projects-section";
// import { TestimonialsSection } from "@/components/testimonials-section";
// import { ContactSection } from "@/components/contact-section";
// import { SkillsSection } from "@/components/skills-section";
// import { FloatingElements } from "@/components/floating-elements"; 


// export default function Home() {
//   return (
//     <main className="flex flex-col items-center justify-center">
//       <FloatingElements /> 
//       <Hero />
//       <ServicesSection />
//       <ProjectsSection />
//       <SkillsSection /> 
//       <TestimonialsSection />
//       <ContactSection />
//     </main>
//   );
// }