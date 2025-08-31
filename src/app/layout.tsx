import type { Metadata } from "next";
import { IBM_Plex_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { getHeroSection } from "@/lib/dataManagers/heroSection";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
  title: "The Anselm School - Opening Fall 2026",
  description:
    "The Anselm School is a Classical Christian school opening in Charlotte, NC in 2026. Our aim is to train the hearts and minds of students to be lovers of wisdom, knowledge, and virtue.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch hero section data for static generation
  const heroData = await getHeroSection();

  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <Navigation 
          logoImage={heroData?.logomark} 
          // logoType={heroData?.logotype} 
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
