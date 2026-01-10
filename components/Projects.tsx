"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import {
    AnimatedCard,
    CardVisual,
    CardBody,
    CardTitle,
    CardDescription,
} from "@/components/ui/animated-card";
import { Visual2 } from "@/components/ui/visual-2";

import Image from "next/image";

const projects = [
    {
        title: "Sistema de Gestión Coca-Cola",
        description: "Aplicación de escritorio para la gestión de productos y administración de personal de la empresa Coca-Cola. Desarrollada íntegramente con interfaces gráficas JFrame, lógica empresarial pura en Java y persistencia de datos.",
        tech: ["Java", "Swing / JFrame", "NetBeans", "MySQL"],
        image: "/project/cocacola.png",
        link: "https://www.youtube.com/watch?v=kGjp3VdUktI",
        github: "https://github.com/Naiker12/SOFTWARE-DE-GESTI-N-DE-PRODUCTO-DE-COCA-COLA",
        colors: { main: "#F40009", secondary: "#000000" }
    },
    {
        title: "Portal de Datos Abiertos",
        description: "Dashboard administrativo premium para la gestión y visualización de datos gubernamentales. Incluye autenticación avanzada, gestión de permisos granular, visualización de métricas en tiempo real con Recharts y una arquitectura modular escalable.",
        tech: ["React 18", "TypeScript", "Tailwind 4", "Framer Motion", "Recharts", "Vite"],
        image: "/project/portaldedatosabietos.png",
        link: "https://github.com/Naiker12/portal-datos-abiertos",
        github: "https://github.com/Naiker12/portal-datos-abiertos",
        colors: { main: "#3b82f6", secondary: "#60a5fa" }
    },
    {
        title: "DragonBall - API",
        description: "DragonBallAPI es una API interactiva que permite a los desarrolladores acceder a información detallada sobre el universo de Dragon Ball. La plataforma proporciona datos actualizados sobre personajes, transformaciones, técnicas y más.",
        tech: ["Ionic", "Angular", "Firebase", "CSS"],
        image: "/project/DragonBallAPI.png",
        link: "https://naiker12.github.io/dragolBall-ionic-angular-ionic-taller/dragol-ball",
        github: "https://github.com/Naiker12/dragolBall-ionic-angular-ionic-taller.git",
        colors: { main: "#f59e0b", secondary: "#ef4444" }
    },
    {
        title: "Call - Connect",
        description: "Aplicación de videollamadas de alta fidelidad desarrollada con Ionic y Angular. Utiliza Firebase y Supabase para la gestión de señalización, autenticación y presencia en tiempo real.",
        tech: ["Ionic", "Angular", "Firebase", "Supabase", "CSS"],
        image: "/project/CallConnect.png",
        link: "https://github.com/Naiker12/CallConnect-Ionic-Angular-",
        github: "https://github.com/Naiker12/CallConnect-Ionic-Angular-",
        colors: { main: "#8b5cf6", secondary: "#6366f1" }
    },
    {
        title: "Mercado Express",
        description: "Aplicación móvil de e-commerce construida con Ionic y Angular consumiendo la API de FakeStore. Incluye listado de productos, detalles, carrito de compras y autenticación básica. Ideal como ejemplo de tienda online adaptable.",
        tech: ["Ionic", "Angular", "Firebase", "Tailwind CSS"],
        image: "/project/Mercado-Express.png",
        link: "https://www.youtube.com/watch?si=kfdNEZ22GXp67-Kz&v=92VdP308iJM&feature=youtu.be",
        github: "https://github.com/Naiker12/ionic-angular-fakestore-ecommerce.git",
        colors: { main: "#3b82f6", secondary: "#10b981" }
    },
    {
        title: "Gallery - App",
        description: "Aplicación móvil para la gestión y carga de fotografías en la nube. Implementa un sistema de almacenamiento seguro y visualización optimizada de medios digitales.",
        tech: ["Ionic", "Angular", "Firebase", "Supabase", "CSS"],
        image: "/project/Gallery.png",
        link: "https://github.com/Naiker12/Gallery",
        github: "https://github.com/Naiker12/Gallery",
        colors: { main: "#ec4899", secondary: "#f43f5e" }
    },
    {
        title: "Tienda Virtual",
        description: "Aplicación web de tienda virtual con gestión de productos, carrito de compras y panel de administración dinámico. Creado con un stack robusto para garantizar eficiencia y seguridad en las transacciones.",
        tech: ["PHP", "JavaScript", "MySQL", "Bootstrap", "Tailwind"],
        image: "/project/Tienda-Virtual.png",
        link: "https://github.com/Naiker12/Tienda-virtual",
        github: "https://github.com/Naiker12/Tienda-virtual",
        colors: { main: "#10b981", secondary: "#3b82f6" }
    }
];

export default function Projects() {
    return (
        <section id="proyectos" className="py-fluid-xl px-site-pad border-y border-white/5 bg-white/[0.01]">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-fluid-l gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-fluid-s"
                    >
                        <span className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold">Showcase</span>
                        <h2 className="text-fluid-h2 font-bold tracking-tight">Proyectos <span className="text-gradient">Selectos</span></h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-zinc-500 max-w-sm text-left lg:text-right text-sm md:text-base leading-relaxed"
                    >
                        Cada proyecto es un testimonio de la calidad técnica y la atención al detalle que aplico en cada línea de código.
                    </motion.p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-fluid-m">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex"
                        >
                            <AnimatedCard className="w-full group/card border-zinc-200/10 bg-zinc-900/50 backdrop-blur-sm hover:border-blue-500/30 transition-all duration-300 flex flex-col h-full">
                                <CardVisual className="h-[200px] md:h-[220px] w-full relative overflow-hidden shrink-0 group/visual">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />

                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 scale-90 group-hover/card:scale-100 backdrop-blur-[2px]">
                                        <Visual2
                                            mainColor={project.colors.main}
                                            secondaryColor={project.colors.secondary}
                                            tech={project.tech}
                                        />
                                    </div>
                                </CardVisual>
                                <CardBody className="border-t border-zinc-200/10 p-6 flex flex-col flex-1">
                                    <div className="flex justify-between items-start mb-4 gap-2">
                                        <CardTitle className="text-xl md:text-2xl font-bold group-hover/card:text-blue-400 transition-colors leading-tight">
                                            {project.title}
                                        </CardTitle>
                                        <div className="flex gap-2 shrink-0">
                                            <a href={project.github} aria-label={`Github de ${project.title}`} className="p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                                                <Github className="w-4 h-4" />
                                            </a>
                                            <a href={project.link} aria-label={`Link de ${project.title}`} className="p-2 sm:p-2.5 rounded-full bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 hover:text-blue-300 transition-all">
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                    <CardDescription className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
                                        {project.description}
                                    </CardDescription>
                                    <a
                                        href={project.link}
                                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 group-hover/card:text-blue-400 transition-colors mt-auto"
                                    >
                                        Explorar Caso <ArrowRight className="w-4 h-4" />
                                    </a>
                                </CardBody>
                            </AnimatedCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

