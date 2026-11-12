import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { ScrollProgress } from "@/components/scroll-progress";
import { Footer } from "@/components/footer";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Joel Vutsumbwa | Développeur Fullstack Freelance",
    template: "%s | Joel Vutsumbwa"
  },
  description: "Je conçois des applications web modernes, sécurisées et performantes. Spécialisé en Next.js, Django et Docker. Découvrez mes projets et services.",
  keywords: ["Développeur Fullstack", "Freelance", "Next.js", "Django", "Docker", "Joel Vutsumbwa", "DevUp"],
  authors: [{ name: "Joel Vutsumbwa" }],
  creator: "Joel Vutsumbwa",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://devup-joel.com", // Remplacer par ton futur domaine
    siteName: "Joel Vutsumbwa",
    title: "Joel Vutsumbwa | Développeur Fullstack Freelance",
    description: "Applications web modernes, sécurisées et performantes.",
    images: [
      {
        url: "/uploads/avatar.JPG", // L'image qui apparaîtra sur LinkedIn
        width: 1200,
        height: 630,
        alt: "Joel Vutsumbwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel Vutsumbwa | Développeur Fullstack",
    description: "Applications web modernes, sécurisées et performantes.",
    images: ["/uploads/avatar.JPG"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollProgress /> 
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
          <Footer /> 
        </ThemeProvider>
      </body>
    </html>
  );
}


