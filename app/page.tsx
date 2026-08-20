import { HeroRobot } from "@/components/sections/HeroRobot";
import { EurekaOrigin } from "@/components/sections/EurekaOrigin";
import { UnseenHome } from "@/components/sections/UnseenHome";
import { CareBeginsAtHome } from "@/components/sections/CareBeginsAtHome";
import { ProductReveal } from "@/components/sections/ProductReveal";
import { DiscoveryWall } from "@/components/sections/DiscoveryWall";
import { CampaignTimeline } from "@/components/sections/CampaignTimeline";
import { JoinCampaign } from "@/components/sections/JoinCampaign";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <HeroRobot />
      <EurekaOrigin />
      <UnseenHome />
      <CareBeginsAtHome />
      <ProductReveal />
      <DiscoveryWall />
      <CampaignTimeline />
      <JoinCampaign />
      <FinalCTA />
    </>
  );
}
