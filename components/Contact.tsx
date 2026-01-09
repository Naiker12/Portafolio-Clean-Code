"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Youtube, ArrowRight, Share2 } from "lucide-react";

export default function Contact() {
    const socialLinks = [
        {
            icon: <Facebook />,
            href: "https://www.facebook.com/profile.php?id=61555688363983",
            label: "Facebook",
            color: "#1877F2"
        },
        {
            icon: <Instagram />,
            href: "https://www.instagram.com/naiker.codes/",
            label: "Instagram",
            color: "#E4405F"
        },
        {
            icon: <Linkedin />,
            href: "https://www.linkedin.com/in/naiker-gomez-caraballo-a97449293/",
            label: "LinkedIn",
            color: "#0A66C2"
        },
        {
            icon: <Youtube />,
            href: "https://www.youtube.com/@naiker.code21",
            label: "YouTube",
            color: "#FF0000"
        }
    ];

    return (
        <section id="contacto" className="relative py-fluid-xl px-site-pad overflow-hidden bg-background">
            <div className="absolute bottom-0 right-0 w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-fluid-l items-center">
                    <div>
                        <motion.h2
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-fluid-h2 font-bold mb-fluid-s tracking-tighter leading-[1.1]"
                        >
                            Conecta con <br />
                            <span className="text-blue-500 italic font-medium">Mi Comunidad</span> Digital.
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-zinc-500 text-fluid-base mb-fluid-m max-w-md leading-relaxed"
                        >
                            Sigue mi día a día, consejos de programación y detrás de cámaras en mis redes sociales. ¡Hablemos por allá!
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="flex flex-wrap gap-4 md:gap-6 mb-fluid-m lg:mb-0"
                        >
                            {socialLinks.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="w-14 h-14 rounded-2xl glass border border-white/10 flex items-center justify-center hover:text-white transition-all transform hover:scale-110 active:scale-95 group"
                                    style={{ '--hover-bg': social.color } as React.CSSProperties}
                                >
                                    <div className="transition-colors group-hover:text-[var(--hover-bg)]">
                                        {social.icon}
                                    </div>
                                </a>
                            ))}
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="glass rounded-[32px] md:rounded-[40px] p-8 md:p-16 border border-white/5 relative overflow-hidden group h-fit"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32 transition-colors group-hover:bg-blue-500/20" />

                        <div className="relative z-10 space-y-8 md:space-y-10">
                            <div className="flex items-center gap-6">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                    <Share2 className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold tracking-tight">Presencia Social</h3>
                            </div>

                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                Estoy presente en las principales plataformas para compartir conocimiento y conectar con otros entusiastas de la tecnología.
                            </p>

                            <div className="grid grid-cols-1 gap-4">
                                {socialLinks.slice(0, 2).map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group/item"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="text-zinc-400 group-hover/item:text-blue-500 transition-colors">
                                                {social.icon}
                                            </div>
                                            <span className="font-bold text-sm md:text-base">{social.label}</span>
                                        </div>
                                        <ArrowRight className="w-4 h-4 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all" />
                                    </a>
                                ))}
                            </div>

                            <p className="text-[10px] text-zinc-600 uppercase tracking-[0.2em] font-bold text-center">
                                ¡Nos vemos en las redes!
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
