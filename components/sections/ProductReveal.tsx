"use client";

import { campaignData } from "@/data/campaign";
import { ProductEntry } from "./product/ProductEntry";
import { FeatureReach } from "./product/FeatureReach";
import { FeatureSuction } from "./product/FeatureSuction";
import { FeatureVision } from "./product/FeatureVision";
import { FeatureRealLife } from "./product/FeatureRealLife";
import { FeatureSelfClean } from "./product/FeatureSelfClean";
import { ProductClosing } from "./product/ProductClosing";

/*
 * Section 5 — The Answer to the Unseen.
 * A cinematic entry, five scroll-linked feature chapters, and a
 * full-screen closing composition. Every claim, label and disclaimer
 * comes from /data/campaign.ts.
 */
export function ProductReveal() {
  const features = campaignData.product.features;
  const byId = Object.fromEntries(features.map((f) => [f.id, f]));

  return (
    <section
      id="product"
      className="relative bg-midnight text-warm-white"
      aria-label="The answer to the unseen"
    >
      <ProductEntry />
      <FeatureReach feature={byId["feature-reach"]} index={0} />
      <FeatureSuction feature={byId["feature-suction"]} index={1} />
      <FeatureVision feature={byId["feature-vision"]} index={2} />
      <FeatureRealLife feature={byId["feature-real-life"]} index={3} />
      <FeatureSelfClean feature={byId["feature-self-clean"]} index={4} />
      <ProductClosing />
    </section>
  );
}
