import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center">
      <Hero />
      <ProjectsSection />
    </main>
  );
}