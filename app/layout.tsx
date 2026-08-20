import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/hooks/useLocale";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { campaignData } from "@/data/campaign";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  title: {
    default: campaignData.campaign.title,
    template: `%s — ${campaignData.campaign.title}`,
  },
  description:
    "A cinematic discovery journey — find the unseen in your home and in the care you share. #EurekaFindsTheUnseen",
  openGraph: {
    title: campaignData.campaign.title,
    description: "Look closer. The unseen is already here.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <LocaleProvider defaultLocale="en">
          <LoadingScreen />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
