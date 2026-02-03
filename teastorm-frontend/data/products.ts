export type ProductVariant = {
  id: string
  label: string
  weightGrams: number
  stripePriceId: string
}

export type ProductImages = {
  preview: string
  gallery: string[]
}

export type Product = {
  id: string
  slug: string
  title: string
  subtitle?: string
  category: "oolong" | "green" | "black" | "white" | "puerh"
  images: ProductImages
  variants: ProductVariant[]
}

export const products: Product[] = [
  {
    id: "green-mark-2006",
    slug: "green-mark-2006",
    title: "Zhang Xiang Green Mark",
    subtitle: "Aged Sheng Pu-erh Cake (2006)",
    category: "puerh",
    images: {
      preview: "/tea/green-mark-2006/preview.PNG",
      gallery: [
        "/tea/green-mark-2006/2.PNG",
      ],
    },
    variants: [
      { id: "green-mark-375", label: "375 g cake", weightGrams: 375, stripePriceId: "price_1SoeN1KopMGyjtmADIaXgMVX" }
    ]
  },

  {
    id: "bulangshan-peacock",
    slug: "bulangshan-peacock",
    title: "Bulangshan Peacock",
    subtitle: "Sheng Pu-erh Cake",
    category: "puerh",
    images: {
      preview: "/tea/bulangshan-peacock/preview.PNG",
      gallery: [
        "/tea/bulangshan-peacock/2.jpg",
      ],
    },
    variants: [
      { id: "bulangshan-375", label: "375 g cake", weightGrams: 375, stripePriceId: "price_1SoeRkKopMGyjtmAJCljI00j" }
    ]
  },

  {
    id: "gaba-nantou",
    slug: "gaba-nantou",
    title: "GABA Oolong",
    category: "oolong",
    images: {
      preview: "/tea/gaba-nantou/preview.PNG",
      gallery: [
        "/tea/gaba-nantou/2.PNG",
        "/tea/gaba-nantou/3.PNG",
        "/tea/gaba-nantou/4.PNG",
      ],
    },
    variants: [
      { id: "gaba-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeCsKopMGyjtmA5kgMogWP" },
      { id: "gaba-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeFmKopMGyjtmADJHWLERq" },
      { id: "gaba-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeFPKopMGyjtmAtXFuhwVJ" }
    ]
  },

  {
    id: "dragon-pearls",
    slug: "dragon-pearls",
    title: "Dragon Pearls",
    subtitle: "Shu Pu-erh (2012)",
    category: "puerh",
    images: {
      preview: "/tea/dragon-pearls/preview.PNG",
      gallery: [],
    },
    variants: [
      { id: "dragon-pearls-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeUJKopMGyjtmAuYJEZrVy" },
      { id: "dragon-pearls-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeU7KopMGyjtmAnCzEN6a0" },
      { id: "dragon-pearls-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeTVKopMGyjtmAuLvHt88Z" },
    ]
  },

  {
    id: "shi-xiang",
    slug: "shi-xiang",
    title: "Shi Xiang Dan Cong",
    category: "oolong",
    images: {
      preview: "/tea/shi-xiang/preview.png",
      gallery: [
        "/tea/shi-xiang/3.PNG",
      ],
    },
    variants: [
      { id: "shi-xiang-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeWPKopMGyjtmAEOJr5b2O" },
      { id: "shi-xiang-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeWrKopMGyjtmALDI6aeQu" },
      { id: "shi-xiang-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeX8KopMGyjtmAJ0icEbYm" },
    ]
  },

  {
    id: "da-hong-pao",
    slug: "da-hong-pao",
    title: "Da Hong Pao",
    category: "oolong",
    images: {
      preview: "/tea/da-hong-pao/preview.png",
      gallery: [
        "/tea/da-hong-pao/2.png",
        "/tea/da-hong-pao/3.PNG",
        "/tea/da-hong-pao/4.png",
      ],
    },
    variants: [
      { id: "da-hong-pao-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeZxKopMGyjtmAbTpyVTgP" },
      { id: "da-hong-pao-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeaNKopMGyjtmAftvXkjvb" },
      { id: "da-hong-pao-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeaiKopMGyjtmA9Ra2u7Ww" },
    ]
  },

  {
    id: "jin-xuan",
    slug: "jin-xuan",
    title: "Milk Oolong (Jin Xuan)",
    category: "oolong",
    images: {
      preview: "/tea/jin-xuan/preview.PNG",
      gallery: [
        "/tea/jin-xuan/2.PNG",
      ],
    },
    variants: [
      { id: "jin-xuan-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1Soed7KopMGyjtmAXOljHrBH" },
      { id: "jin-xuan-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoedNKopMGyjtmAt5dn1XR9" },
      { id: "jin-xuan-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoedlKopMGyjtmACDYl1YTz" },
    ]
  },

  {
    id: "dian-hong",
    slug: "dian-hong",
    title: "Dian Hong Mao Feng",
    category: "black",
    images: {
      preview: "/tea/dian-hong/preview.PNG",
      gallery: [
        "/tea/dian-hong/3.PNG",
      ],
    },
    variants: [
      { id: "dian-hong-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeftKopMGyjtmA6KXiAJxy" },
      { id: "dian-hong-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoegIKopMGyjtmAhOp4ymVL" },
      { id: "dian-hong-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoegSKopMGyjtmAt6bWkdrF" },
    ]
  },

  {
    id: "gongting",
    slug: "gongting",
    title: "Lincang Gongting Shu",
    category: "puerh",
    images: {
      preview: "/tea/gongting/preview.png",
      gallery: [
        "/tea/gongting/3.PNG",
      ],
    },
    variants: [
      { id: "gongting-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1Soek8KopMGyjtmAJ6KbApUF" },
      { id: "gongting-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoekVKopMGyjtmAHjV67H0u" },
      { id: "gongting-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoekqKopMGyjtmAlvvTb80H" },
    ]
  },

  {
    id: "mao-jian",
    slug: "mao-jian",
    title: "Mao Jian Wild",
    category: "green",
    images: {
      preview: "/tea/mao-jian/preview.PNG",
      gallery: [
        "/tea/mao-jian/2.png",
        "/tea/mao-jian/3.PNG",
        "/tea/mao-jian/4.png",
      ],
    },
    variants: [
      { id: "mao-jian-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoemOKopMGyjtmAnc72NFEh" },
      { id: "mao-jian-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoemgKopMGyjtmAL1Yfb4VI" },
      { id: "mao-jian-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoemqKopMGyjtmAyVT17cYY" },
    ]
  },

  {
    id: "lao-shou-mei",
    slug: "lao-shou-mei",
    title: "Lao Shou Mei (2018)",
    category: "white",
    images: {
      preview: "/tea/lao-shou-mei/preview.PNG",
      gallery: [
        "/tea/lao-shou-mei/2.PNG",
      ],
    },
    variants: [
      { id: "lao-shou-mei-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeoQKopMGyjtmAIDzePidX" },
      { id: "lao-shou-mei-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeohKopMGyjtmArta2bTed" },
      { id: "lao-shou-mei-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeouKopMGyjtmACRLokIY9" },
    ]
  },

  {
    id: "yue-guang-bai",
    slug: "yue-guang-bai",
    title: "Yue Guang Bai",
    category: "white",
    images: {
      preview: "/tea/yue-guang-bai/preview.PNG",
      gallery: [
        "/tea/yue-guang-bai/2.PNG",
      ],
    },
    variants: [
      { id: "yue-guang-bai-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeqQKopMGyjtmAjvIunfy4" },
      { id: "yue-guang-bai-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeqgKopMGyjtmApw9qioVa" },
      { id: "yue-guang-bai-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeqtKopMGyjtmAE0W3t8XC" },
    ]
  },

  {
    id: "zhengshan",
    slug: "zhengshan",
    title: "Zhengshan Xiaozhong",
    category: "black",
    images: {
      preview: "/tea/zhengshan/preview.PNG",
      gallery: [
        "/tea/zhengshan/2.PNG",
        "/tea/zhengshan/3.PNG",
      ],
    },
    variants: [
      { id: "zhengshan-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoesZKopMGyjtmA1lH0hCq7" },
      { id: "zhengshan-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoesnKopMGyjtmAKcApH21F" },
      { id: "zhengshan-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoesxKopMGyjtmAfjITBOKM" },
    ]
  },

  {
    id: "longjing",
    slug: "longjing",
    title: "Longjing",
    category: "green",
    images: {
      preview: "/tea/longjing/preview.PNG",
      gallery: [
        "/tea/longjing/2.PNG",
        "/tea/longjing/3.PNG",
      ],
    },
    variants: [
      { id: "longjing-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeuQKopMGyjtmAHDkBLvn9" },
      { id: "longjing-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeugKopMGyjtmAX57l3e1g" },
      { id: "longjing-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeupKopMGyjtmAMYxxNhvg" },
    ]
  },
]
