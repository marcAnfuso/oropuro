import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MetaPixel from "./components/MetaPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oro Puro - 24hs En Linea",
  description: "OROPURO - Retiros 24hs, pagos instantáneos, soporte 24/7. El mejor casino online en tus manos.",
  openGraph: {
    title: "Oro Puro - 24hs En Linea",
    description: "Retiros 24hs, pagos instantáneos, soporte 24/7. El mejor casino online en tus manos.",
    url: 'https://bet30-casino.pages.dev',
    siteName: 'OROPURO',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'OROPURO',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Oro Puro - 24hs En Linea",
    description: "Retiros 24hs, pagos instantáneos, soporte 24/7.",
    images: ['/og-image.png'],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
