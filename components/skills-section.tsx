"use client";

import { useRef } from "react";
import { motion, useAnimationControls, useInView } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { SkillBadge } from "./skill-badge";
import { FloatingCTA } from "./floating-cta"; 

const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    core: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"],
    learning: ["Framer Motion"],
    // , "Three.js"
  },
  {
    id: "backend",
    title: "Backend",
    icon: Server,
    color: "text-green-400",
    bgColor: "bg-green-400/10",
    core: ["Django", "Python", "Node.js", "Express", "API REST"],
    learning: ["GraphQL", "WebSockets"],
  },
  {
    id: "database",
    title: "Data & DevOps",
    icon: Database,
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    core: ["PostgreSQL", "Prisma", "Docker", "Git", "CI/CD"],
    learning: ["Redis", "AWS"],
  },
  {
    id: "mobile",
    title: "Mobile & Design",
    icon: Smartphone,
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    core: ["Flutter", "Tests unitaires"],
    learning: ["Figma"],
    // , "React Native"
  },
];

export function SkillsSection() {
  const sectionRef = useRef(null);
  // On détecte quand la section est visible (à 50% de sa hauteur)
  const isInView = useInView(sectionRef, { once: false, margin: "-50% 0px -50% 0px" });

  return (
    <>
      {/* On passe la prop "isVisible" au CTA */}
      <FloatingCTA isVisible={isInView} />

      <section ref={sectionRef} className="py-24 px-4 max-w-5xl mx-auto relative">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />

        <div className="relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Ma <span className="text-accent">Stack</span> Technique
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Les technologies que j'utilise au quotidien pour construire des applications web robustes et performantes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {skillCategories.map((category, catIndex) => {
              const controls = useAnimationControls();

              const handleMouseEnter = () => {
                controls.start((i) => ({
                  x: Math.random() * 20 - 10,
                  y: Math.random() * 20 - 10,
                  rotate: Math.random() * 10 - 5,
                  transition: { type: "spring", stiffness: 300, damping: 10 }
                }));
              };

              const handleMouseLeave = () => {
                controls.start({
                  x: 0,
                  y: 0,
                  rotate: 0,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                });
              };

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                  className="h-full"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <SpotlightCard className="p-6 md:p-8 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`p-2.5 rounded-lg ${category.bgColor}`}>
                        <category.icon className={`h-5 w-5 ${category.color}`} />
                      </div>
                      <h3 className="text-xl font-bold">{category.title}</h3>
                    </div>

                    <div className="flex-1">
                      <motion.div custom={0} animate={controls} className="flex flex-wrap gap-2.5 mb-6">
                        {category.core.map((skill, i) => (
                          <motion.div key={skill} custom={i} animate={controls}>
                            <SkillBadge name={skill} delay={i * 0.05} />
                          </motion.div>
                        ))}
                      </motion.div>

                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                          En cours d'exploration
                        </h4>
                        <motion.div custom={1} animate={controls} className="flex flex-wrap gap-2">
                          {category.learning.map((skill, i) => (
                            <motion.div key={skill} custom={i} animate={controls}>
                              <SkillBadge name={skill} isLearning delay={i * 0.05} />
                            </motion.div>
                          ))}
                        </motion.div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}


