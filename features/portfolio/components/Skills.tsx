"use client";
import { useHydrated } from "@/hooks/use-hydrated";

import { orbitData } from "@/features/portfolio/data/orbitData";

import { skillCategories } from "@/features/portfolio/data/skillCategories";

import { motion } from "framer-motion";
import { SkillIcon } from "@/components/icons/portfolio-icon";
import { CloudOrbit, OrbitingImage } from "@/components/effects/cloud-orbit";
import { HyperspaceBackground } from "@/components/effects/hyperspace-background";
import { useTheme } from "next-themes";

import { BorderBeam } from "@/components/effects/border-beam";
import perfilPic from "@/public/images/profile/perfil.jpg";

export default function Skills() {
    const { theme, resolvedTheme } = useTheme();
    const mounted = useHydrated();

const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

    return (
        <section id="habilidades" className="py-fluid-xl px-site-pad overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-fluid-l"
                >
                    <span className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4 block">Capacidades</span>
                    <h2 className="text-fluid-h2 font-bold tracking-tight mb-fluid-s">Ecosistema <span className="text-gradient">Tecnológico</span></h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto text-sm md:text-base">
                        Utilizo las tecnologías más punteras para construir productos digitales escalables y de alto rendimiento.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row items-center justify-between gap-fluid-m md:gap-fluid-l">
                    {/* Cloud Orbit Visualization */}
                    <div className="relative w-full lg:w-1/2 flex items-center justify-center p-4 md:p-10 min-h-[350px] md:min-h-[600px] overflow-hidden rounded-[2rem] border border-white/5 bg-black/40">
                        <HyperspaceBackground
                            starColor={isDark ? "#3b82f6" : "#2563eb"}
                            backgroundColor={isDark ? "0, 0, 0" : "240, 240, 240"}
                            starSpeed={1.1}
                            starTrailOpacity={0.6}
                            className="opacity-40"
                        />
                        <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full" />

                        <div className="scale-[0.5] sm:scale-[0.7] md:scale-90 lg:scale-100 flex items-center justify-center w-full h-full transition-transform duration-500">
                            {/* Orbit rings for visual guide */}
                            <div className="absolute w-[200px] h-[200px] border border-blue-500/10 rounded-full" />
                            <div className="absolute w-[320px] h-[320px] border border-blue-500/5 rounded-full" />
                            <div className="absolute w-[480px] h-[480px] border border-blue-500/[0.02] rounded-full" />

                            <CloudOrbit
                                duration={4}
                                size={140}
                                className="z-10"
                                images={[
                                    { name: "Perfil", url: perfilPic.src }
                                ]}
                            >
                                {orbitData.map((orbit, index) => (
                                    <OrbitingImage
                                        key={index}
                                        speed={orbit.speed}
                                        radius={orbit.radius}
                                        size={orbit.size}
                                        startAt={orbit.startAt}
                                        images={orbit.images}
                                    />
                                ))}
                            </CloudOrbit>
                        </div>
                    </div>

                    {/* Skills Categories */}
                    <div className="w-full lg:w-1/2 grid sm:grid-cols-2 gap-4">
                        {skillCategories.map((cat, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group relative"
                            >
                                <div className="p-6 md:p-8 rounded-[2rem] bg-white/5 dark:bg-zinc-900/40 border border-black/[0.03] dark:border-white/[0.03] backdrop-blur-xl h-full flex flex-col relative overflow-hidden group/card shadow-2xl">
                                    <BorderBeam
                                        size={250}
                                        duration={10}
                                        colorFrom={cat.color}
                                        colorTo="#ffffff10"
                                        className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                                    />

                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 relative z-10"
                                        style={{ backgroundColor: `${cat.color}15`, color: cat.color }}>
                                        <SkillIcon name={cat.icon} />
                                    </div>

                                    <h3 className="text-base md:text-lg font-bold mb-4 relative z-10 text-zinc-900 dark:text-white">{cat.title}</h3>

                                    <div className="flex flex-wrap gap-2 relative z-10">
                                        {cat.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="text-[9px] md:text-[10px] py-1.5 px-3 rounded-lg bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 font-bold hover:border-blue-500/30 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
