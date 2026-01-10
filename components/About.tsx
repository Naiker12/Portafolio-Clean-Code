"use client";

import { motion } from "framer-motion";
import { Server, Shield, Share2, Zap } from "lucide-react";
import Image from "next/image";
import { BorderBeam } from "@/components/ui/border-beam";
import { getAssetPath } from "@/lib/utils";
import perfilPic from "@/app/assets/perfil.jpg";
import codeCleanPic from "@/app/assets/codeclean.jpg";

export default function About() {
    return (
        <section id="sobre-mi" className="relative py-fluid-xl px-site-pad overflow-hidden bg-background">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-fluid-l items-center">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative group"
                    >
                        <div className="aspect-[4/5] md:aspect-[1/1] xl:aspect-[4/5] relative rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
                            <Image
                                src={codeCleanPic}
                                alt="Naiker Coding"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* Glass Overlay with Border Beam */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                            <BorderBeam
                                size={400}
                                duration={15}
                                colorFrom="#3b82f6"
                                colorTo="#60a5fa"
                                className="z-20"
                            />

                            <div className="absolute bottom-6 left-6 right-6 p-6 md:p-8 glass rounded-[32px] border border-white/10 backdrop-blur-md">
                                <p className="text-white text-base md:text-lg italic font-medium leading-relaxed mb-6">
                                    "Construyendo el motor de la tecnología con código limpio y escalable."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-blue-500/30 p-0.5 bg-black/50">
                                        <Image src={perfilPic} alt="Naiker" width={48} height={48} className="object-cover rounded-xl" />
                                    </div>
                                    <div>
                                        <div className="font-black text-sm text-white uppercase tracking-wider">Naiker</div>
                                        <div className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Software Engineer & Creator</div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </motion.div>

                    {/* Content Side */}
                    <div className="space-y-fluid-m">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <span className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-4 block">Más sobre mí</span>
                            <h2 className="text-fluid-h2 font-bold mb-8 tracking-tighter leading-tight">
                                Transformo ideas en <br />
                                <span className="text-gradient">Realidad Backend</span>
                            </h2>

                            <div className="space-y-6">
                                <p className="text-zinc-500 dark:text-zinc-400 text-fluid-base leading-relaxed text-balance">
                                    Soy <span className="text-zinc-900 dark:text-white font-bold">Naiker</span>, Ingeniero de Software con más de <span className="text-blue-500 font-bold">+4 años de experiencia</span> transformando visiones complejas en sistemas digitales de alto impacto. Mi enfoque principal es el desarrollo de arquitecturas robustas bajo la filosofía de <span className="text-blue-500 font-bold italic">Code Clean</span>.
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-fluid-base leading-relaxed text-balance">
                                    Actualmente lidero la arquitectura de dashboards y portales de datos abiertos en la <span className="text-zinc-900 dark:text-white font-bold">Alcaldía de Cartagena</span>, donde aplico mi dominio en el stack moderno de React y Node.js para mejorar la transparencia gubernamental.
                                </p>
                                <p className="text-zinc-500 dark:text-zinc-400 text-fluid-base leading-relaxed text-balance">
                                    Como creador de contenido en <span className="text-blue-500 font-bold">Naiker.codes</span>, dedico parte de mi tiempo a fortalecer la comunidad técnica, compartiendo conocimientos avanzados sobre programación y buenas prácticas.
                                </p>
                            </div>
                        </motion.div>

                        {/* Focus Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 md:gap-6 pt-4">
                            {[
                                {
                                    icon: <Server className="w-5 h-5 text-blue-500" />,
                                    title: "Backend",
                                    desc: "Diseño de APIs de alto rendimiento y sistemas escalables con latencia mínima."
                                },
                                {
                                    icon: <Shield className="w-5 h-5 text-blue-500" />,
                                    title: "Arquitectura",
                                    desc: "Estructuras modulares pensadas para la escalabilidad y el mantenimiento a largo plazo."
                                },
                                {
                                    icon: <Share2 className="w-5 h-5 text-blue-500" />,
                                    title: "Divulgación",
                                    desc: "Impactando a miles de desarrolladores a través de naiker.codes en redes sociales."
                                },
                                {
                                    icon: <Zap className="w-5 h-5 text-blue-500" />,
                                    title: "Code Clean",
                                    desc: "Compromiso absoluto con la claridad, eficiencia y legibilidad del código fuente."
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-6 rounded-[32px] glass border border-white/5 bg-white/[0.01] hover:border-blue-500/30 transition-all group"
                                >
                                    <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-base font-bold mb-2 group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
