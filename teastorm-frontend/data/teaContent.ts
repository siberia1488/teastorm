export type TeaContent = {
  displayName: string
  tagline: string
  description: string

  origin?: string
  region?: string
  cultivar?: string
  elevation?: string
  harvest?: string
  processing?: string
  oxidation?: string
  roast?: string
  aging?: string

  aroma?: string
  body?: string
  aftertaste?: string

  flavorProfile?: string[]
  liquor?: string
  effect?: string

  brewing?: {
    gongfu?: string
    western?: string
  }
}



export const teaContent: Record<string, TeaContent> = {

  "green-mark-2006": {
    displayName: "Zhang Xiang Green Mark (2006)",
    tagline: "Aged Sheng Pu-erh Cake",
    description:
      "An exceptionally mature sheng pu-erh from 2006, shaped by time into a layered and meditative experience. Expect cooling camphor notes, forest floor depth, and a slow-building sweetness that unfolds across many infusions. A collector-level tea for contemplative sessions.",
    flavorProfile: [
      "cool camphor",
      "aged wood",
      "forest floor",
      "sweet resin",
      "lingering mineral finish",
    ],
    effect:
      "Deeply centering with slow, sustained mental clarity and tranquil alertness.",
    brewing: {
      gongfu: "5–6 g / 100 ml, boiling. Long session tea.",
      western: "4 g / 300 ml, 3–4 min.",
    },
  },

  "bulangshan-peacock": {
    displayName: "Bulangshan Peacock",
    tagline: "Wild Mountain Sheng Pu-erh",
    description:
      "A powerful young sheng from Bulang Mountain known for its assertive opening bitterness that melts into a pronounced returning sweetness. Vibrant, wild, and energetic — this tea showcases the raw spirit of ancient-tree material.",
    flavorProfile: [
      "wild herbs",
      "bitter greens",
      "mineral backbone",
      "orchid sweetness",
      "cooling aftertaste",
    ],
    effect:
      "Highly energizing with body warmth and strong mental focus.",
    brewing: {
      gongfu: "5 g / 100 ml, boiling.",
      western: "4 g / 300 ml.",
    },
  },

  "gaba-nantou": {
    displayName: "GABA Oolong",
    tagline: "Calming Taiwanese Oolong",
    description:
      "Anaerobically oxidized Taiwanese oolong crafted to elevate natural GABA levels. Thick, sweet, and soothing with baked-fruit richness and honeyed warmth — perfect for evening sessions or stress-free afternoons.",
    flavorProfile: [
      "baked apple",
      "honey",
      "brown sugar",
      "warm spice",
      "soft caramel finish",
    ],
    effect:
      "Deep relaxation paired with gentle emotional uplift and steady calm.",
    brewing: {
      gongfu: "5–6 g / 100 ml, 95°C.",
      western: "3 g / 250 ml, 3 min.",
    },
  },

  "dragon-pearls": {
    displayName: "Dragon Pearls Shu Pu-erh",
    tagline: "Hand-Rolled Ripe Pu-erh",
    description:
      "Silky ripe pu-erh formed into elegant pearls. Dense, chocolate-like body with creamy sweetness and comforting depth — a perfect everyday luxury brew.",
    flavorProfile: [
      "dark cocoa",
      "sweet earth",
      "cream",
      "dates",
      "molasses",
    ],
    effect:
      "Warming and grounding with digestive comfort.",
    brewing: {
      gongfu: "2 pearls / 120 ml.",
      western: "3 pearls / 300 ml.",
    },
  },

  "shi-xiang": {
    displayName: "Shi Xiang Dan Cong",
    tagline: "Stone Aroma Phoenix Oolong",
    description:
      "A refined Phoenix Mountain dan cong expressing mineral clarity and floral lift. Elegant structure with lingering sweetness and crystalline mouthfeel.",
    flavorProfile: [
      "orchid",
      "raw honey",
      "wet stone",
      "light citrus",
      "cool mineral finish",
    ],
    effect:
      "Bright, alert energy with refined calm.",
    brewing: {
      gongfu: "5–7 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "da-hong-pao": {
    displayName: "Da Hong Pao",
    tagline: "Wuyi Rock Oolong",
    description:
      "Legendary cliff tea with roasted depth and mineral resonance. Rich charcoal notes balanced by cocoa sweetness and lingering floral echoes.",
    flavorProfile: [
      "roasted nuts",
      "charcoal",
      "cocoa",
      "orchid",
      "rock minerality",
    ],
    effect:
      "Grounding yet mentally expansive.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "jin-xuan": {
    displayName: "Milk Oolong (Jin Xuan)",
    tagline: "Naturally Creamy Taiwanese Oolong",
    description:
      "Cultivar-driven creaminess with buttery texture and floral sweetness. Soft, indulgent, and deeply comforting.",
    flavorProfile: [
      "sweet cream",
      "orchid",
      "vanilla",
      "butter",
      "fresh milk",
    ],
    effect:
      "Relaxing and emotionally soothing.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "dian-hong": {
    displayName: "Dian Hong Mao Feng",
    tagline: "Golden Tip Black Tea",
    description:
      "Yunnan black tea packed with golden buds and chocolate sweetness. Smooth yet vibrant with honeyed malt richness.",
    flavorProfile: [
      "cocoa",
      "honey",
      "baked fruit",
      "malt",
      "warm spice",
    ],
    effect:
      "Warming stimulation with smooth energy.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "gongting": {
    displayName: "Lincang Gongting Shu",
    tagline: "Imperial Grade Ripe Pu-erh",
    description:
      "Dense imperial-grade ripe pu-erh featuring velvety body and chocolate-cake sweetness.",
    flavorProfile: [
      "dark chocolate",
      "dates",
      "molasses",
      "cream",
      "sweet earth",
    ],
    effect:
      "Deeply grounding and digestive.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "mao-jian": {
    displayName: "Mao Jian Wild",
    tagline: "Wild Green Tea",
    description:
      "High-mountain wild green tea with piercing freshness and floral lift.",
    flavorProfile: [
      "fresh herbs",
      "white flowers",
      "sweet grass",
      "dew",
      "melon",
    ],
    effect:
      "Clean focus with light body energy.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "lao-shou-mei": {
    displayName: "Lao Shou Mei (2018)",
    tagline: "Aged White Tea",
    description:
      "Soft aged white tea with dried-fruit sweetness and honeyed warmth.",
    flavorProfile: [
      "dried apricot",
      "honey",
      "hay",
      "soft wood",
      "herbal finish",
    ],
    effect:
      "Calming and restorative.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "yue-guang-bai": {
    displayName: "Yue Guang Bai",
    tagline: "White Moonlight Tea",
    description:
      "Elegant white tea with shimmering sweetness and floral nectar aroma.",
    flavorProfile: [
      "white flowers",
      "honey",
      "melon",
      "cream",
      "light citrus",
    ],
    effect:
      "Soft clarity with gentle calm.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "zhengshan": {
    displayName: "Zhengshan Xiaozhong",
    tagline: "Pine-Smoked Black Tea",
    description:
      "Classic lapsang with aromatic pine smoke and underlying sweetness.",
    flavorProfile: [
      "pine resin",
      "smoke",
      "cocoa",
      "dried fruit",
      "sweet wood",
    ],
    effect:
      "Bold warmth and alertness.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "longjing": {
    displayName: "Longjing",
    tagline: "Dragon Well Green Tea",
    description:
      "Pan-fried green tea from Hangzhou expressing chestnut sweetness and silky freshness.",
    flavorProfile: [
      "toasted chestnut",
      "fresh grass",
      "sweet pea",
      "butter",
      "cool mineral finish",
    ],
    effect:
      "Clean concentration with refreshing lift.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

}
