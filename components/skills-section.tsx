"use client";

import { motion } from "framer-motion";
import { Code2, Database, Server, Smartphone } from "lucide-react";

const skills = [
  {
    category: "Frontend",
    icon: Code2,
    items: [
      { name: "React / Next.js", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "Tailwind CSS", level: 95 },
      { name: "HTML / CSS", level: 90 },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    items: [
      { name: "Django / Python", level: 85 },
      { name: "Node.js / Express", level: 80 },
      { name: "API REST", level: 90 },
      { name: "Authentification (JWT)", level: 85 },
    ],
  },
  {
    category: "Base de données & DevOps",
    icon: Database,
    items: [
      { name: "PostgreSQL / Prisma", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Git / GitHub", level: 90 },
      { name: "CI/CD", level: 75 },
    ],
  },
  {
    category: "Mobile & Autres",
    icon: Smartphone,
    items: [
      { name: "React Native (bases)", level: 60 },
      { name: "Figma (UI Design)", level: 70 },
      { name: "Tests unitaires", level: 80 },
      { name: "Sécurité Web", level: 75 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Ma Stack Technique</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((category, catIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            className="p-6 bg-muted/10 border border-border rounded-2xl hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-accent/10 rounded-lg">
                <category.icon className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-xl font-bold">{category.category}</h3>
            </div>

            <div className="space-y-4">
              {category.items.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                   <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full bg-accent rounded-full"
                  />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}