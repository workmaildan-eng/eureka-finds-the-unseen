"use client";

import { campaignData } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";

export function Footer() {
  const { locale, toggleLocale } = useLocale();
  const { campaign, footer } = campaignData;

  return (
    <footer className="bg-charcoal text-warm-white/60 py-16 px-4 md:px-8" role="contentinfo">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <p className="text-warm-white text-xl font-bold tracking-wider mb-4">EUREKA</p>
            <p className="text-sm">{campaign.hashtag}</p>
            <p className="text-sm mt-2">{campaign.productName}</p>
          </div>

          <div>
            <p className="text-warm-white/80 text-sm font-medium mb-4 uppercase tracking-wider">
              Links
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href={campaign.productUrl} className="hover:text-eureka-purple transition-colors">
                  {campaign.productName}
                </a>
              </li>
              <li>
                <a href={campaign.termsUrl} className="hover:text-eureka-purple transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href={campaign.privacyUrl} className="hover:text-eureka-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-warm-white/80 text-sm font-medium mb-4 uppercase tracking-wider">
              Social
            </p>
            <ul className="space-y-2 text-sm">
              {footer.social.map((link) => (
                <li key={link.platform}>
                  <a
                    href={link.url}
                    className="hover:text-eureka-purple transition-colors"
                    aria-label={`Eureka on ${link.platform}`}
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-warm-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs">{footer.copyright}</p>
          <button
            onClick={toggleLocale}
            className="text-xs tracking-widest px-3 py-1 rounded-full border border-warm-white/20 hover:border-warm-white/40 transition-colors"
            aria-label="Toggle language"
          >
            {locale === "en" ? "EN / 繁中" : "繁中 / EN"}
          </button>
          <p className="text-xs text-warm-white/30">
            Newsletter signup — placeholder
          </p>
        </div>
      </div>
    </footer>
  );
}
