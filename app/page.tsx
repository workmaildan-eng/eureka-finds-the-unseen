import { HeroRobot } from "@/components/sections/HeroRobot";
import { CareBeginsAtHome } from "@/components/sections/CareBeginsAtHome";
import { CampaignCreators } from "@/components/sections/CampaignCreators";
import { DiscoveryWall } from "@/components/sections/DiscoveryWall";

export default function HomePage() {
  return (
    <>
      <HeroRobot />
      <CareBeginsAtHome />
      <CampaignCreators />
      <DiscoveryWall />
    </>
  );
}
