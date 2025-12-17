import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MemePulse - Análise de Memecoins em Tempo Real",
  description: "Descubra as top 10 memecoins com maior valorização. Análise em tempo real para 1h, 4h e 24h. Interface futurista com dados da CoinGecko.",
  keywords: ["memecoins", "criptomoedas", "crypto", "análise", "dogecoin", "shiba inu", "pepe", "investimento"],
  authors: [{ name: "MemePulse Team" }],
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "MemePulse - Análise de Memecoins",
    description: "Top 10 memecoins com maior valorização em tempo real",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MemePulse - Análise de Memecoins",
    description: "Descubra as memecoins com maior valorização agora mesmo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
