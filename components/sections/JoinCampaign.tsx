"use client";

import { useState } from "react";
import { Search, Sparkles, Share2, ChevronDown, Upload, Check } from "lucide-react";
import { campaignData, t } from "@/data/campaign";
import { useLocale } from "@/hooks/useLocale";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";

const stepIcons = [Search, Sparkles, Share2];

export function JoinCampaign() {
  const { locale } = useLocale();
  const { participation, campaign } = campaignData;
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [consent, setConsent] = useState(false);
  const [caption, setCaption] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    setSubmitted(true);
  };

  return (
    <section
      id="join"
      className="relative bg-navy-deep py-24 md:py-32 px-4 md:px-8"
      aria-label="Join the discovery campaign"
    >
      <div className="max-w-5xl mx-auto">
        <FadeIn>
          <SectionHeading
            title={participation.title}
            subtitle={participation.supporting}
          />
        </FadeIn>

        {/* Three steps */}
        <div className="mt-16 md:mt-24 relative">
          <div
            className="hidden md:block absolute top-16 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-amber-gold/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {participation.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <FadeIn key={step.number} delay={index * 0.15}>
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full border border-amber-gold/30 bg-amber-gold/5 mb-4">
                      <span className="absolute -top-2 -right-2 text-xs font-bold text-amber-gold">
                        {step.number}
                      </span>
                      <Icon size={24} className="text-amber-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-warm-white">
                      {t(step.title, locale)}
                    </h3>
                    <p className="mt-3 text-sm text-warm-white/60 leading-relaxed">
                      {t(step.description, locale)}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>

        {/* Campaign details disclosure */}
        <FadeIn delay={0.3}>
          <div className="mt-16 rounded-2xl border border-warm-white/10 bg-charcoal/30 overflow-hidden">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-warm-white/5 transition-colors"
              aria-expanded={detailsOpen}
            >
              <span className="text-lg font-medium text-warm-white">
                {locale === "zh-Hant" ? "Campaign 詳情" : "Campaign Details"}
              </span>
              <ChevronDown
                size={20}
                className={`text-warm-white/60 transition-transform ${detailsOpen ? "rotate-180" : ""}`}
              />
            </button>

            {detailsOpen && (
              <div className="px-6 pb-6 space-y-3 text-sm text-warm-white/60 border-t border-warm-white/5 pt-4">
                <DetailRow label="Campaign Period" value={participation.details.campaignPeriod} />
                <DetailRow label="Eligible Locations" value={participation.details.eligibleLocations} />
                <DetailRow label="Hashtag" value={participation.details.hashtag} />
                <DetailRow label="Platforms" value={participation.details.platforms} />
                <DetailRow label="Requirements" value={participation.details.requirements} />
                <DetailRow label="Winner Selection" value={participation.details.winnerSelection} />
                <DetailRow label="Announcement" value={participation.details.winnerAnnouncement} />
                <DetailRow label="Prizes" value={participation.details.prizes} />
                <DetailRow label="Privacy" value={participation.details.privacyNote} />
              </div>
            )}
          </div>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={0.4}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => setUploadOpen(!uploadOpen)}
              variant="primary"
            >
              {locale === "zh-Hant" ? "分享你的發現" : "Share Your Discovery"}
            </Button>
            <Button href={campaign.termsUrl} variant="secondary">
              {locale === "zh-Hant" ? "查看條款及細則" : "Read Terms & Conditions"}
            </Button>
          </div>
        </FadeIn>

        {/* Upload UI shell */}
        {uploadOpen && (
          <FadeIn>
            <div className="mt-8 rounded-2xl border border-warm-white/10 bg-charcoal/30 p-6 md:p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-gold/20 mb-4">
                    <Check size={24} className="text-amber-gold" />
                  </div>
                  <p className="text-warm-white font-medium">
                    {locale === "zh-Hant"
                      ? "感謝你的分享！此為 UI 示範，尚未連接後端。"
                      : "Thank you for sharing! This is a UI demo — no backend connected yet."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-sm text-warm-white/50">
                    {locale === "zh-Hant"
                      ? "上傳介面（需連接後端才能正式提交）"
                      : "Submission UI shell (requires backend integration for live submissions)"}
                  </p>

                  {/* File upload area */}
                  <div className="border-2 border-dashed border-warm-white/10 rounded-xl p-8 text-center hover:border-amber-gold/30 transition-colors">
                    <Upload size={32} className="mx-auto text-warm-white/30 mb-3" />
                    <p className="text-sm text-warm-white/50">
                      Drag & drop image or video
                    </p>
                    <p className="text-xs text-warm-white/30 mt-1">
                      JPG, PNG, MP4 · Max 50MB
                    </p>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,video/mp4"
                      className="mt-4 text-xs text-warm-white/40"
                      aria-label="Upload discovery image or video"
                    />
                  </div>

                  {/* Caption */}
                  <div>
                    <label htmlFor="caption" className="block text-sm text-warm-white/70 mb-2">
                      Caption
                    </label>
                    <textarea
                      id="caption"
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                      className="w-full rounded-lg bg-midnight border border-warm-white/10 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/30 focus:border-amber-gold/40 focus:outline-none resize-none h-24"
                      placeholder={`Share your discovery ${participation.details.hashtag}`}
                    />
                  </div>

                  {/* External link alternative */}
                  <div>
                    <label htmlFor="external-link" className="block text-sm text-warm-white/70 mb-2">
                      {locale === "zh-Hant"
                        ? "或貼上社交媒體連結"
                        : "Or paste a social media link"}
                    </label>
                    <input
                      id="external-link"
                      type="url"
                      value={externalLink}
                      onChange={(e) => setExternalLink(e.target.value)}
                      className="w-full rounded-lg bg-midnight border border-warm-white/10 px-4 py-3 text-sm text-warm-white placeholder:text-warm-white/30 focus:border-amber-gold/40 focus:outline-none"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  {/* Consent */}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-amber-gold"
                    />
                    <span className="text-xs text-warm-white/50 leading-relaxed">
                      {participation.details.privacyNote}
                    </span>
                  </label>

                  <Button type="submit" variant="primary" disabled={!consent} className="w-full">
                    {locale === "zh-Hant" ? "提交分享" : "Submit Discovery"}
                  </Button>
                </form>
              )}
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col sm:flex-row sm:gap-4">
      <span className="text-warm-white/40 sm:w-40 flex-shrink-0">{label}</span>
      <span>{value}</span>
    </div>
  );
}
