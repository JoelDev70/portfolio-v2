"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, ShieldCheck, Rocket } from "lucide-react";

const services = [
  {
    icon: MonitorSmartphone,
    title: "Développement Fullstack",
    description: "Conception d'applications web modernes et réactives avec Next.js, React et Django. Interfaces soignées et expérience fluide.",
  },
  {
    icon: ShieldCheck,
    title: "Sécurité & Architecture",
    description: "Architectures robustes, authentification sécurisée (JWT), tests automatisés et bonnes pratiques de sécurité de niveau bancaire.",
  },
  {
    icon: Rocket,
    title: "Déploiement & DevOps",
    description: "Gestion de bases PostgreSQL, conteneurisation Docker, et déploiement continu (CI/CD) sur des plateformes cloud comme Vercel.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-24 px-4 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight">Ce que je fais</h2>
        <div className="h-px bg-border flex-1"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="p-6 bg-muted/10 border border-border rounded-2xl hover:border-accent/50 transition-colors group"
          >
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <service.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}