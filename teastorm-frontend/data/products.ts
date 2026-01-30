export type ProductVariant = {
  id: string
  label: string
  weightGrams: number
  stripePriceId: string
}

export type Product = {
  id: string
  slug: string
  title: string
  subtitle?: string
  category: "oolong" | "green" | "black" | "white" | "puerh"
  image: string
  variants: ProductVariant[]
}

export const products: Product[] = [
  {
    id: "green-mark-2006",
    slug: "green-mark-2006",
    title: "Zhang Xiang Green Mark",
    subtitle: "Aged Sheng Pu-erh Cake (2006)",
    category: "puerh",
    image: "/images/green-mark.jpg",
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
    image: "/images/bulangshan-peacock.jpg",
    variants: [
      { id: "bulangshan-375", label: "375 g cake", weightGrams: 375, stripePriceId: "price_1SoeRkKopMGyjtmAJCljI00j" }
    ]
  },
  {
    id: "gaba-nantou",
    slug: "gaba-nantou",
    title: "GABA Oolong",
    category: "oolong",
    image: "/images/gaba.jpg",
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
    image: "/images/dragon-pearls.jpg",
    variants: [
      { id: "dp-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeTVKopMGyjtmAuLvHt88Z" },
      { id: "dp-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeUJKopMGyjtmAuYJEZrVy" },
      { id: "dp-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeU7KopMGyjtmAnCzEN6a0" }
    ]
  },
  {
    id: "shi-xiang",
    slug: "shi-xiang",
    title: "Shi Xiang Dan Cong",
    category: "oolong",
    image: "/images/shi-xiang.jpg",
    variants: [
      { id: "sx-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeWPKopMGyjtmAEOJr5b2O" },
      { id: "sx-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeWrKopMGyjtmALDI6aeQu" },
      { id: "sx-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeX8KopMGyjtmAJ0icEbYm" }
    ]
  },
  {
    id: "da-hong-pao",
    slug: "da-hong-pao",
    title: "Da Hong Pao",
    category: "oolong",
    image: "/images/da-hong-pao.jpg",
    variants: [
      { id: "dhp-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeZxKopMGyjtmAbTpyVTgP" },
      { id: "dhp-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeaNKopMGyjtmAftvXkjvb" },
      { id: "dhp-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeaiKopMGyjtmA9Ra2u7Ww" }
    ]
  },
  {
    id: "jin-xuan",
    slug: "jin-xuan",
    title: "Milk Oolong (Jin Xuan)",
    category: "oolong",
    image: "/images/jin-xuan.jpg",
    variants: [
      { id: "jx-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1Soed7KopMGyjtmAXOljHrBH" },
      { id: "jx-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoedNKopMGyjtmAt5dn1XR9" },
      { id: "jx-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoedlKopMGyjtmACDYl1YTz" }
    ]
  },
  {
    id: "dian-hong",
    slug: "dian-hong",
    title: "Dian Hong Mao Feng",
    category: "black",
    image: "/images/dian-hong.jpg",
    variants: [
      { id: "dh-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeftKopMGyjtmA6KXiAJxy" },
      { id: "dh-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoegIKopMGyjtmAhOp4ymVL" },
      { id: "dh-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoegSKopMGyjtmAt6bWkdrF" }
    ]
  },
  {
    id: "gongting",
    slug: "gongting",
    title: "Lincang Gongting Shu",
    category: "puerh",
    image: "/images/gongting.jpg",
    variants: [
      { id: "gt-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1Soek8KopMGyjtmAJ6KbApUF" },
      { id: "gt-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoekVKopMGyjtmAHjV67H0u" },
      { id: "gt-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoekqKopMGyjtmAlvvTb80H" }
    ]
  },
  {
    id: "mao-jian",
    slug: "mao-jian",
    title: "Mao Jian Wild",
    category: "green",
    image: "/images/mao-jian.jpg",
    variants: [
      { id: "mj-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoemOKopMGyjtmAnc72NFEh" },
      { id: "mj-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoemgKopMGyjtmAL1Yfb4VI" },
      { id: "mj-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoemqKopMGyjtmAyVT17cYY" }
    ]
  },
  {
    id: "lao-shou-mei",
    slug: "lao-shou-mei",
    title: "Lao Shou Mei (2018)",
    category: "white",
    image: "/images/lao-shou-mei.jpg",
    variants: [
      { id: "lsm-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeoQKopMGyjtmAIDzePidX" },
      { id: "lsm-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeohKopMGyjtmArta2bTed" },
      { id: "lsm-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeouKopMGyjtmACRLokIY9" }
    ]
  },
  {
    id: "yue-guang-bai",
    slug: "yue-guang-bai",
    title: "Yue Guang Bai",
    category: "white",
    image: "/images/yue-guang-bai.jpg",
    variants: [
      { id: "ygb-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeqQKopMGyjtmAjvIunfy4" },
      { id: "ygb-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeqgKopMGyjtmApw9qioVa" },
      { id: "ygb-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeqtKopMGyjtmAE0W3t8XC" }
    ]
  },
  {
    id: "zhengshan",
    slug: "zhengshan",
    title: "Zhengshan Xiaozhong",
    category: "black",
    image: "/images/zhengshan.jpg",
    variants: [
      { id: "zs-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoesZKopMGyjtmA1lH0hCq7" },
      { id: "zs-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoesnKopMGyjtmAKcApH21F" },
      { id: "zs-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoesxKopMGyjtmAfjITBOKM" }
    ]
  },
  {
    id: "longjing",
    slug: "longjing",
    title: "Longjing",
    category: "green",
    image: "/images/longjing.jpg",
    variants: [
      { id: "lj-50", label: "50 g", weightGrams: 50, stripePriceId: "price_1SoeuQKopMGyjtmAHDkBLvn9" },
      { id: "lj-100", label: "100 g", weightGrams: 100, stripePriceId: "price_1SoeugKopMGyjtmAX57l3e1g" },
      { id: "lj-250", label: "250 g", weightGrams: 250, stripePriceId: "price_1SoeupKopMGyjtmAMYxxNhvg" }
    ]
  }
]
