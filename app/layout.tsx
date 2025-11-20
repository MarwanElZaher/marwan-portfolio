import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "./providers";
import CursorSpotlight from "@/app/components/CursorSpotlight";
import ChatWidget from "@/app/components/ChatWidget";
import ScrollToTop from './components/ScrollToTop';

const inter = Inter({ subsets: ['latin'] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: 'Marwan ElZaher - Portfolio',
    template: '%s | Marwan ElZaher Portfolio',
  },
  description: 'A personal portfolio showcasing my projects, skills, and experience.',
  keywords: ['portfolio', 'web development', 'react', 'nextjs', 'marwan elzaher'],
  authors: [{ name: 'Marwan ElZaher' }],
  creator: 'Marwan ElZaher',
  openGraph: {
    title: 'Marwan ElZaher - Portfolio',
    description: 'A personal portfolio showcasing my projects, skills, and experience.',
    url: 'https://marwan-portfolio.com', // Replace with your domain
    siteName: 'Marwan ElZaher Portfolio',
    images: [
      {
        url: 'https://yourwebsite.com/og-image.jpg', // Replace with your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Your Name Portfolio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ScrollToTop /> {/* Added ScrollToTop component */}
          <CursorSpotlight />
          <ChatWidget />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
