import { products } from "@/data/products"
import { teaContent } from "@/data/teaContent"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import ProductClient from "@/components/cart/product/ProductClient"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const product = products.find((p) => p.slug === id)
  if (!product) return {}

  const content = teaContent[product.slug]
  if (!content) return {}

  const title = `${content.displayName} — Premium Chinese Tea | TeaStorm`
  const description = content.description

  const url = `https://teastorm.com/product/${product.slug}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "TeaStorm",
      images: [
        {
          url: product.image,
          width: 1200,
          height: 630,
          alt: content.displayName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.image],
    },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const product = products.find((p) => p.slug === id)
  if (!product) notFound()

  const content = teaContent[product.slug]
  if (!content) notFound()

  return (
    <>
      {/* STRUCTURED DATA */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: content.displayName,
            description: content.description,
            image: [`https://teastorm.com${product.image}`],
            brand: {
              "@type": "Brand",
              name: "TeaStorm",
            },
            category: product.category,
            offers: {
              "@type": "Offer",
              url: `https://teastorm.com/product/${product.slug}`,
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          }),
        }}
      />

      <ProductClient product={product} content={content} />
    </>
  )
}
