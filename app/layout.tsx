import type { Metadata } from "next";
import { getAssetPath } from "@/lib/assets";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  icons: { icon: getAssetPath("/icons/naiker-os.svg"), apple: getAssetPath("/icons/naiker-os.svg") },
  title: "Naiker OS | Portafolio",
  description: "Explora el portafolio de Naiker Alberto Gomez Caraballo, ingeniero de software, en un escritorio inspirado en Ubuntu. Proyectos, tecnologías y CV.",
};

import { ThemeProvider } from "@/components/providers/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${outfit.variable}`}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} antialiased font-outfit`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

