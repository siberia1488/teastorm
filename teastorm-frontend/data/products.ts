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
  // 1. Da Hong Pao
  {
    id: "da-hong-pao",
    slug: "da-hong-pao",
    title: "Da Hong Pao",
    subtitle: "Big Red Robe Oolong",
    shortDescription:
      "Legendary Wuyi oolong with deep roasted character and long, warming finish.",
    category: "oolong",
    origin: {
      region: "Wuyi Mountains, Fujian",
      country: "China",
      harvestYear: 2025,
    },
    flavorNotes: ["roasted nuts", "cocoa", "spice", "mineral"],
    effect: "Balancing",
    description:
      "Da Hong Pao is one of China’s most iconic oolong teas, grown on the rocky cliffs of the Wuyi Mountains. Medium roasting reveals a dense, mineral-rich body with layers of roasted nuts, cocoa, and subtle spice. The finish is long, clean, and grounding.",
    brewingGuide:
      "Use 5–6g per 100ml. Water temperature 95–100°C (203–212°F). Short infusions with gradual increases. Suitable for 5–6 infusions.",
    variants: [
      { id: "da-hong-pao-50g", label: "50 g", weightGrams: 50, priceUsd: 24 },
      { id: "da-hong-pao-100g", label: "100 g", weightGrams: 100, priceUsd: 44 },
    ],
    image: "/images/da-hong-pao.jpg",
    badge: "Focus",
  },

  // 2. Jin Xuan
  {
    id: "jin-xuan",
    slug: "jin-xuan",
    title: "Jin Xuan",
    subtitle: "Milk Oolong",
    shortDescription:
      "Creamy Taiwanese oolong with soft floral notes and natural sweetness.",
    category: "oolong",
    origin: {
      region: "Nantou, Taiwan",
      country: "Taiwan",
      harvestYear: 2025,
    },
    flavorNotes: ["cream", "butter", "orchid", "caramel"],
    effect: "Calming",
    description:
      "Jin Xuan, often called Milk Oolong, is known for its naturally creamy aroma and smooth, comforting taste. Soft floral notes blend with gentle sweetness, creating a deeply relaxing and approachable tea.",
    brewingGuide:
      "Use 5g per 100ml. Water temperature 90–95°C (194–203°F). Gentle infusions раскрывают сливочные ноты.",
    variants: [
      { id: "jin-xuan-50g", label: "50 g", weightGrams: 50, priceUsd: 22 },
      { id: "jin-xuan-100g", label: "100 g", weightGrams: 100, priceUsd: 40 },
    ],
    image: "/images/jin-xuan.jpg",
    badge: "Calm",
  },

  // 3. Yue Guang Bai
  {
    id: "yue-guang-bai",
    slug: "yue-guang-bai",
    title: "Yue Guang Bai",
    subtitle: "White Moonlight",
    shortDescription:
      "Elegant white tea with floral sweetness and silky, clean finish.",
    category: "white",
    origin: {
      region: "Yunnan",
      country: "China",
      harvestYear: 2025,
    },
    flavorNotes: ["white flowers", "honey", "melon"],
    effect: "Calming",
    description:
      "Yue Guang Bai, also known as White Moonlight, is a refined white tea made from carefully processed leaves dried indoors. The cup is soft, floral, and gently sweet, with a calming and meditative character.",
    brewingGuide:
      "Use 4–5g per 100ml. Water temperature 85–90°C (185–194°F). Longer gentle infusions раскрывают сладость.",
    variants: [
      { id: "yue-guang-bai-50g", label: "50 g", weightGrams: 50, priceUsd: 22 },
      { id: "yue-guang-bai-100g", label: "100 g", weightGrams: 100, priceUsd: 38 },
    ],
    image: "/images/yue-guang-bai.jpg",
    badge: "Calm",
  },

  // 4. Lao Shou Mei 2018
  {
    id: "lao-shou-mei-2018",
    slug: "lao-shou-mei-2018",
    title: "Lao Shou Mei",
    subtitle: "Aged White Tea (2018)",
    shortDescription:
      "Aged white tea with deep sweetness and warming, comforting body.",
    category: "white",
    origin: {
      region: "Fujian",
      country: "China",
      harvestYear: 2018,
    },
    flavorNotes: ["dried fruit", "dates", "soft wood"],
    effect: "Balancing",
    description:
      "This aged Shou Mei white tea from 2018 offers a rich, smooth profile with notes of dried fruits and soft wood. Time has rounded the edges, creating a warming and grounding cup.",
    brewingGuide:
      "Use 5g per 100ml. Water temperature 90–95°C (194–203°F). выдерживает длительные настои.",
    variants: [
      { id: "lao-shou-mei-50g", label: "50 g", weightGrams: 50, priceUsd: 24 },
      { id: "lao-shou-mei-100g", label: "100 g", weightGrams: 100, priceUsd: 42 },
    ],
    image: "/images/lao-shou-mei.jpg",
  },

  // 5. GABA Nantou
  {
    id: "gaba-nantou",
    slug: "gaba-nantou",
    title: "GABA Oolong",
    subtitle: "Nantou, Taiwan",
    shortDescription:
      "Relaxing GABA oolong with sweet, baked fruit and spice notes.",
    category: "oolong",
    origin: {
      region: "Nantou",
      country: "Taiwan",
      harvestYear: 2025,
    },
    flavorNotes: ["baked fruit", "spice", "honey"],
    effect: "Calming",
    description:
      "Produced using GABA fermentation, this Taiwanese oolong is prized for its calming effect and soft, sweet flavor. Ideal for evening sessions and stress relief.",
    brewingGuide:
      "Use 5g per 100ml. Water temperature 95°C (203°F). Подходит для настаивания.",
    variants: [
      { id: "gaba-50g", label: "50 g", weightGrams: 50, priceUsd: 28 },
    ],
    image: "/images/gaba.jpg",
    badge: "Calm",
  },

  // 6. Dragon Pearl 2012
  {
    id: "dragon-pearl-2012",
    slug: "dragon-pearl-2012",
    title: "Dragon Pearl",
    subtitle: "Shu Pu-erh Pearls (2012)",
    shortDescription:
      "Rich aged shu pu-erh rolled into convenient tea pearls.",
    category: "puerh",
    origin: {
      region: "Menghai, Yunnan",
      country: "China",
      harvestYear: 2012,
    },
    flavorNotes: ["earthy", "cocoa", "cream"],
    effect: "Energizing",
    description:
      "Aged shu pu-erh formed into pearls for convenience. Deep, smooth, and comforting with earthy sweetness and a creamy mouthfeel.",
    brewingGuide:
      "1 pearl per 100–120ml. Boiling water. Rinse once, then short infusions.",
    variants: [
      { id: "dragon-pearl-50g", label: "50 g", weightGrams: 50, priceUsd: 30 },
    ],
    image: "/images/dragon-pearl.jpg",
  },

  // 7. Green Mark 2006
  {
    id: "green-mark-2006",
    slug: "green-mark-2006",
    title: "Green Mark",
    subtitle: "Aged Sheng Pu-erh (2006)",
    shortDescription:
      "Classic aged sheng pu-erh with camphor and woody depth.",
    category: "puerh",
    origin: {
      region: "Menghai, Yunnan",
      country: "China",
      harvestYear: 2006,
    },
    flavorNotes: ["camphor", "wood", "sweet earth"],
    effect: "Balancing",
    description:
      "A well-aged sheng pu-erh with evolving layers of camphor, wood, and sweet earth. A meditative tea for experienced drinkers.",
    brewingGuide:
      "Use 5–6g per 100ml. Boiling water. Short, attentive infusions.",
    variants: [
      { id: "green-mark-cake", label: "357 g cake", priceUsd: 120 },
    ],
    image: "/images/green-mark.jpg",
  },

  // 8. Dian Hong Mao Feng
  {
    id: "dian-hong-mao-feng",
    slug: "dian-hong-mao-feng",
    title: "Dian Hong Mao Feng",
    subtitle: "Yunnan Black Tea",
    shortDescription:
      "Warm, honeyed black tea with cocoa and baked fruit notes.",
    category: "black",
    origin: {
      region: "Yunnan",
      country: "China",
      harvestYear: 2024,
    },
    flavorNotes: ["honey", "cocoa", "baked fruit"],
    effect: "Energizing",
    description:
      "Premium Dian Hong made from tender buds. Smooth, warming, and naturally sweet with a rich, comforting body.",
    brewingGuide:
      "Use 4–5g per 100ml. Water temperature 90–95°C (194–203°F).",
    variants: [
      { id: "dian-hong-50g", label: "50 g", weightGrams: 50, priceUsd: 26 },
    ],
    image: "/images/dian-hong.jpg",
    badge: "Energy",
  },

  // 9. Longjing 2023
  {
    id: "longjing-2023",
    slug: "longjing-2023",
    title: "Longjing",
    subtitle: "Dragon Well Green Tea",
    shortDescription:
      "Classic pan-fired green tea with nutty sweetness and freshness.",
    category: "green",
    origin: {
      region: "Hangzhou, Zhejiang",
      country: "China",
      harvestYear: 2023,
    },
    flavorNotes: ["chestnut", "fresh grass", "sweet finish"],
    effect: "Focusing",
    description:
      "One of China’s most famous green teas. Smooth, nutty, and refreshing with a clean, lingering sweetness.",
    brewingGuide:
      "Use 4g per 100ml. Water temperature 75–80°C (167–176°F).",
    variants: [
      { id: "longjing-50g", label: "50 g", weightGrams: 50, priceUsd: 39 },
    ],
    image: "/images/longjing.jpg",
    badge: "Focus",
  },

  // 10. Mao Jian Ye Sheng (Wild)
  {
    id: "mao-jian-wild",
    slug: "mao-jian-wild",
    title: "Mao Jian Ye Sheng",
    subtitle: "Wild Green Tea",
    shortDescription:
      "Bright wild green tea with floral aroma and fresh acidity.",
    category: "green",
    origin: {
      region: "Fujian",
      country: "China",
      harvestYear: 2025,
    },
    flavorNotes: ["fresh herbs", "flowers", "light fruit"],
    effect: "Energizing",
    description:
      "Harvested from wild-growing tea trees, offering a lively and refreshing cup with natural complexity.",
    brewingGuide:
      "Use 4g per 100ml. Water temperature up to 80°C (176°F).",
    variants: [
      { id: "mao-jian-wild-50g", label: "50 g", weightGrams: 50, priceUsd: 20 },
    ],
    image: "/images/mao-jian-wild.jpg",
    badge: "Energy",
  },

  // 11. Shu Pu-erh Gongting 2018
  {
    id: "gongting-shu-2018",
    slug: "gongting-shu-2018",
    title: "Gongting Shu Pu-erh",
    subtitle: "Imperial Grade (2018)",
    shortDescription:
      "Smooth shu pu-erh with deep sweetness and clean body.",
    category: "puerh",
    origin: {
      region: "Lincang, Yunnan",
      country: "China",
      harvestYear: 2018,
    },
    flavorNotes: ["sweet earth", "dark chocolate", "dates"],
    effect: "Energizing",
    description:
      "High-grade shu pu-erh made from tender buds. Dense, smooth, and easy-drinking.",
    brewingGuide:
      "Use boiling water. Rinse once. Short infusions.",
    variants: [
      { id: "gongting-50g", label: "50 g", weightGrams: 50, priceUsd: 18 },
    ],
    image: "/images/gongting.jpg",
  },

  // 12. Dan Cong Ya Shi Xiang
  {
    id: "ya-shi-xiang",
    slug: "ya-shi-xiang",
    title: "Ya Shi Xiang",
    subtitle: "Duck Shit Aroma Oolong",
    shortDescription:
      "Highly aromatic Dan Cong oolong with floral and fruity depth.",
    category: "oolong",
    origin: {
      region: "Fenghuang, Guangdong",
      country: "China",
      harvestYear: 2025,
    },
    flavorNotes: ["orchid", "stone fruit", "honey"],
    effect: "Focusing",
    description:
      "A famous Dan Cong oolong with intense aroma and layered flavor. Elegant and expressive.",
    brewingGuide:
      "Use 6g per 100ml. Water temperature 95°C (203°F).",
    variants: [
      { id: "ya-shi-xiang-50g", label: "50 g", weightGrams: 50, priceUsd: 32 },
    ],
    image: "/images/ya-shi-xiang.jpg",
    badge: "Focus",
  },

  // 13. Lincang Sheng Pu-erh 2018
  {
    id: "lincang-sheng-2018",
    slug: "lincang-sheng-2018",
    title: "Lincang Sheng Pu-erh",
    subtitle: "Raw Pu-erh (2018)",
    shortDescription:
      "Bright and structured sheng pu-erh with woody sweetness.",
    category: "puerh",
    origin: {
      region: "Lincang, Yunnan",
      country: "China",
      harvestYear: 2018,
    },
    flavorNotes: ["wood", "sweet bitterness", "dried fruit"],
    effect: "Energizing",
    description:
      "High-altitude sheng pu-erh with clean structure and evolving character.",
    brewingGuide:
      "Use boiling water. Short infusions, increase gradually.",
    variants: [
      { id: "lincang-sheng-50g", label: "50 g", weightGrams: 50, priceUsd: 16 },
    ],
    image: "/images/lincang-sheng.jpg",
  },

  // 14. Long Zhu Pearls
  {
    id: "long-zhu",
    slug: "long-zhu",
    title: "Long Zhu",
    subtitle: "Dragon Pearl Black Tea",
    shortDescription:
      "Rolled black tea pearls with cocoa and creamy sweetness.",
    category: "black",
    origin: {
      region: "Yunnan",
      country: "China",
      harvestYear: 2025,
    },
    flavorNotes: ["cocoa", "cream", "baked bread"],
    effect: "Balancing",
    description:
      "Hand-rolled black tea pearls that unfurl slowly, releasing a rich and comforting cup.",
    brewingGuide:
      "Use 3–4 pearls per 200ml. Water temperature 95°C (203°F).",
    variants: [
      { id: "long-zhu-50g", label: "50 g", weightGrams: 50, priceUsd: 25 },
    ],
    image: "/images/long-zhu.jpg",
  },
];

export function getProductMinPrice(product: {
  variants: { priceUsd: number }[];
}) {
  return Math.min(...product.variants.map((v) => v.priceUsd));
}
