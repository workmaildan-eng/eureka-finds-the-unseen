import type { Metadata } from "next";
import { Inter, Noto_Sans_TC } from "next/font/google";
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

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: campaignData.campaign.title,
  description:
    "A cinematic discovery journey — find the unseen in your home and in the care you share.",
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
    <html lang="zh-Hant" className={`${inter.variable} ${notoSansTC.variable}`}>
      <body className="font-sans">
        <LocaleProvider defaultLocale={campaignData.campaign.locale}>
          <LoadingScreen />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
