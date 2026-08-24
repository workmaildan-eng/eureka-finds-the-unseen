export type Locale = "en" | "zh-Hant";

export interface LocalizedText {
  en: string;
  zh: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  chineseTitle: string;
  supportingLine: string;
  chineseSupportingLine: string;
  description: string;
  chineseDescription: string;
  legalNote?: string;
  visualAlt: string;
}

export interface Creator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  thumbnail: string;
  platform: string;
  quote: string;
  chineseQuote: string;
  url: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  chineseTitle: string;
  content: string[];
  chineseContent: string[];
  thumbnail: string;
  isHighlight?: boolean;
}

export interface StoryPanel {
  id: string;
  title: string;
  chineseTitle: string;
  copy: string;
  chineseCopy: string;
  image: string;
  imageAlt: string;
}

export interface Hotspot {
  id: string;
  label: string;
  chineseLabel: string;
  x: number;
  y: number;
}

export const campaignData = {
  campaign: {
    title: "Eureka Finds the Unseen",
    hashtag: "#EurekaFindsTheUnseen",
    locale: "zh-Hant" as Locale,
    productName: "Eureka J15 Max Ultra",
    productUrl: "#campaign",
    shopUrl: "#shop",
    termsUrl: "#terms",
    privacyUrl: "#privacy",
  },

  navigation: {
    discoverLabel: { en: "J15 Max Ultra Giveaway", zh: "J15 Max Ultra Giveaway" },
    shopLabel: { en: "Shop Now", zh: "立即選購" },
  },

  hero: {
    headline: { en: "Eureka finds the unseen", zh: "Eureka finds the unseen" },
    supporting: {
      en: "Look closer. The unseen is already here.",
      zh: "仔細看，未被發現的，就在身邊。",
    },
    scrollCue: { en: "Scroll to discover", zh: "下滑發現更多" },
    cta: { en: "Explore & Win a J15 Max Ultra", zh: "探索並贏走 J15 Max Ultra" },
  },

  eurekaOrigin: {
    title: "EUREKA!",
    headline: {
      en: "Every discovery begins with looking closer.",
      zh: "每一次發現，都始於看得更仔細。",
    },
    body: [
      {
        en: "The word 'Eureka' comes from ancient Greek, meaning 'I have found it!'",
        zh: "Eureka 源自古希臘語，意為「我發現了！」。",
      },
      {
        en: "Legend says Archimedes cried 'Eureka!' when he discovered the principle of buoyancy.",
        zh: "相傳阿基米德發現浮力原理時，興奮地喊出了：Eureka！",
      },
    ],
  },

  unseenHome: {
    headline: {
      en: "Can you see the unseen?",
      zh: "你有發現嗎？",
    },
    supporting: [
      {
        en: "Some dirt is easy to see.",
        zh: "有些污垢，一眼就能看見。",
      },
      {
        en: "Some hides in the places we overlook every day.",
        zh: "有些，則藏在每一天看似乾淨的生活裡。",
      },
    ],
    hotspots: [
      {
        id: "sofa-gap",
        label: "Hidden in the sofa gap.",
        chineseLabel: "藏在沙發縫隙之中",
        x: 28,
        y: 62,
      },
      {
        id: "under-furniture",
        label: "Out of sight. Not out of reach.",
        chineseLabel: "看不見，不代表不存在",
        x: 72,
        y: 68,
      },
      {
        id: "carpet-fibres",
        label: "Trapped beneath the surface.",
        chineseLabel: "藏在表面之下",
        x: 45,
        y: 78,
      },
      {
        id: "corners",
        label: "Where dust settles unnoticed.",
        chineseLabel: "容易被忽略的角落",
        x: 12,
        y: 45,
      },
      {
        id: "pet-hair",
        label: "Where everyday life leaves its trace.",
        chineseLabel: "日常生活留下的痕跡",
        x: 58,
        y: 55,
      },
      {
        id: "under-bed",
        label: "Out of sight. Not out of reach.",
        chineseLabel: "看不見，不代表不存在",
        x: 85,
        y: 35,
      },
    ] as Hotspot[],
    cards: [
      {
        id: "sofa-gap",
        title: { en: "Hidden in the sofa gap.", zh: "藏在沙發縫隙之中" },
        image: "/images/unseen-sofa-gap.jpg?v=4",
        imageAlt: "Dust and crumbs hidden in a sofa cushion gap",
      },
      {
        id: "carpet",
        title: { en: "Trapped beneath the surface.", zh: "藏在表面之下" },
        image: "/images/unseen-carpet.jpg?v=4",
        imageAlt: "Dirt trapped in carpet fibres",
      },
      {
        id: "corner",
        title: { en: "Out of sight. Not out of reach.", zh: "看不見，不代表不存在" },
        image: "/images/unseen-corner.jpg?v=4",
        imageAlt: "Dust gathered along a wall edge and floor corner",
      },
    ],
  },

  careBeginsAtHome: {
    headline: {
      en: "Cleaning begins at home.\nCare begins with seeing what others miss.",
      zh: "清潔始於家中。\n關懷，始於看見他人忽略之處。",
    },
    stories: [
      {
        id: "story-01",
        title: "Looked after, even when living alone.",
        chineseTitle: "幫獨居長者，打理被忽略的家。",
        copy: "Eureka finds the dust they can no longer reach, so ageing at home feels lighter.",
        chineseCopy: "Eureka 找到長輩伸手難及的灰塵，讓獨居的家，住得更輕鬆。",
        image: "/images/story-elder.jpg",
        imageAlt: "Adult visiting an elderly parent while a Eureka robot vacuum cares for the home",
      },
      {
        id: "story-02",
        title: "Healthier for pets. Safer for family.",
        chineseTitle: "守護寵物，也守護全家人的健康。",
        copy: "Hair, dander and hidden dust settle where we don't look. Eureka notices first.",
        chineseCopy: "毛髮、皮屑與灰塵，藏在看不見的地方。Eureka 先看見。",
        image: "/images/story-pet-family.jpg",
        imageAlt: "Family and a spaniel in a bright kitchen with a Eureka robot vacuum nearby",
      },
      {
        id: "story-03",
        title: "The first lesson in looking closer.",
        chineseTitle: "清潔，是孩子學會關懷的第一課。",
        copy: "When a child watches a home being looked after, noticing becomes a habit of kindness.",
        chineseCopy: "孩子看見家被好好照顧，也就學會：發現，是關懷的開始。",
        image: "/images/story-child.jpg",
        imageAlt: "Parent and child watching a Eureka robot vacuum clean the living-room floor",
      },
    ] as StoryPanel[],
  },

  giveaway: {
    titleLines: {
      en: ["Find it.", "Clean it.", "Win it."],
      zh: ["Find it.", "Clean it.", "Win it."],
    },
    supporting: {
      en: "Four creators across Europe are opening the giveaway. Show us an unseen dirty corner, tag a friend, and you could have a YouTuber visit to clean — and win the Eureka J15 Max Ultra.",
      zh: "四位歐洲頭部博主發起 Find it clean it win it。分享身邊需要清潔的角落、標記朋友，就有機會讓博主上門拍攝清潔，並抽中 Eureka J15 Max Ultra。",
    },
    productName: "Eureka J15 Max Ultra",
    tag: "Free Giveaway",
    productImage: "/images/world-cleaning-day-prize.png",
    productAlt: "Eureka J15 Max Ultra robot vacuum and self-cleaning dock",
    cta: { en: "Follow Us & Join the Giveaway", zh: "追蹤我們並參加 Giveaway" },
    rulesTitle: { en: "How to participate", zh: "參加方式" },
    steps: [
      {
        en: "Follow Eureka on Instagram and like the post.",
        zh: "在 Instagram 追蹤 Eureka，並為貼文點讚。",
      },
      {
        en: "Follow the YouTuber, comment on their campaign post, point out unseen dirt around you, and tag a friend.",
        zh: "追蹤該位 YouTuber，在活動貼文留言指出身邊的 unseen dirt，並標記一位朋友。",
      },
      {
        en: "Selected fans get a creator visit to clean the dirt area, plus a free J15 Max Ultra.",
        zh: "被選中的粉絲可獲博主上門清潔該處，並獲贈一台 J15 Max Ultra。",
      },
    ],
    youtubers: [
      {
        id: "lena",
        name: "Lena Hart",
        handle: "@lenahart",
        image: "/images/youtuber-lena.jpg",
      },
      {
        id: "hugo",
        name: "Hugo Moreau",
        handle: "@hugohome",
        image: "/images/youtuber-hugo.jpg",
      },
      {
        id: "isla",
        name: "Isla Bennett",
        handle: "@islabennett",
        image: "/images/youtuber-isla.jpg",
      },
      {
        id: "matteo",
        name: "Matteo Ricci",
        handle: "@matteohome",
        image: "/images/youtuber-matteo.jpg",
      },
    ],
  },

  product: {
    headline: {
      en: "Find the unseen. Clean it all.",
      zh: "Find the unseen. Clean it all.",
    },
    supporting: {
      en: "Designed for the places that are hard to see, hard to reach and easy to overlook.",
      zh: "為那些看不見、難以觸及、容易被忽略的地方而設。",
    },
    suctionPower: "22,000Pa",
    suctionLegalNote:
      "Performance claims and specifications may vary by market. Confirm local approved claims before publishing. Source material may reference 21,600Pa in specification areas.",
    availabilityNote:
      "Certain app-controlled and OTA-enabled features may vary by market and availability.",
    closingCopy: [
      {
        en: "What you don't see still deserves to be cared for.",
        zh: "看不見的地方，同樣值得被照顧。",
      },
      {
        en: "Discover more. Clean deeper. Care better.",
        zh: "發現更多。清潔更深。關懷更好。",
      },
    ],
    features: [
      {
        id: "feature-reach",
        title: "Reaches What Others Miss",
        chineseTitle: "每一處邊角，都不被遺漏",
        supportingLine: "Every edge. Every corner.",
        chineseSupportingLine: "每一處邊角，都不被遺漏。",
        description:
          "SweepExtend and ScrubExtend. When the robot detects hard-to-reach areas like corners and table legs, its side brush and mop extend for edge and corner coverage.",
        chineseDescription:
          "SweepExtend 與 ScrubExtend。當機器人偵測到邊角、桌腳等難以觸及的位置，側刷與拖布會自動延伸，覆蓋邊緣與角落。",
        visualAlt: "Top-down view of robot extending side brush toward a corner",
      },
      {
        id: "feature-suction",
        title: "Power Beneath the Surface",
        chineseTitle: "深入表面之下",
        supportingLine: "More than what you see on the surface.",
        chineseSupportingLine: "不只清潔表面，更深入處理藏在底下的污垢。",
        description:
          "Maximum advertised suction power for deep cleaning in floor crevices and carpet fibres.",
        chineseDescription:
          "強勁吸力，深入地板縫隙與地毯纖維，清除表面之下的隱藏污垢。",
        legalNote:
          "Performance claims and specifications may vary by market. Confirm local approved claims before publishing.",
        visualAlt: "Macro view of carpet fibres with dust being extracted",
      },
      {
        id: "feature-vision",
        title: "Sees Before It Cleans",
        chineseTitle: "在你注意不到之前，先發現",
        supportingLine: "It sees what you might miss.",
        chineseSupportingLine: "在你注意不到之前，先發現需要處理的地方。",
        description:
          "IntelliView AI 2.0 dual vision system combines infrared and FHD vision for obstacle avoidance, path planning and cleaning intelligence. Identifies liquid spills and prioritises mopping when appropriate.",
        chineseDescription:
          "IntelliView AI 2.0 雙重視覺系統，結合紅外線與 FHD 視覺，實現障礙物迴避、路徑規劃與清潔智能。可識別液體潑灑，適當時優先拖拭。",
        visualAlt: "Elegant sensing view showing obstacle recognition and path planning",
      },
      {
        id: "feature-real-life",
        title: "Made for Real Life",
        chineseTitle: "為真實生活而設",
        supportingLine: "For every footprint, paw print and everyday mess.",
        chineseSupportingLine: "每一個足印、爪印和日常痕跡，都值得被照顧。",
        description:
          "Adaptive carpet cleaning and pet-area deep cleaning using sensing capabilities to identify carpet and pet-frequented zones.",
        chineseDescription:
          "自適應地毯清潔與寵物區域深度清潔，運用感測能力識別地毯與寵物常出沒區域。",
        legalNote:
          "Certain app-controlled and OTA-enabled features may vary by market and availability.",
        visualAlt: "Pet passing through room with robot detecting and cleaning pet hair",
      },
      {
        id: "feature-self-clean",
        title: "Cleans. Then Cleans Itself.",
        chineseTitle: "清潔，然後自我清潔",
        supportingLine: "Because clean should not create another chore.",
        chineseSupportingLine: "清潔，不應該帶來另一項家務。",
        description:
          "Dual self-cleaning system with automatic mop washing, drying, clean-water refill, dirty-water draining, dust emptying, charging, base-tray self-cleaning and debris collection. FlexiRazor anti-tangle system at the base station.",
        chineseDescription:
          "雙重自我清潔系統：自動洗拖、烘乾、補充清水、排放污水、自動集塵、充電、底座自清與碎屑收集。FlexiRazor 防纏繞系統於基站運作。",
        visualAlt: "Robot returning to dock for self-maintenance sequence",
      },
    ] as ProductFeature[],
  },

  discoveryWall: {
    title: { en: "Find the Unseen", zh: "Find the Unseen" },
    supporting: {
      en: "Look closer. Share what you discover. Make a difference.",
      zh: "發現被忽略的角落，分享你的行動，讓更多人看見。",
    },
    creators: [
      {
        id: "creator-01",
        name: "Creator Name",
        role: "Lifestyle Creator",
        avatar: "/images/creator-01.jpg",
        thumbnail: "/images/creator-video-01.jpg",
        platform: "YouTube",
        quote:
          "I discovered the dust hiding beneath the places I clean every day.",
        chineseQuote: "原來每天都會清潔的家，也藏著被忽略的地方。",
        url: "#",
      },
      {
        id: "creator-02",
        name: "Creator Name",
        role: "Home & Living Creator",
        avatar: "/images/creator-02.jpg",
        thumbnail: "/images/creator-video-02.jpg",
        platform: "Instagram",
        quote: "The corners I never thought to look at held more than I expected.",
        chineseQuote: "從未留意的角落，藏著比想像中更多的塵埃。",
        url: "#",
      },
      {
        id: "creator-03",
        name: "Creator Name",
        role: "Pet Parent Creator",
        avatar: "/images/creator-03.jpg",
        thumbnail: "/images/creator-video-03.jpg",
        platform: "TikTok",
        quote: "Pet hair finds its way everywhere — even where you can't see it.",
        chineseQuote: "寵物毛髮無處不在——包括那些看不見的地方。",
        url: "#",
      },
      {
        id: "creator-04",
        name: "Creator Name",
        role: "Family & Care Creator",
        avatar: "/images/creator-04.jpg",
        thumbnail: "/images/creator-video-04.jpg",
        platform: "YouTube",
        quote: "Helping my parents clean showed me how much goes unnoticed.",
        chineseQuote: "幫父母清潔，讓我看見有多少地方被忽略了。",
        url: "#",
      },
      {
        id: "creator-05",
        name: "Creator Name",
        role: "Tech Review Creator",
        avatar: "/images/creator-05.jpg",
        thumbnail: "/images/creator-video-05.jpg",
        platform: "YouTube",
        quote: "The sensing technology revealed a layer of clean I never knew existed.",
        chineseQuote: "感測技術揭示了一層我從未意識到的清潔需求。",
        url: "#",
      },
    ] as Creator[],
  },

  timeline: {
    title: { en: "The Discovery Journey", zh: "發現之旅" },
    items: [
      {
        id: "teaser",
        date: "09/08",
        title: "Something unseen is waiting.",
        chineseTitle: "Something unseen is waiting.",
        content: [
          "Top-tier creators introduce the upcoming campaign.",
          "Invite followers to comment on cleaning areas they believe are often overlooked.",
          "Build curiosity and collect personal 'unseen' stories.",
        ],
        chineseContent: [
          "頭部博主預告 campaign。",
          "邀請粉絲留言分享最常被忽略、最需要清潔的地方。",
          "從互動中收集屬於每個人的 unseen 故事。",
        ],
        thumbnail: "/images/timeline-teaser.jpg",
      },
      {
        id: "launch",
        date: "09/13",
        title: "See it. Share it.",
        chineseTitle: "See it. Share it.",
        content: [
          "Top-tier creators publish campaign launch content.",
          "Show their own Eureka discoveries and cleaning transformations.",
          "Encourage audiences to use Eureka products to discover overlooked cleaning needs.",
        ],
        chineseContent: [
          "頭部博主發布 campaign 正片。",
          "分享以 Eureka 發現清潔 unseen 的過程與改變。",
          "號召大家一起發現、分享、行動。",
        ],
        thumbnail: "/images/timeline-launch.jpg",
      },
      {
        id: "momentum",
        date: "09/14–09/19",
        title: "More discoveries, more care.",
        chineseTitle: "More discoveries, more care.",
        content: [
          "Mid-tier creators continue sharing discovered cleaning blind spots.",
          "Product benefits appear through real household use.",
          "The community is encouraged to participate.",
        ],
        chineseContent: [
          "腰部博主持續擴散。",
          "分享自己使用 Eureka 後發現的清潔盲點。",
          "展示產品如何處理被忽略的地方。",
        ],
        thumbnail: "/images/timeline-momentum.jpg",
      },
      {
        id: "world-cleanup",
        date: "09/20",
        title: "Make the unseen visible.",
        chineseTitle: "Make the unseen visible.",
        content: [
          "Creator callback stories and short-form content.",
          "Before/after cleaning transformations.",
          "Re-emphasise shared action, home-based care and campaign participation.",
        ],
        chineseContent: [
          "世界清潔地球日爆發。",
          "博主回訪式分享、清潔前後對比與行動號召。",
          "讓每一個被忽略的角落，都被重新看見。",
        ],
        thumbnail: "/images/timeline-world-cleanup.jpg",
        isHighlight: true,
      },
    ] as TimelineItem[],
  },

  participation: {
    title: { en: "Join the Discovery", zh: "一起發現，一起行動" },
    supporting: {
      en: "Find an unseen corner. Take action. Share the difference.",
      zh: "發現一個被忽略的角落，完成一次清潔行動，分享你的改變。",
    },
    steps: [
      {
        number: "01",
        title: { en: "Find", zh: "發現" },
        description: {
          en: "Look for an overlooked cleaning corner, a home in need of help, or a small action that can make a difference.",
          zh: "尋找一個被忽略的清潔角落、一個需要幫助的家，或一個能帶來改變的小行動。",
        },
      },
      {
        number: "02",
        title: { en: "Clean", zh: "行動" },
        description: {
          en: "Clean it yourself or lend a hand to someone around you.",
          zh: "親自動手清潔，或向身邊的人伸出援手。",
        },
      },
      {
        number: "03",
        title: { en: "Share", zh: "分享" },
        description: {
          en: "Post your discovery with #EurekaFindsTheUnseen for a chance to be featured / win campaign rewards.",
          zh: "以 #EurekaFindsTheUnseen 分享你的發現，有機會被精選展示或贏取 campaign 獎品。",
        },
      },
    ],
    details: {
      campaignPeriod: "[Campaign Start Date] – [Campaign End Date]",
      eligibleLocations: "[Eligible locations to be confirmed]",
      requirements: "[Participation requirements to be confirmed]",
      hashtag: "#EurekaFindsTheUnseen",
      platforms: "[Submission platform(s) to be confirmed]",
      winnerSelection: "[Winner selection method to be confirmed]",
      winnerAnnouncement: "[Winner announcement date to be confirmed]",
      prizes: "[Prize details to be confirmed]",
      termsUrl: "#terms",
      privacyNote:
        "[Content permission and privacy note to be confirmed by legal team]",
    },
  },

  finalCta: {
    headline: { en: "What will you find next?", zh: "What will you find next?" },
    supporting: [
      {
        en: "The unseen is everywhere.",
        zh: "被忽略的地方無處不在。",
      },
      {
        en: "The difference begins when someone chooses to look closer.",
        zh: "當我們願意仔細發現，改變就開始了。",
      },
    ],
    primaryCta: { en: "Find the Unseen", zh: "Find the Unseen" },
    secondaryCta: { en: "Discover J15 Max Ultra", zh: "探索 J15 Max Ultra" },
    tertiaryCta: { en: "Shop Now", zh: "立即選購" },
  },

  footer: {
    copyright: "© 2026 Eureka. All rights reserved.",
    social: [
      { platform: "Instagram", url: "#" },
      { platform: "Facebook", url: "#" },
      { platform: "YouTube", url: "#" },
    ],
  },

  assets: {
    heroHomeClean: "/images/hero-home-clean.jpg?v=3",
    heroHomeDust: "/images/hero-home-dust.jpg?v=4",
    unseenSofa: "/images/unseen-sofa-gap.jpg?v=4",
    unseenCarpet: "/images/unseen-carpet.jpg?v=4",
    unseenCorner: "/images/unseen-corner.jpg?v=4",
    heroVideo: "/videos/hero-home.mp4",
    heroPoster: "/images/hero-home-poster.jpg",
    heroRobot: "/images/robot-j15-hero.png",
    greekWater: "/images/greek-water.jpg",
    homeLiving: "/images/home-living.jpg",
    homeDetection: "/images/home-detection.jpg",
    productHero: "/images/product-j15-full.png",
    productDock: "/images/product-dock.png",
    robotActivationSound: "/audio/robot-activation.mp3",
  },

  sections: [
    { id: "hero", label: { en: "Opening", zh: "開場" } },
    { id: "origin", label: { en: "Origin", zh: "起源" } },
    { id: "unseen", label: { en: "Unseen", zh: "隱藏" } },
    { id: "care", label: { en: "Care", zh: "關懷" } },
    { id: "campaign", label: { en: "Giveaway", zh: "活動" } },
    { id: "creators", label: { en: "Creators", zh: "創作者" } },
  ],
} as const;

export type CampaignData = typeof campaignData;

export function t(text: { en: string; zh: string }, locale: Locale): string {
  return locale === "zh-Hant" ? text.zh : text.en;
}
