"use client";

import { InfiniteRibbon } from "@/components/ui/infinite-ribbon";
import { Sparkles } from "lucide-react";

export default function RibbonSection() {
    return (
        <div className="relative h-32 md:h-48 flex items-center justify-center overflow-hidden my-16 group">
            {/* Prime Ribbon */}
            <div className="absolute w-[120%] rotate-[-3deg] z-10 scale-105">
                <InfiniteRibbon
                    duration={35}
                    repeat={15}
                    className="bg-blue-600 py-3 md:py-4 shadow-[0_20px_50px_rgba(37,99,235,0.3)] border-y border-white/20"
                >
                    <div className="flex items-center gap-10 px-2 text-xs md:text-base font-black uppercase tracking-[0.25em] text-white italic">
                        <span>Si puedes imaginarlo, puedes programarlo</span>
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                        <span>If you can imagine it, you can program it</span>
                        <Sparkles className="w-5 h-5 text-white animate-pulse" />
                    </div>
                </InfiniteRibbon>
            </div>

            {/* Crossing Ribbon */}
            <div className="absolute w-[120%] rotate-[3deg] z-0">
                <InfiniteRibbon
                    duration={30}
                    repeat={15}
                    reverse
                    className="bg-zinc-900 py-3 md:py-4 border-y border-white/10 shadow-2xl"
                >
                    <div className="flex items-center gap-10 px-2 text-xs md:text-sm font-black uppercase tracking-[0.3em] text-blue-500/80 font-mono">
                        <span>Code Clean</span>
                        <span className="text-white/20">//</span>
                        <span>Design meets High Performance</span>
                        <span className="text-zinc-500">//</span>
                        <span>Clean Code is always better</span>
                        <span className="text-white/20">//</span>
                        <span>Creatividad sin límites</span>
                    </div>
                </InfiniteRibbon>
            </div>
        </div>
    );
}
