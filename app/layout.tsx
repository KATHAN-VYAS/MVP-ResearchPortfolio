import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThreatProvider } from "./contexts/ThreatContext";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Identity Codex | Neural Research & Code",
  description: "A cyberpunk-inspired portfolio exploring the intersection of AI research, code, and creative engineering.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} bg-black text-white antialiased overflow-x-hidden`}
      >
        <ThreatProvider>
          {children}
        </ThreatProvider>
      </body>
    </html>
  );
}
