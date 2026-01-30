export type TeaContent = {
  displayName: string
  tagline: string
  description: string
  flavorProfile?: string[]
  liquor?: string
  effect?: string
  brewing?: {
    gongfu?: string
    western?: string
  }
}

export const teaContent: Record<string, TeaContent> = {
  "shi-xiang": {
    displayName: "Shi Xiang Dan Cong (Phoenix Oolong)",
    tagline: "Stone Aroma — Whole Leaf Phoenix Oolong",
    description:
      "Shi Xiang Dan Cong is a refined Phoenix Mountain oolong known for its clean mineral structure and elegant natural aroma.",
    flavorProfile: [
      "gentle natural sweetness",
      "floral and honey notes",
      "light mineral character",
      "clean, smooth body",
      "long refreshing finish",
    ],
    liquor:
      "Clear light amber liquor with a delicate floral-mineral aroma.",
    effect:
      "Clean focused energy with calm alertness.",
    brewing: {
      gongfu:
        "5–7 g per 100 ml, 95–98°C. 10–15+ infusions.",
      western:
        "2–3 g per 250 ml, 90–95°C. Steep 2–3 minutes.",
    },
  },

  "gaba-nantou": {
    displayName: "GABA Oolong",
    tagline: "Calming Taiwanese Oolong",
    description:
      "Anaerobically oxidized Taiwanese oolong with soothing sweetness.",
    flavorProfile: ["baked fruit", "honey", "warm spice"],
    liquor: "Warm amber liquor.",
    effect: "Deeply calming.",
    brewing: {
      gongfu: "5–6 g / 100 ml, 95°C.",
      western: "3 g / 250 ml, 3 min.",
    },
  },

  "da-hong-pao": {
    displayName: "Da Hong Pao",
    tagline: "Wuyi Rock Oolong",
    description:
      "Legendary roasted cliff tea from the Wuyi Mountains.",
    flavorProfile: ["roasted nuts", "cocoa", "minerality"],
    liquor: "Deep amber.",
    effect: "Grounding.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "dragon-pearls": {
    displayName: "Dragon Pearls Shu Pu-erh",
    tagline: "Hand-Rolled Ripe Pu-erh",
    description:
      "Velvety shu pu-erh pearls with deep sweetness.",
    flavorProfile: ["earthy", "dark cocoa", "cream"],
    liquor: "Dark ruby.",
    effect: "Comforting.",
    brewing: {
      gongfu: "2 pearls / 120 ml.",
      western: "3 pearls / 300 ml.",
    },
  },

  "green-mark-2006": {
    displayName: "Zhang Xiang Green Mark (2006)",
    tagline: "Aged Sheng Pu-erh Cake",
    description:
      "Legendary aged sheng with camphor and forest depth.",
    flavorProfile: ["camphor", "aged wood", "sweet earth"],
    liquor: "Golden amber.",
    effect: "Meditative clarity.",
    brewing: {
      gongfu: "5–6 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "bulangshan-peacock": {
    displayName: "Bulangshan Peacock",
    tagline: "Wild Mountain Sheng Pu-erh",
    description:
      "Powerful young sheng with herbal bitterness.",
    flavorProfile: ["wild herbs", "minerality", "sweet aftertaste"],
    liquor: "Bright gold.",
    effect: "Highly energizing.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "dian-hong": {
    displayName: "Dian Hong Mao Feng",
    tagline: "Golden Tip Black Tea",
    description:
      "Cocoa-sweet Yunnan black tea.",
    flavorProfile: ["honey", "cocoa", "baked fruit"],
    liquor: "Deep amber.",
    effect: "Warming.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "gongting": {
    displayName: "Lincang Gongting Shu",
    tagline: "Imperial Grade Ripe Pu-erh",
    description:
      "Dense and chocolate-rich ripe pu-erh.",
    flavorProfile: ["dark chocolate", "dates"],
    liquor: "Dark red.",
    effect: "Grounding.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "mao-jian": {
    displayName: "Mao Jian Wild",
    tagline: "Wild Green Tea",
    description:
      "Bright green tea with floral lift.",
    flavorProfile: ["fresh herbs", "flowers"],
    liquor: "Pale green.",
    effect: "Uplifting.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "lao-shou-mei": {
    displayName: "Lao Shou Mei (2018)",
    tagline: "Aged White Tea",
    description:
      "Aged white tea with dried-fruit sweetness.",
    flavorProfile: ["dried fruit", "soft wood"],
    liquor: "Warm gold.",
    effect: "Calming.",
    brewing: {
      gongfu: "6 g / 100 ml.",
      western: "4 g / 300 ml.",
    },
  },

  "yue-guang-bai": {
    displayName: "Yue Guang Bai",
    tagline: "White Moonlight Tea",
    description:
      "Elegant white tea with floral honey notes.",
    flavorProfile: ["white flowers", "honey"],
    liquor: "Pale gold.",
    effect: "Soft calming.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "zhengshan": {
    displayName: "Zhengshan Xiaozhong",
    tagline: "Lapsang Souchong",
    description:
      "Classic pine-smoked black tea.",
    flavorProfile: ["smoke", "pine", "cocoa"],
    liquor: "Dark amber.",
    effect: "Bold.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },

  "longjing": {
    displayName: "Longjing",
    tagline: "Dragon Well Green Tea",
    description:
      "Pan-fried green tea with chestnut sweetness.",
    flavorProfile: ["chestnut", "fresh grass"],
    liquor: "Light green.",
    effect: "Clean focus.",
    brewing: {
      gongfu: "5 g / 100 ml.",
      western: "3 g / 250 ml.",
    },
  },
}
