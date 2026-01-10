"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useRef } from "react";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import perfilPic from "@/app/assets/perfil.jpg";

const experiences = [
    {
        company: "Alcaldía de Cartagena",
        role: "Portal de Datos Abiertos - Dashboard Architect",
        period: "Actualmente",
        description: "Lidero el diseño y desarrollo de una plataforma moderna para la gestión y visualización de datos abiertos gubernamentales. Implementación de dashboards interactivos con Glassmorphism, gestión granular de permisos y visualización de métricas avanzadas.",
        skills: ["React 18", "TypeScript", "Tailwind CSS 4", "Framer Motion", "Recharts"],
        color: "#3b82f6"
    },
    {
        company: "Desarrollador Independiente",
        role: "Proyecto de Facturación Electrónica",
        period: "2023 - 2025",
        description: "Desarrollé un sistema de facturación electrónica para una empresa de productos de belleza, integrando soluciones de comercio electrónico y cumpliendo con la normativa fiscal vigente.",
        skills: ["TypeScript", "Next.js", "Facturación Electrónica", "E-commerce"],
        color: "#10b981"
    },
    {
        company: "Alcaldía de Cartagena",
        role: "Principal Backend Engineer",
        period: "2024",
        description: "Responsable del desarrollo de software backend para los sistemas administrativos. Lideré la implementación de APIs, gestión de bases de datos PostgreSQL y optimización de despliegues con Docker.",
        skills: ["Node.js", "PostgreSQL", "Docker", "APIs"],
        color: "#60a5fa"
    }
];

export default function Experience() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    return (
        <section id="experiencia" ref={containerRef} className="py-fluid-xl px-site-pad overflow-hidden">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-fluid-s mb-fluid-l"
                >
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-blue-500/5 flex items-center justify-center p-1 border border-white/5 overflow-hidden">
                        <Image
                            src={perfilPic}
                            alt="Naiker"
                            width={48}
                            height={48}
                            className="object-cover rounded-xl"
                        />
                    </div>
                    <h2 className="text-fluid-h2 font-bold tracking-tight">Mi <span className="text-blue-500">Trayectoria</span></h2>
                </motion.div>

                <div className="space-y-fluid-m relative">
                    {/* Background Line (Static) */}
                    <div className="absolute inset-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 h-full w-0.5 bg-zinc-200 dark:bg-zinc-800 opacity-30" />

                    {/* Animated Progress Line */}
                    <motion.div
                        className="absolute top-0 bottom-0 ml-5 -translate-x-px md:mx-auto md:translate-x-0 w-0.5 bg-gradient-to-b from-blue-500 via-blue-400 to-transparent z-10 origin-top h-full"
                        style={{ scaleY: scrollYProgress }}
                    />

                    {/* Luminous Beam following scroll */}
                    <motion.div
                        className="absolute ml-5 -translate-x-px md:mx-auto md:translate-x-0 w-2 h-20 bg-gradient-to-b from-transparent via-blue-500 to-transparent z-15 blur-sm"
                        style={{
                            top: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
                            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
                        }}
                    />

                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-fluid-m"
                        >
                            {/* Dot */}
                            <div className="flex items-center justify-center w-10 h-10 shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-background group-hover:border-blue-500 transition-colors shadow-xl z-20 absolute left-0 md:left-1/2 md:-ml-5">
                                <motion.div
                                    className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700"
                                    whileInView={{ backgroundColor: "#3b82f6", scale: 1.2 }}
                                    viewport={{ margin: "-200px" }}
                                />
                            </div>

                            {/* Card content... (rest of the mapping) */}
                            <div className="relative w-full ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] p-6 md:p-8 rounded-[24px] md:rounded-[32px] bg-white dark:bg-zinc-900/40 border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-xl shadow-2xl hover:shadow-blue-500/5 transition-all duration-500 overflow-hidden group/card">
                                <BorderBeam
                                    size={300}
                                    duration={12}
                                    colorFrom={exp.color}
                                    colorTo="#ffffff00"
                                    className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-700"
                                />

                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
                                    <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white leading-tight">{exp.role}</h3>
                                    <span
                                        className="shrink-0 text-[10px] md:text-xs font-mono font-bold px-3 py-1 rounded-full border self-start sm:self-center"
                                        style={{
                                            color: exp.color,
                                            backgroundColor: `${exp.color}10`,
                                            borderColor: `${exp.color}20`
                                        }}
                                    >
                                        {exp.period}
                                    </span>
                                </div>

                                <div className="text-zinc-600 dark:text-zinc-400 font-semibold mb-3 text-sm md:text-base relative z-10 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: exp.color }} />
                                    {exp.company}
                                </div>

                                <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-[15px] leading-relaxed mb-6 block relative z-10">
                                    {exp.description}
                                </p>

                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {exp.skills.map(s => (
                                        <span
                                            key={s}
                                            className="text-[9px] md:text-[10px] uppercase tracking-wider font-bold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-zinc-200/50 dark:border-white/5"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
