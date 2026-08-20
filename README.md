# Eureka Finds the Unseen — Campaign Landing Page

A premium, cinematic scroll-driven campaign experience for Eureka's September campaign featuring the J15 Max Ultra robot vacuum.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # Production build
npm run start   # Production server
npm run lint    # ESLint
```

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — standard fade/slide animations
- **GSAP + ScrollTrigger** — pinned scroll sequences and scrubbed animations
- **Lucide React** — icons

## Project Structure

```
/app
  layout.tsx          # Root layout, fonts, providers
  page.tsx            # Composes all sections
  globals.css         # Brand tokens, animations
/components
  /sections           # One component per campaign section
  /ui                 # Button, FadeIn, PlaceholderImage, SectionHeading
  /layout             # Navigation, Footer, LoadingScreen
/data
  campaign.ts         # ★ Central editable content file
/hooks
  useLocale.ts        # EN / 繁中 language toggle
  useReducedMotion.ts # prefers-reduced-motion detection
/lib
  gsap.ts             # GSAP plugin registration
/public
  /images             # Placeholder paths (see Asset Checklist)
  /videos
  /audio
```

## Content Updates

**All copy, links, product claims, KOL data, timeline items, and legal notes are editable in `/data/campaign.ts`.**

Key sections in the data file:

| Key | Contents |
|-----|----------|
| `campaign` | Title, hashtag, URLs, product name |
| `hero` | Opening headlines and CTA |
| `eurekaOrigin` | Archimedes / Eureka origin copy |
| `unseenHome` | Detection scene headlines and hotspot labels |
| `careBeginsAtHome` | Emotional story panels |
| `product` | Features, suction power, legal notes |
| `discoveryWall` | Creator cards |
| `timeline` | Campaign milestones |
| `participation` | Steps, prizes, terms placeholders |
| `finalCta` | Closing copy and CTAs |
| `assets` | Media file paths |

### Product Claim Approval

The suction power value is stored as `product.suctionPower` (default: `"22,000Pa"`). Source material may also reference `21,600Pa` in specification areas. **Confirm local market-approved claims before publishing.** Update `product.suctionLegalNote` accordingly.

Feature-level legal notes are on individual features and `product.availabilityNote`.

## Animation Architecture

### GSAP ScrollTrigger (Desktop)

| Section | Behaviour |
|---------|-----------|
| HeroRobot | Pinned: robot scales toward camera, environment darkens, sensor ring → water ripple transition |
| EurekaOrigin | Pinned: water ripples expand, marble parallax, sculpture fade-in |
| UnseenHome | Pinned: scanning beam, detection overlay, hotspot reveals |
| CareBeginsAtHome | Horizontal scroll: three story panels pinned |
| ProductReveal | Feature chapters fade in on scroll |
| DiscoveryWall | Horizontal scrub on creator gallery |
| CampaignTimeline | Progress line + horizontal timeline scrub |

### Reduced Motion Fallback

When `prefers-reduced-motion: reduce` is enabled:

- Pinned/scrub animations are disabled
- Static keyframe states with Framer Motion fade/slide transitions
- All CTAs remain fully functional without completing scroll effects
- Hotspot labels shown as a static list

### Performance Notes

- Images use lazy loading via Next.js `Image` with error fallbacks
- GPU-friendly properties: `transform`, `opacity`
- Mobile simplifies heavy desktop visual layers
- No WebGL — particle effects use CSS animations
- Audio assets are muted by default (not auto-played)

## Asset Checklist

Replace placeholder paths in `/data/campaign.ts` → `assets` and throughout section data.

### 1. Brand
- [ ] Eureka logo (light version) → `/public/images/logo-light.svg`
- [ ] Eureka logo (dark version) → `/public/images/logo-dark.svg`
- [ ] Approved brand typography files (if available)

### 2. Product
- [ ] J15 Max Ultra transparent PNG (front) → `/public/images/robot-j15-hero.png`
- [ ] J15 Max Ultra (top / side views)
- [ ] Base station transparent PNG → `/public/images/product-dock.png`
- [ ] Full product + dock hero → `/public/images/product-j15-full.png`
- [ ] Product lifestyle shots
- [ ] Feature animation materials (if supplied)

### 3. Cinematic
- [ ] Premium modern home wide shot → `/public/images/hero-home-poster.jpg`
- [ ] Hero home video → `/public/videos/hero-home.mp4`
- [ ] Living room for detection scene → `/public/images/home-living.jpg`
- [ ] Home detection overlay reference → `/public/images/home-detection.jpg`
- [ ] Sofa / carpet / furniture leg / floor edge detail shots
- [ ] Under-bed / under-sofa cleaning visuals
- [ ] Sunlight particle overlay or video
- [ ] Ancient Greece / marble / water assets → `/public/images/greek-water.jpg`
- [ ] Warm human-care lifestyle images:
  - [ ] `/public/images/story-home-cleaning.jpg`
  - [ ] `/public/images/story-lend-hand.jpg`
  - [ ] `/public/images/story-share-care.jpg`
- [ ] Pet-friendly home imagery

### 4. Campaign
- [ ] KOL / creator portraits (×5) → `/public/images/creator-01.jpg` … `creator-05.jpg`
- [ ] Creator video thumbnails (×5) → `/public/images/creator-video-01.jpg` … `creator-video-05.jpg`
- [ ] Before/after materials
- [ ] Timeline thumbnails:
  - [ ] `/public/images/timeline-teaser.jpg`
  - [ ] `/public/images/timeline-launch.jpg`
  - [ ] `/public/images/timeline-momentum.jpg`
  - [ ] `/public/images/timeline-world-cleanup.jpg`
- [ ] Campaign prize graphics

### 5. Audio (Optional)
- [ ] Robot activation sound → `/public/audio/robot-activation.mp3`
- [ ] Water ripple ambience
- [ ] Subtle room tone
- All audio must be muted by default and user-controllable

## Placeholders Requiring Campaign-Team Confirmation

- [ ] Campaign start / end dates
- [ ] Eligible locations
- [ ] Participation requirements
- [ ] Submission platform(s)
- [ ] Winner selection method
- [ ] Winner announcement date
- [ ] Prize details
- [ ] Terms & Conditions URL
- [ ] Privacy / content permission note
- [ ] Suction power claim (22,000Pa vs 21,600Pa) per market
- [ ] Creator names, avatars, and social links
- [ ] Shop / product URLs
- [ ] Social media links

## Accessibility

- Semantic HTML with meaningful heading hierarchy
- All images have alt text (or aria-label on decorative elements)
- Hotspots are keyboard-focusable buttons
- Navigation is keyboard accessible
- Colour contrast meets WCAG guidelines on primary text
- `prefers-reduced-motion` respected throughout
- No autoplay audio

## Browser Support

Tested targets: Chrome, Safari, mobile Safari (iOS). Scroll sequences do not trap users — all content is reachable via standard scrolling or anchor links.

---

**Campaign:** Eureka Finds the Unseen · `#EurekaFindsTheUnseen`  
**Product:** Eureka J15 Max Ultra
