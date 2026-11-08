import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";

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
          <Navbar />
          <main className="pt-16 min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}






// import Link from "next/link";
// import Image from "next/image";
// import { ArrowLeft } from "lucide-react";

// export default function NotFound() {
//   return (
//     <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      
//       {/* L'illustration du développeur */}
//       <div className="relative w-72 h-72 md:w-96 md:h-96 mb-8">
//         <Image
//           src="/uploads/404-dev.png" // <-- Assure-toi que le nom correspond exactement
//           alt="Développeur en train de coder"
//           fill
//           className="object-contain"
//           priority
//         />
//       </div>
      
//       <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-accent">404</h1>
//       <h2 className="text-2xl font-semibold mb-6">Cette page a été déplacée... ou n'a jamais existé.</h2>
      
//       <p className="text-muted-foreground max-w-md mb-10">
//         Même les meilleurs développeurs se perdent parfois dans leur propre code. 
//         Pas de panique, on vous ramène vers un endroit plus sûr.
//       </p>

//       <Link 
//         href="/" 
//         className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-medium rounded-lg hover:bg-accent/90 transition-colors"
//       >
//         <ArrowLeft className="h-4 w-4" />
//         Retour à l'accueil
//       </Link>
//     </div>
//   );
// }
