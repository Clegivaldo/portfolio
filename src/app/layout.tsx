import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { SmoothScroll } from "@/components/providers/smooth-scroll"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { LanguageProvider } from "@/components/providers/language-provider"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clegivaldo Cruz — Engenheiro de Computação & P&D",
  description:
    "Portfólio de Clegivaldo Cruz: Engenheiro de Computação, Técnico em Desenvolvimento de Sistemas e Informática, cursando MBA em Inteligência Artificial. Gerente de Pesquisa & Desenvolvimento. Nerd, amante de tecnologias.",
  keywords: [
    "Clegivaldo Cruz",
    "Engenheiro de Computação",
    "Pesquisa e Desenvolvimento",
    "MBA Inteligência Artificial",
    "Three.js",
    "React",
    "Next.js",
    "TypeScript",
    "Vibecode",
    "Metrologia",
    "Laboratório",
  ],
  authors: [{ name: "Clegivaldo Cruz" }],
  creator: "Clegivaldo Cruz",
  openGraph: {
    title: "Clegivaldo Cruz — Engenheiro de Computação & P&D",
    description:
      "Portfólio profissional. Sistemas web, metrologia, laboratório de análises, IA e inovação.",
    siteName: "Clegivaldo Cruz",
    type: "profile",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Clegivaldo Cruz — Engenheiro de Computação & P&D",
    description:
      "Portfólio profissional. Sistemas web, metrologia, laboratório de análises, IA e inovação.",
  },
}

export const viewport: Viewport = {
  themeColor: "#070910",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="dark">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} antialiased font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
