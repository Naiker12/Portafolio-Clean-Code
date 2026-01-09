"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Monitor } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
    { name: "Inicio", href: "#inicio" },
    { name: "Experiencia", href: "#experiencia" },
    { name: "Proyectos", href: "#proyectos" },
    { name: "Habilidades", href: "#habilidades" },
    { name: "Sobre mí", href: "#sobre-mi" },
    { name: "Contacto", href: "#contacto" },
];

import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [activeItem, setActiveItem] = useState("Inicio");
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    const item = navItems.find((navItem) => navItem.href === `#${id}`);
                    if (item) {
                        setActiveItem(item.name);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        navItems.forEach((item) => {
            const element = document.querySelector(item.href);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed top-6 md:top-8 w-full z-50 flex justify-center px-4 md:px-6">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="group p-1.5 md:p-2 flex items-center border border-black/5 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-2xl bg-white/70 dark:bg-black/60 rounded-[2rem] max-w-full overflow-hidden"
            >
                <div className="flex items-center gap-1 overflow-x-auto overflow-y-hidden no-scrollbar px-1 scroll-smooth">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setActiveItem(item.name)}
                            className={`relative px-4 md:px-5 py-2 text-[12px] md:text-[13px] font-bold tracking-tight transition-all duration-300 rounded-full shrink-0 ${activeItem === item.name
                                ? "text-blue-400"
                                : "text-zinc-500 hover:text-white"
                                }`}
                        >
                            {activeItem === item.name && (
                                <>
                                    <motion.div
                                        layoutId="nav-active"
                                        className="absolute inset-0 bg-white/[0.03] rounded-full -z-10 border border-white/5"
                                        transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                                    />
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-blue-500 blur-[2px] rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                </>
                            )}
                            {item.name}
                        </Link>
                    ))}
                </div>

                <div className="w-px h-5 bg-gradient-to-b from-transparent via-zinc-800 to-transparent mx-2 shrink-0" />

                <button
                    onClick={() => {
                        if (theme === "dark") setTheme("light");
                        else if (theme === "light") setTheme("system");
                        else setTheme("dark");
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full text-zinc-500 hover:text-blue-400 hover:bg-white/5 transition-all outline-none relative group/theme"
                    title={`Cambiar a modo ${theme === "dark" ? "claro" : theme === "light" ? "sistema" : "oscuro"}`}
                >
                    <div className="relative w-[18px] h-[18px]">
                        {!mounted ? (
                            <Monitor className="w-full h-full" />
                        ) : (
                            <>
                                <Sun className={`w-full h-full absolute transition-all duration-500 ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`} />
                                <Moon className={`w-full h-full absolute transition-all duration-500 ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`} />
                                <Monitor className={`w-full h-full absolute transition-all duration-500 ${theme === "system" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`} />
                            </>
                        )}
                    </div>
                </button>
            </motion.nav>
        </div>
    );
}

