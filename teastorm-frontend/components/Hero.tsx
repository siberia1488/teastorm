/**
 * @file components/Hero.tsx
 * @description Premium hero section for TeaStorm landing page
 */

import Image from "next/image"
import Link from "next/link"

const blurDataURL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAgEDAwUBAAAAAAAAAAAAAQIDAAQRBRIhBhMiMUFR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAZEQACAwEAAAAAAAAAAAAAAAABAgADESH/2gAMAwEAAhEDEQA/AKOm6Lp9xZQzSRMXkjV2O9hyQD8p1UvToQP/2Q=="

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-stone-900 px-6 py-28 sm:min-h-[75vh] sm:px-10 md:min-h-[80vh] lg:min-h-[85vh]"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/teastorm-hero.png"
          alt="Misty Chinese tea terraces at dawn with layered hills and soft morning fog"
          fill
          priority
          quality={75}
          placeholder="blur"
          blurDataURL={blurDataURL}
          sizes="100vw"
          className="object-cover object-center"
          fetchPriority="high"
        />
      </div>

      {/* Cinematic vignette */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(ellipse 75% 65% at 50% 45%,
              rgba(255,255,255,0.16) 0%,
              transparent 55%
            ),
            linear-gradient(to bottom,
              rgba(0,0,0,0.25) 0%,
              transparent 30%,
              transparent 70%,
              rgba(20,20,20,0.45) 100%
            )
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-3xl text-center">
        {/* Eyebrow */}
        <p
          className="mb-6 text-[10px] uppercase tracking-[0.32em] text-white/80 sm:text-xs"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.35)" }}
        >
          Rare Loose-Leaf Collection
        </p>

        {/* Title */}
        <h1
          id="hero-heading"
          className="mb-6 text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{
            letterSpacing: "-0.03em",
            textShadow:
              "0 3px 40px rgba(0,0,0,0.4), 0 10px 80px rgba(0,0,0,0.25)",
          }}
        >
          TeaStorm
        </h1>

        {/* Tagline */}
        <p
          className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg md:text-xl"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,0.4)" }}
        >
          Exceptional loose-leaf teas sourced directly from China&apos;s most
          storied growing regions — curated for ritual, clarity, and quiet power
          in every cup.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-white px-10 py-4 text-xs font-medium uppercase tracking-widest text-stone-900 shadow-xl shadow-black/25 transition hover:bg-stone-100 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:text-sm"
          >
            Shop the Collection
          </Link>

          <Link
            href="#origins"
            className="rounded-full border border-white/50 bg-white/10 px-10 py-4 text-xs font-medium uppercase tracking-widest text-white shadow-lg shadow-black/20 backdrop-blur-sm transition hover:border-white/80 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900 sm:text-sm"
          >
            Explore Origins
          </Link>
        </div>
      </div>
    </section>
  )
}
