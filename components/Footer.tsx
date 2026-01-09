export default function Footer() {
    return (
        <footer className="py-8 md:py-12 px-site-pad border-t border-white/5 bg-black/40 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="text-xl font-bold tracking-tighter">
                    PORTFOLIO<span className="text-blue-500">.</span>
                </div>

                <p className="text-zinc-500 text-sm font-medium text-center md:text-left">
                    © {new Date().getFullYear()} Portfolio Profesional. Code Clean. Diseñado con precisión y construido con Next.js.
                </p>

                <div className="flex gap-6 md:gap-8 text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-zinc-600">
                    <a href="#" className="hover:text-blue-500 transition-colors p-2">Aviso Legal</a>
                    <a href="#" className="hover:text-blue-500 transition-colors p-2">Privacidad</a>
                </div>
            </div>
        </footer>
    );
}
