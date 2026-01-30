export const teaContent: Record<
  string,
  {
    displayName: string
    tagline: string
    description: string
    flavorProfile: string[]
    liquor: string
    effect: string
    brewing: {
      gongfu: string
      western: string
    }
  }
> = {
  "shi-xiang": {
    displayName: "Shi Xiang Dan Cong (Phoenix Oolong)",
    tagline: "Stone Aroma — Whole Leaf Phoenix Oolong",
    description:
      "Shi Xiang Dan Cong is a refined Phoenix Mountain oolong known for its clean mineral structure and elegant natural aroma. The name Shi Xiang means 'Stone Aroma', reflecting its fresh rocky character and crystalline clarity in the cup.",
    flavorProfile: [
      "gentle natural sweetness",
      "floral and honey notes",
      "light mineral character",
      "clean, smooth body",
      "long refreshing finish",
    ],
    liquor:
      "Clear light amber liquor with a delicate, evolving floral-mineral aroma.",
    effect:
      "Clean focused energy with calm alertness. Ideal for morning and daytime sessions.",
    brewing: {
      gongfu:
        "5–7 g per 100 ml, 95–98°C. Quick rinse, then 5–8s infusions, gradually increasing. 10–15+ infusions.",
      western:
        "2–3 g per 250 ml, 90–95°C. Steep 2–3 minutes. Re-steep 2–3 times.",
    },
  },

  "gaba-nantou": {
    displayName: "GABA Oolong",
    tagline: "Calming Taiwanese Oolong",
    description:
      "GABA Oolong is produced through anaerobic fermentation, naturally increasing gamma-aminobutyric acid, giving the tea its relaxing and comforting character.",
    flavorProfile: [
      "baked fruit",
      "honey",
      "warm spice",
      "soft sweetness",
    ],
    liquor:
      "Warm amber liquor with a soft, soothing aroma of fruit and honey.",
    effect:
      "Deeply calming with gentle mental clarity. Perfect for evening or stress relief.",
    brewing: {
      gongfu:
        "5–6 g per 100 ml, 95°C. Rinse, then 8–12s infusions.",
      western:
        "3 g per 250 ml, 90–95°C. Steep 3 minutes.",
    },
  },

  "da-hong-pao": {
    displayName: "Da Hong Pao",
    tagline: "Wuyi Rock Oolong",
    description:
      "A legendary Wuyi Mountain oolong known for its deep roasted aroma and mineral backbone.",
    flavorProfile: [
      "roasted nuts",
      "cocoa",
      "mineral",
      "long warming finish",
    ],
    liquor:
      "Deep amber with rich roasted fragrance.",
    effect:
      "Grounding and balancing with steady energy.",
    brewing: {
      gongfu:
        "6 g per 100 ml, boiling water. Short infusions.",
      western:
        "3 g per 250 ml, 95°C. Steep 2–3 minutes.",
    },
  },

  "dragon-pearls": {
    displayName: "Dragon Pearls Shu Pu-erh",
    tagline: "Aged Ripe Pu-erh Pearls",
    description:
      "Hand-rolled shu pu-erh pearls offering deep earthy sweetness and creamy body.",
    flavorProfile: [
      "earthy",
      "dark cocoa",
      "cream",
      "smooth sweetness",
    ],
    liquor:
      "Dark ruby liquor with velvety mouthfeel.",
    effect:
      "Comforting and grounding. Great after meals.",
    brewing: {
      gongfu:
        "1–2 pearls per 120 ml, boiling water.",
      western:
        "3 pearls per 300 ml, boiling water, 3–4 min.",
    },
  },

  "green-mark-2006": {
    displayName: "Zhang Xiang Green Mark (2006)",
    tagline: "Aged Sheng Pu-erh Cake",
    description:
      "A legendary aged sheng pu-erh with camphor, wood, and evolving sweetness.",
    flavorProfile: [
      "camphor",
      "aged wood",
      "sweet earth",
      "cooling finish",
    ],
    liquor:
      "Golden amber with layered aged aroma.",
    effect:
      "Deep clarity and meditative focus.",
    brewing: {
      gongfu:
        "5–6 g per 100 ml, boiling water.",
      western:
        "4 g per 300 ml, boiling water, 3–4 min.",
    },
  },

  "bulangshan-peacock": {
    displayName: "Bulangshan Peacock",
    tagline: "Wild Mountain Sheng Pu-erh",
    description:
      "Powerful young sheng pu-erh with bold bitterness, wild herbs, and mineral depth.",
    flavorProfile: [
      "wild herbs",
      "bitterness",
      "minerality",
      "long sweet aftertaste",
    ],
    liquor:
      "Bright golden liquor with strong aroma.",
    effect:
      "Highly energizing and stimulating.",
    brewing: {
      gongfu:
        "5 g per 100 ml, boiling water.",
      western:
        "4 g per 300 ml, boiling water, 3 min.",
    },
  },

  "dian-hong": {
    displayName: "Dian Hong Mao Feng",
    tagline: "Yunnan Black Tea",
    description:
      "Golden-tipped black tea with natural sweetness and cocoa depth.",
    flavorProfile: ["honey", "cocoa", "baked fruit"],
    liquor: "Deep amber with sweet aroma.",
    effect: "Warm, energizing, comforting.",
    brewing: {
      gongfu: "5 g per 100 ml, 90–95°C.",
      western: "3 g per 250 ml, 3 minutes.",
    },
  },

  "gongting": {
    displayName: "Lincang Gongting Shu",
    tagline: "Imperial Grade Ripe Pu-erh",
    description:
      "Dense, smooth ripe pu-erh with dark chocolate sweetness.",
    flavorProfile: ["dark chocolate", "dates", "sweet earth"],
    liquor: "Dark red, thick and glossy.",
    effect: "Grounding and deeply warming.",
    brewing: {
      gongfu: "6 g per 100 ml, boiling water.",
      western: "4 g per 300 ml, 3–4 min.",
    },
  },

  "mao-jian": {
    displayName: "Mao Jian Wild Green Tea",
    tagline: "Wild Chinese Green Tea",
    description:
      "Fresh wild green tea with floral aroma and vibrant energy.",
    flavorProfile: ["fresh herbs", "flowers", "light fruit"],
    liquor: "Pale green with fresh aroma.",
    effect: "Bright and uplifting.",
    brewing: {
      gongfu: "5 g per 100 ml, 80°C.",
      western: "3 g per 250 ml, 2–3 min.",
    },
  },

  "lao-shou-mei": {
    displayName: "Lao Shou Mei",
    tagline: "Aged White Tea",
    description:
      "Aged white tea with dried fruit sweetness and woody warmth.",
    flavorProfile: ["dried fruit", "dates", "soft wood"],
    liquor: "Warm golden.",
    effect: "Calming and nourishing.",
    brewing: {
      gongfu: "6 g per 100 ml, 90–95°C.",
      western: "4 g per 300 ml, 3 min.",
    },
  },

  "yue-guang-bai": {
    displayName: "Yue Guang Bai",
    tagline: "White Moonlight Tea",
    description:
      "Elegant white tea with floral sweetness and gentle body.",
    flavorProfile: ["white flowers", "honey"],
    liquor: "Clear pale gold.",
    effect: "Soft calming energy.",
    brewing: {
      gongfu: "5 g per 100 ml, 85–90°C.",
      western: "3 g per 250 ml, 2–3 min.",
    },
  },

  "zhengshan": {
    displayName: "Zhengshan Xiaozhong",
    tagline: "Lapsang Souchong",
    description:
      "Traditional smoked black tea from Wuyi Mountains.",
    flavorProfile: ["smoke", "pine", "dark cocoa"],
    liquor: "Dark amber.",
    effect: "Bold and warming.",
    brewing: {
      gongfu: "5 g per 100 ml, 95°C.",
      western: "3 g per 250 ml, 3 min.",
    },
  },

  "longjing": {
    displayName: "Longjing",
    tagline: "Dragon Well Green Tea",
    description:
      "Famous pan-fired green tea with nutty sweetness and clarity.",
    flavorProfile: ["chestnut", "fresh grass", "sweet finish"],
    liquor: "Light green.",
    effect: "Clean and focusing.",
    brewing: {
      gongfu: "5 g per 100 ml, 75–80°C.",
      western: "3 g per 250 ml, 2 min.",
    },
  },

  "jin-xuan": {
    displayName: "Milk Oolong (Jin Xuan)",
    tagline: "Naturally Creamy Taiwanese Oolong",
    description:
      "Jin Xuan is a famous Taiwanese cultivar known for its naturally milky texture and soft floral sweetness, even without flavoring. Smooth, comforting, and deeply aromatic.",
    flavorProfile: [
      "natural creaminess",
      "orchid florals",
      "butter",
      "sweet finish",
    ],
    liquor: "Pale golden with silky body.",
    effect: "Relaxing yet gently uplifting.",
    brewing: {
      gongfu: "5–6 g per 100 ml, 90–95°C.",
      western: "3 g per 250 ml, 3 min.",
    },
  },
}
