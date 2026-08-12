export type ServiceFaq = {
  q: string;
  a: string;
};

export type Service = {
  slug: string;
  num: string;
  title: string;
  shortTitle: string;
  desc: string;
  accent: string;
  headline: string;
  body: string[];
  cta: string;
  faqs: ServiceFaq[];
};

export const SERVICES: Service[] = [
  {
    slug: 'branding',
    num: '01',
    title: 'Branding',
    shortTitle: 'Branding',
    desc: 'Complete brand identity systems that define how the world perceives you.',
    accent: '#2F5BFF',
    headline: "A brand isn't a logo. It's a decision everyone else stops arguing with.",
    body: [
      "Every business eventually competes on identity, not just price. As a branding agency in India built for founders who want more than a logo file, Allsoll builds complete brand identity systems — visual language, tone, positioning — that shape how the world perceives you before you say a word. We're not chasing top branding agencies in India lists for the badge. We're building brands that make those lists inevitable.",
      "If you're comparing the best branding agency in India for your next identity overhaul, here's the difference: most agencies deliver a logo. We deliver a system that holds up across every touchpoint, five years from now.",
    ],
    cta: "Ready to be one of the top 10 branding companies in India talk about? Let's build the identity first.",
    faqs: [
      {
        q: 'What exactly is included in a "branding" project with Allsoll?',
        a: 'A complete identity system — logo, visual language, tone of voice, and positioning — built to work together across every touchpoint, not just a standalone logo file.',
      },
      {
        q: 'How is Allsoll different from other branding agencies in India?',
        a: 'Most agencies stop at design. We start with positioning — how you want to be perceived — and let design follow from that, not the other way around.',
      },
      {
        q: 'Do you only work with established businesses, or also early-stage founders?',
        a: 'Both. Early-stage founders often need this the most — the identity you launch with becomes the one people remember you by.',
      },
      {
        q: 'What happens after the brand identity is delivered — do you support rollout?',
        a: 'Yes. We hand over full brand guidelines and can support execution across your first campaigns, website, or packaging so the identity is applied consistently from day one.',
      },
    ],
  },
  {
    slug: 'brand-consultation-strategy',
    num: '02',
    title: 'Brand Consultation & Strategy',
    shortTitle: 'Strategy',
    desc: 'Strategic frameworks for market positioning and competitive advantage.',
    accent: '#FFD43B',
    headline: "Strategy isn't a deck. It's the reason your next move works.",
    body: [
      "Most businesses don't fail from lack of effort — they fail from lack of direction. As a marketing agency in Jaipur built around real performance marketing management, not performance theatre, Allsoll builds strategic frameworks for market positioning that translate into competitive advantage — the kind that compounds instead of resetting every campaign.",
      "If you've worked with a performance marketing expert before and still felt like you were guessing, that's the strategy layer missing. We fix that first, before a single ad goes live.",
    ],
    cta: "Positioning first. Everything else follows. Let's talk strategy.",
    faqs: [
      {
        q: 'What does a brand strategy engagement with Allsoll actually look like?',
        a: 'Market research, competitor mapping, and positioning workshops that end with a clear strategic framework — what you stand for, who it’s for, and how you win against alternatives.',
      },
      {
        q: 'Is this only for large businesses, or does it work for smaller teams too?',
        a: 'It works for both. Smaller teams often benefit more, since strategy prevents wasted spend on content and ads that don’t have a clear direction behind them.',
      },
      {
        q: 'How is strategy different from just running ads or content?',
        a: 'Ads and content are execution. Strategy is the decision-making layer underneath — without it, every campaign starts from zero instead of building on the last one.',
      },
      {
        q: 'What deliverables do we walk away with?',
        a: 'A positioning document, target audience definition, messaging pillars, and a competitive framework you can hand to any team — internal or external — to execute against.',
      },
    ],
  },
  {
    slug: 'expert-social-media',
    num: '03',
    title: 'Expert Social Media',
    shortTitle: 'Social',
    desc: 'Transforming your online presence into result-driven, omnipresent channels.',
    accent: '#E53935',
    headline: "Posting isn't a strategy. Being unmissable is.",
    body: [
      "Social media isn't a content calendar — it's a distribution system. Allsoll transforms your online presence into result-driven, omnipresent channels, backed by the same discipline used by the best performance marketing agencies: data-led, not guesswork-led. This is performance marketing management applied to every post, every platform, every scroll.",
      "If you've tried a digital marketing agency in Jaipur before and got vanity metrics instead of movement, this is the difference — we optimize for recall, not just reach.",
    ],
    cta: "Let's make your feed impossible to scroll past.",
    faqs: [
      {
        q: 'Which platforms does Allsoll manage — Instagram, LinkedIn, both?',
        a: 'Both, along with others depending on where your audience actually is. Platform choice follows strategy, not the reverse.',
      },
      {
        q: 'How is "expert social media" different from a regular social media package?',
        a: 'We manage for outcomes — recall, engagement, and conversion — not just a fixed number of posts a week. Every piece of content is tied back to a goal.',
      },
      {
        q: 'Do you handle paid ads too, or only organic content?',
        a: 'Yes, we handle both organic content and paid campaigns, so the two work together instead of competing for budget and attention.',
      },
      {
        q: 'What does reporting and performance tracking look like?',
        a: "Monthly reports covering reach, engagement, and conversion metrics, along with what we're adjusting for the next cycle based on what's working.",
      },
    ],
  },
  {
    slug: 'website-design-development',
    num: '04',
    title: 'Website Design & Development',
    shortTitle: 'Digital',
    desc: 'Immersive, luxury digital experiences that convert visitors into believers.',
    accent: '#2F5BFF',
    headline: "Your website isn't a brochure. It's your best salesperson.",
    body: [
      "Most websites explain a business. Few convert visitors into believers. As a digital marketing agency for startups and established brands alike, Allsoll builds immersive, luxury digital experiences designed to move people from curiosity to conviction. This isn't templated web design — it's the same brand system your identity runs on, built into every scroll, click and load.",
      "Whether you're a startup building your first web presence, working with a digital marketing agency in Jaipur that treats your website as a brand asset, not just a URL, changes what it can do for you.",
    ],
    cta: "A site that sells before your sales team even shows up. Let's build it.",
    faqs: [
      {
        q: 'Do you build custom websites or use templates?',
        a: 'Fully custom: every site is designed around your specific brand system, not adapted from a pre-built theme.',
      },
      {
        q: 'Is this suitable for e-commerce or product-based businesses?',
        a: 'Yes, we build e-commerce experiences designed to convert, not just display a product catalogue.',
      },
      {
        q: 'Will the website be optimized for mobile and speed?',
        a: 'Yes, mobile responsiveness and load speed are built in from the design stage, not patched in afterward.',
      },
      {
        q: 'Do you offer ongoing maintenance after launch?',
        a: 'Yes, we offer maintenance packages covering updates, hosting support, and minor content changes post-launch.',
      },
    ],
  },
  {
    slug: 'luxury-marketing',
    num: '05',
    title: 'Luxury Marketing',
    shortTitle: 'Luxury',
    desc: 'Premium campaigns that elevate brand perception and drive exclusivity.',
    accent: '#FFD43B',
    headline: "Exclusivity isn't a price tag. It's a feeling you can't fake.",
    body: [
      'Premium positioning takes more than a higher price point — it takes campaigns built with restraint, precision, and intent. As one of the best ad agencies in India for luxury and premium brands, Allsoll builds campaigns that elevate brand perception and drive exclusivity, not just impressions.',
      "This is where a performance marketing expert meets brand judgement — the kind you'd expect from the top 10 branding companies in India, not a generic ad shop running the same playbook for every client.",
    ],
    cta: "If your brand deserves to feel rare, let's market it like it is.",
    faqs: [
      {
        q: "What kind of brands does Allsoll's luxury marketing serve?",
        a: 'Premium and luxury-positioned brands across fashion, jewellery, hospitality, and lifestyle — anywhere perception directly drives price and demand.',
      },
      {
        q: 'How is luxury marketing different from regular performance marketing?',
        a: 'It optimizes for perception and exclusivity alongside conversion. A luxury campaign that only chases clicks usually ends up devaluing the brand it’s meant to elevate.',
      },
      {
        q: 'Do you handle both strategy and execution for luxury campaigns?',
        a: 'Yes, from positioning and creative direction through to media planning and execution.',
      },
      {
        q: 'Can smaller premium brands work with Allsoll, or only established luxury names?',
        a: 'Smaller premium brands are welcome. Luxury marketing is about how a brand is presented, not the size of the company behind it.',
      },
    ],
  },
  {
    slug: 'brand-photoshoots',
    num: '06',
    title: 'Brand Photoshoots',
    shortTitle: 'Photoshoots',
    desc: "Visual storytelling that captures your brand's essence with cinematic precision.",
    accent: '#E53935',
    headline: "A photo can say what a hundred posts can't.",
    body: [
      "Visual storytelling is where most brands cut corners — and where it shows the most. Allsoll's brand photoshoots capture your brand's essence with cinematic precision, the same visual standard you'd expect from the top creative agencies in India, not stock-photo substitutes dressed up as content.",
      "Whether you're a marketing agency in Jaipur client needing a year's worth of brand assets, or a founder who needs one campaign shot right, we treat every frame like it has to last.",
    ],
    cta: "Some brands need more content. Yours needs better frames. Let's shoot.",
    faqs: [
      {
        q: "What's included in a brand photoshoot package?",
        a: 'Concept development, styling direction, the shoot itself, and post-production delivered as a ready-to-use asset set, not just raw files.',
      },
      {
        q: 'Do you handle concept, styling and location, or just the shoot itself?',
        a: 'We handle the full production — concept, styling, location scouting, and shoot execution — so the visuals stay consistent with your brand identity.',
      },
      {
        q: 'How many final images/assets do we typically receive?',
        a: 'This varies by package scope, discussed and finalized before the shoot.',
      },
      {
        q: 'Can this be combined with video or reels content?',
        a: 'Yes, we regularly combine photoshoots with reels and short-form video content in the same production day to maximize output.',
      },
    ],
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug) ?? null;
}

export function getAdjacentServices(slug: string) {
  const index = SERVICES.findIndex((s) => s.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: SERVICES[(index - 1 + SERVICES.length) % SERVICES.length],
    next: SERVICES[(index + 1) % SERVICES.length],
  };
}
