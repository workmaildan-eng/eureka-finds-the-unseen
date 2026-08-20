"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { Button } from "@/components/ui/Button";

export function Navigation() {
  const { locale } = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);

      const sections = campaignData.sections.map((s) => s.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkSection = ["hero", "origin", "unseen", "product", "final"].includes(
    activeSection
  );

  const navLinks = [
    { href: `#${campaignData.sections[4].id}`, label: t(campaignData.navigation.discoverLabel, locale) },
    { href: `#${campaignData.sections[7].id}`, label: t(campaignData.navigation.joinLabel, locale) },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDarkSection
              ? "bg-midnight/80 backdrop-blur-md border-b border-warm-white/5"
              : "bg-warm-white/90 backdrop-blur-md border-b border-charcoal/5"
            : "bg-transparent"
        }`}
        role="banner"
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8"
          aria-label="Main navigation"
        >
          <a
            href="#hero"
            className={`text-sm font-semibold tracking-[0.4em] transition-colors ${
              scrolled && !isDarkSection ? "text-charcoal" : "text-warm-white"
            }`}
            aria-label="Eureka home"
          >
            EUREKA
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-[0.7rem] uppercase tracking-[0.18em] transition-colors hover:text-amber-gold ${
                  scrolled && !isDarkSection
                    ? "text-charcoal/80"
                    : "text-warm-white/80"
                }`}
              >
                {link.label}
              </a>
            ))}

            <Button
              href={campaignData.campaign.shopUrl}
              variant="primary"
              className="!px-5 !py-2 !text-[0.65rem]"
            >
              {t(campaignData.navigation.shopLabel, locale)}
            </Button>
          </div>

          <button
            className={`md:hidden p-2 ${scrolled && !isDarkSection ? "text-charcoal" : "text-warm-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {mobileOpen && (
          <div className="md:hidden bg-midnight/95 backdrop-blur-lg border-t border-warm-white/10 px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-warm-white/80 text-sm uppercase tracking-[0.14em] py-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button href={campaignData.campaign.shopUrl} variant="primary" className="w-full">
              {t(campaignData.navigation.shopLabel, locale)}
            </Button>
          </div>
        )}
      </header>

      {/* Mobile bottom CTA bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-midnight/90 backdrop-blur-md border-t border-warm-white/10 px-4 py-3 flex gap-3">
        <Button
          href={`#${campaignData.sections[7].id}`}
          variant="secondary"
          className="flex-1 !py-2.5 !text-[0.65rem]"
        >
          {t(campaignData.navigation.joinLabel, locale)}
        </Button>
        <Button
          href={campaignData.campaign.shopUrl}
          variant="primary"
          className="flex-1 !py-2.5 !text-[0.65rem]"
        >
          {t(campaignData.navigation.shopLabel, locale)}
        </Button>
      </div>
    </>
  );
}
