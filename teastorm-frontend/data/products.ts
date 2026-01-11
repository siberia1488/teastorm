export type ProductVariant = {
  id: string;
  label: string;
  weightGrams?: number;
  priceUsd: number;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  category: "oolong" | "green" | "black" | "white" | "puerh";
  origin: {
    region: string;
    country: string;
    harvestYear: number;
  };
  flavorNotes: string[];
  effect: "Calming" | "Energizing" | "Focusing" | "Balancing";
  description: string;
  brewingGuide: string;
  variants: ProductVariant[];
  image: string;
  badge?: "Calm" | "Energy" | "Focus";
};

export const products: Product[] = [
  // 1) Zhang Xiang Green Mark — cake only
  {
    id: "green-mark-2006",
    slug: "green-mark-2006",
    title: "Zhang Xiang Green Mark",
    subtitle: "Aged Sheng Pu-erh Cake (2006)",
    shortDescription: "Legendary aged sheng pu-erh with camphor and woody depth.",
    category: "puerh",
    origin: { region: "Menghai, Yunnan", country: "China", harvestYear: 2006 },
    flavorNotes: ["camphor", "aged wood", "sweet earth"],
    effect: "Balancing",
    description:
      "A highly sought-after 2006 sheng pu-erh cake with deep camphor notes, smooth woody sweetness, and a long evolving finish.",
    brewingGuide:
      "Use 5–6g per 100ml. Boiling water. Rinse once, then short infusions.",
    variants: [
      { id: "green-mark-cake", label: "375 g cake", weightGrams: 375, priceUsd: 148 },
    ],
    image: "/images/green-mark.jpg",
  },

  // 2) Bulangshan Peacock — cake only
  {
    id: "bulangshan-peacock",
    slug: "bulangshan-peacock",
    title: "Bulangshan Peacock",
    subtitle: "Sheng Pu-erh Cake",
    shortDescription: "Powerful Bulangshan sheng pu-erh with wild mountain character.",
    category: "puerh",
    origin: { region: "Bulangshan, Yunnan", country: "China", harvestYear: 2023 },
    flavorNotes: ["wild herbs", "bitterness", "mineral", "floral"],
    effect: "Energizing",
    description:
      "A bold and expressive Bulangshan sheng pu-erh pressed into a 375 g cake with layered bitterness and mineral depth.",
    brewingGuide:
      "Use 5–6g per 100ml. Boiling water. Short infusions.",
    variants: [
      {
        id: "bulangshan-peacock-cake",
        label: "375 g cake",
        weightGrams: 375,
        priceUsd: 116,
      },
    ],
    image: "/images/bulangshan-peacock.jpg",
  },

  // 3) GABA Oolong
  {
    id: "gaba-nantou",
    slug: "gaba-nantou",
    title: "GABA Oolong",
    subtitle: "Nantou, Taiwan",
    shortDescription: "Relaxing GABA oolong with sweet baked-fruit notes.",
    category: "oolong",
    origin: { region: "Nantou", country: "Taiwan", harvestYear: 2025 },
    flavorNotes: ["baked fruit", "honey", "spice"],
    effect: "Calming",
    description:
      "A smooth and calming GABA-fermented oolong with soft sweetness and warm spice.",
    brewingGuide: "Use 5g per 100ml. Water at 95°C (203°F).",
    variants: [
      { id: "gaba-50g", label: "50 g", weightGrams: 50, priceUsd: 16.99 },
      { id: "gaba-100g", label: "100 g", weightGrams: 100, priceUsd: 33.99 },
      { id: "gaba-250g", label: "250 g", weightGrams: 250, priceUsd: 83.99 },
    ],
    image: "/images/gaba.jpg",
    badge: "Calm",
  },

  // 4) Shu Pu-erh Dragon Pearls
  {
    id: "dragon-pearl-2012",
    slug: "dragon-pearl-2012",
    title: "Dragon Pearls",
    subtitle: "Shu Pu-erh Pearls",
    shortDescription: "Rich aged shu pu-erh rolled into convenient pearls.",
    category: "puerh",
    origin: { region: "Menghai, Yunnan", country: "China", harvestYear: 2012 },
    flavorNotes: ["earthy", "cocoa", "cream"],
    effect: "Energizing",
    description:
      "Deep and smooth shu pu-erh pearls with earthy sweetness and a creamy body.",
    brewingGuide:
      "1–2 pearls per 120ml. Boiling water. Rinse once, then short infusions.",
    variants: [
      { id: "dragon-pearl-50g", label: "50 g", weightGrams: 50, priceUsd: 15.99 },
      { id: "dragon-pearl-100g", label: "100 g", weightGrams: 100, priceUsd: 31.99 },
      { id: "dragon-pearl-250g", label: "250 g", weightGrams: 250, priceUsd: 79.99 },
    ],
    image: "/images/dragon-pearl.jpg",
  },

  // 5) Shi Xiang Dan Cong
  {
    id: "ya-shi-xiang",
    slug: "ya-shi-xiang",
    title: "Shi Xiang Dan Cong",
    subtitle: "Phoenix Oolong",
    shortDescription: "Highly aromatic Dan Cong with floral and fruity depth.",
    category: "oolong",
    origin: { region: "Fenghuang, Guangdong", country: "China", harvestYear: 2025 },
    flavorNotes: ["orchid", "stone fruit", "honey"],
    effect: "Focusing",
    description:
      "A famous Dan Cong oolong with intense aroma and layered, elegant flavor.",
    brewingGuide: "Use 6g per 100ml. Water at 95°C (203°F).",
    variants: [
      { id: "ya-shi-xiang-50g", label: "50 g", weightGrams: 50, priceUsd: 23.99 },
      { id: "ya-shi-xiang-100g", label: "100 g", weightGrams: 100, priceUsd: 47.99 },
      { id: "ya-shi-xiang-250g", label: "250 g", weightGrams: 250, priceUsd: 115.99 },
    ],
    image: "/images/ya-shi-xiang.jpg",
    badge: "Focus",
  },

  // 6) Da Hong Pao
  {
    id: "da-hong-pao",
    slug: "da-hong-pao",
    title: "Da Hong Pao",
    subtitle: "Big Red Robe Oolong",
    shortDescription: "Legendary Wuyi rock oolong with deep roasted character.",
    category: "oolong",
    origin: { region: "Wuyi Mountains, Fujian", country: "China", harvestYear: 2025 },
    flavorNotes: ["roasted nuts", "cocoa", "mineral"],
    effect: "Balancing",
    description:
      "A classic Wuyi rock oolong with mineral depth and long, warming finish.",
    brewingGuide: "Use 5–6g per 100ml. Water at 95–100°C.",
    variants: [
      { id: "da-hong-pao-50g", label: "50 g", weightGrams: 50, priceUsd: 11.99 },
      { id: "da-hong-pao-100g", label: "100 g", weightGrams: 100, priceUsd: 23.99 },
      { id: "da-hong-pao-250g", label: "250 g", weightGrams: 250, priceUsd: 58.99 },
    ],
    image: "/images/da-hong-pao.jpg",
    badge: "Focus",
  },

  // 7) Milk Oolong (Jin Xuan)
  {
    id: "jin-xuan",
    slug: "jin-xuan",
    title: "Milk Oolong",
    subtitle: "Jin Xuan",
    shortDescription: "Naturally creamy Taiwanese oolong with floral sweetness.",
    category: "oolong",
    origin: { region: "Nantou, Taiwan", country: "Taiwan", harvestYear: 2025 },
    flavorNotes: ["cream", "butter", "orchid"],
    effect: "Calming",
    description:
      "A smooth and comforting oolong with soft floral aroma and creamy body.",
    brewingGuide: "Use 5g per 100ml. Water at 90–95°C.",
    variants: [
      { id: "jin-xuan-50g", label: "50 g", weightGrams: 50, priceUsd: 14.99 },
      { id: "jin-xuan-100g", label: "100 g", weightGrams: 100, priceUsd: 29.99 },
      { id: "jin-xuan-250g", label: "250 g", weightGrams: 250, priceUsd: 71.99 },
    ],
    image: "/images/jin-xuan.jpg",
    badge: "Calm",
  },

  // 8) Dian Hong Mao Feng
  {
    id: "dian-hong-mao-feng",
    slug: "dian-hong-mao-feng",
    title: "Dian Hong Mao Feng",
    subtitle: "Yunnan Black Tea",
    shortDescription: "Warm, honeyed black tea with cocoa notes.",
    category: "black",
    origin: { region: "Yunnan", country: "China", harvestYear: 2024 },
    flavorNotes: ["honey", "cocoa", "baked fruit"],
    effect: "Energizing",
    description:
      "Premium Yunnan black tea made from tender buds with natural sweetness.",
    brewingGuide: "Use 4–5g per 100ml. Water at 90–95°C.",
    variants: [
      { id: "dian-hong-50g", label: "50 g", weightGrams: 50, priceUsd: 9.99 },
      { id: "dian-hong-100g", label: "100 g", weightGrams: 100, priceUsd: 19.99 },
      { id: "dian-hong-250g", label: "250 g", weightGrams: 250, priceUsd: 47.99 },
    ],
    image: "/images/dian-hong.jpg",
    badge: "Energy",
  },

  // 9) Lincang Gongting Shu
  {
    id: "gongting-shu-2018",
    slug: "gongting-shu-2018",
    title: "Lincang Gongting Shu",
    subtitle: "Ripe Pu-erh (2018)",
    shortDescription: "Smooth ripe pu-erh with deep sweetness.",
    category: "puerh",
    origin: { region: "Lincang, Yunnan", country: "China", harvestYear: 2018 },
    flavorNotes: ["sweet earth", "dark chocolate", "dates"],
    effect: "Energizing",
    description:
      "Imperial-grade ripe pu-erh with dense body and clean, sweet finish.",
    brewingGuide: "Boiling water. Rinse once. Short infusions.",
    variants: [
      { id: "gongting-50g", label: "50 g", weightGrams: 50, priceUsd: 12.99 },
      { id: "gongting-100g", label: "100 g", weightGrams: 100, priceUsd: 25.99 },
      { id: "gongting-250g", label: "250 g", weightGrams: 250, priceUsd: 62.99 },
    ],
    image: "/images/gongting.jpg",
  },

  // 10) Mao Jian Green
  {
    id: "mao-jian-wild",
    slug: "mao-jian-wild",
    title: "Mao Jian Green Tea",
    subtitle: "Wild Green",
    shortDescription: "Bright wild green tea with floral aroma.",
    category: "green",
    origin: { region: "Fujian", country: "China", harvestYear: 2025 },
    flavorNotes: ["fresh herbs", "flowers", "light fruit"],
    effect: "Energizing",
    description:
      "Harvested from wild tea trees, offering a lively and refreshing cup.",
    brewingGuide: "Use 4g per 100ml. Water up to 80°C.",
    variants: [
      { id: "mao-jian-wild-50g", label: "50 g", weightGrams: 50, priceUsd: 12.99 },
      { id: "mao-jian-wild-100g", label: "100 g", weightGrams: 100, priceUsd: 25.99 },
      { id: "mao-jian-wild-250g", label: "250 g", weightGrams: 250, priceUsd: 64.99 },
    ],
    image: "/images/mao-jian-wild.jpg",
    badge: "Energy",
  },

  // 11) Lao Shou Mei
  {
    id: "lao-shou-mei-2018",
    slug: "lao-shou-mei-2018",
    title: "Lao Shou Mei",
    subtitle: "Aged White Tea (2018)",
    shortDescription: "Aged white tea with deep sweetness and warmth.",
    category: "white",
    origin: { region: "Fujian", country: "China", harvestYear: 2018 },
    flavorNotes: ["dried fruit", "dates", "soft wood"],
    effect: "Balancing",
    description:
      "An aged white tea with rich sweetness and a smooth, comforting body.",
    brewingGuide: "Use 5g per 100ml. Water at 90–95°C.",
    variants: [
      { id: "lao-shou-mei-50g", label: "50 g", weightGrams: 50, priceUsd: 15.99 },
      { id: "lao-shou-mei-100g", label: "100 g", weightGrams: 100, priceUsd: 31.99 },
      { id: "lao-shou-mei-250g", label: "250 g", weightGrams: 250, priceUsd: 77.99 },
    ],
    image: "/images/lao-shou-mei.jpg",
  },

  // 12) Yue Guang Bai
  {
    id: "yue-guang-bai",
    slug: "yue-guang-bai",
    title: "Yue Guang Bai",
    subtitle: "White Moonlight",
    shortDescription: "Elegant white tea with floral sweetness.",
    category: "white",
    origin: { region: "Yunnan", country: "China", harvestYear: 2025 },
    flavorNotes: ["white flowers", "honey"],
    effect: "Calming",
    description:
      "Soft and sweet white tea with floral and honeyed character.",
    brewingGuide: "Use 4–5g per 100ml. Water at 85–90°C.",
    variants: [
      { id: "yue-guang-bai-50g", label: "50 g", weightGrams: 50, priceUsd: 13.99 },
      { id: "yue-guang-bai-100g", label: "100 g", weightGrams: 100, priceUsd: 27.99 },
      { id: "yue-guang-bai-250g", label: "250 g", weightGrams: 250, priceUsd: 69.99 },
    ],
    image: "/images/yue-guang-bai.jpg",
    badge: "Calm",
  },

  // 13) Zhengshan Xiaozhong (Lapsang Souchong)
  {
    id: "zhengshan-xiaozhong",
    slug: "zhengshan-xiaozhong",
    title: "Zhengshan Xiaozhong",
    subtitle: "Lapsang Souchong Black Tea",
    shortDescription: "Classic smoky black tea from Wuyi.",
    category: "black",
    origin: { region: "Wuyi Mountains, Fujian", country: "China", harvestYear: 2025 },
    flavorNotes: ["smoke", "pine", "dark cocoa"],
    effect: "Energizing",
    description:
      "Traditional Lapsang Souchong with pine-smoked aroma and rich black tea body.",
    brewingGuide: "Use 4–5g per 100ml. Water at 95°C.",
    variants: [
      { id: "xiaozhong-50g", label: "50 g", weightGrams: 50, priceUsd: 9.99 },
      { id: "xiaozhong-100g", label: "100 g", weightGrams: 100, priceUsd: 19.99 },
      { id: "xiaozhong-250g", label: "250 g", weightGrams: 250, priceUsd: 45.99 },
    ],
    image: "/images/zhengshan-xiaozhong.jpg",
    badge: "Energy",
  },

  // 14) Longjing
  {
    id: "longjing-2023",
    slug: "longjing-2023",
    title: "Longjing",
    subtitle: "Dragon Well Green Tea",
    shortDescription: "Famous pan-fired green tea with nutty sweetness.",
    category: "green",
    origin: { region: "Hangzhou, Zhejiang", country: "China", harvestYear: 2023 },
    flavorNotes: ["chestnut", "fresh grass", "sweet finish"],
    effect: "Focusing",
    description:
      "One of China’s most famous green teas, smooth and refreshing with a clean finish.",
    brewingGuide: "Use 4g per 100ml. Water at 75–80°C.",
    variants: [
      { id: "longjing-50g", label: "50 g", weightGrams: 50, priceUsd: 26.99 },
      { id: "longjing-100g", label: "100 g", weightGrams: 100, priceUsd: 53.99 },
      { id: "longjing-250g", label: "250 g", weightGrams: 250, priceUsd: 130.99 },
    ],
    image: "/images/longjing.jpg",
    badge: "Focus",
  },
];

export function getProductMinPrice(product: {
  variants: { priceUsd: number }[];
}) {
  return Math.min(...product.variants.map((v) => v.priceUsd));
}
