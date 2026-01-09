"use client";

import { motion } from "framer-motion";
import { HyperspaceBackground } from "@/components/ui/hyperspace-background";
import { ArrowRight, MousePointer2, Download, Linkedin } from "lucide-react";
import Image from "next/image";
import { StarButton } from "@/components/ui/star-button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Hero() {
    const { theme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = mounted && (resolvedTheme === "dark" || theme === "dark");

    return (
        <section id="inicio" className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">
            {/* Hyperspace Background layer */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <HyperspaceBackground
                    starColor={isDark ? "#3b82f6" : "#2563eb"}
                    backgroundColor={isDark ? "0, 0, 0" : "255, 255, 255"}
                    starSpeed={1.05}
                    starTrailOpacity={0.4}
                />

                {/* Ambient Soft Gradients */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_70%)] opacity-50 dark:opacity-100" />
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
            </div>

            <div className="container mx-auto px-site-pad relative z-10 py-fluid-m">
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="mb-fluid-s"
                    >
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
                            <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-blue-500/30 p-1 bg-black/50 backdrop-blur-md">
                                <Image
                                    src="/perfil.jpg"
                                    alt="Avatar"
                                    width={128}
                                    height={128}
                                    priority
                                    className="object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/5 text-blue-400 text-[10px] md:text-xs font-bold mb-fluid-s uppercase tracking-[0.2em]">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            Disponible para colaborar
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-fluid-h1 font-bold leading-[1.05] mb-fluid-s tracking-tighter"
                    >
                        Hey, soy <br />
                        <span className="text-gradient italic font-medium">naiker</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="text-fluid-base text-zinc-400 max-w-2xl mb-fluid-m leading-relaxed"
                    >
                        +4 años de experiencia. Ingeniero de Software y Creador de Contenido sobre Programación de Cartagena, Colombia. <br className="hidden md:block" /> Especializado en el desarrollo backend.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-wrap justify-center gap-fluid-s w-full"
                    >
                        <a href="/cv.pdf" download className="flex-1 sm:flex-none">
                            <StarButton
                                className="w-full h-14 px-10 rounded-full text-base font-black shadow-xl"
                                lightColor={isDark ? "#3b82f6" : "#2563eb"}
                                duration={4}
                            >
                                <span className="flex items-center gap-2">
                                    Descargar CV <Download className="w-5 h-5 text-current" />
                                </span>
                            </StarButton>
                        </a>
                        <a href="https://linkedin.com/in/naiker" target="_blank" rel="noopener noreferrer" className="flex-1 sm:flex-none">
                            <StarButton
                                className="w-full h-14 px-10 rounded-full text-base font-bold shadow-xl"
                                lightColor={isDark ? "#0A66C2" : "#004182"}
                                duration={5}
                            >
                                <span className="flex items-center gap-2">
                                    LinkedIn
                                    <Image src="/linkedin.svg" alt="LinkedIn" width={20} height={20} className="w-5 h-5" />
                                </span>
                            </StarButton>
                        </a>
                    </motion.div>
                </div>
            </div>


        </section>
    );
}
