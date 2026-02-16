import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// Validate required env vars at module load
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY
const STRIPE_SHIPPING_RATE_ID = process.env.STRIPE_SHIPPING_RATE_ID
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

console.log("[checkout] NODE_ENV:", process.env.NODE_ENV)

if (!STRIPE_SECRET_KEY) {
  console.error("[checkout] Missing STRIPE_SECRET_KEY environment variable")
} else {
  console.log("[checkout] Stripe key prefix:", STRIPE_SECRET_KEY.slice(0, 8))
}
if (!STRIPE_SHIPPING_RATE_ID) {
  console.error("[checkout] Missing STRIPE_SHIPPING_RATE_ID environment variable")
} else {
  console.log("[checkout] Shipping rate:", STRIPE_SHIPPING_RATE_ID)
}
if (!BASE_URL) {
  console.error("[checkout] Missing NEXT_PUBLIC_BASE_URL environment variable")
}

const stripe = STRIPE_SECRET_KEY ? new Stripe(STRIPE_SECRET_KEY) : null

type CartItem = {
  variantId: string
  productId: string
  stripePriceId: string
  title: string
  variantLabel: string
  price: number
  quantity: number
}

export async function POST(req: Request) {
  try {
    // Validate env configuration
    if (!stripe || !STRIPE_SECRET_KEY) {
      console.error("[checkout] Stripe not initialized: missing STRIPE_SECRET_KEY")
      return NextResponse.json(
        { error: "Payment system not configured. Missing STRIPE_SECRET_KEY." },
        { status: 503 }
      )
    }

    if (!STRIPE_SHIPPING_RATE_ID) {
      console.error("[checkout] Missing STRIPE_SHIPPING_RATE_ID")
      return NextResponse.json(
        { error: "Shipping not configured. Missing STRIPE_SHIPPING_RATE_ID." },
        { status: 503 }
      )
    }

    if (!BASE_URL) {
      console.error("[checkout] Missing NEXT_PUBLIC_BASE_URL")
      return NextResponse.json(
        { error: "Application not configured. Missing NEXT_PUBLIC_BASE_URL." },
        { status: 503 }
      )
    }

    // Parse request body
    let body: { items?: CartItem[] }
    try {
      body = await req.json()
    } catch (parseError) {
      console.error("[checkout] Failed to parse request body:", parseError)
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const { items } = body
    console.log("[checkout] Received request with", items?.length ?? 0, "items")

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // Validate that all items have stripePriceId
    const missingPriceId = items.find(item => !item.stripePriceId)
    if (missingPriceId) {
      console.error("[checkout] Item missing stripePriceId:", missingPriceId.title)
      return NextResponse.json(
        { error: `Item "${missingPriceId.title}" is missing a price ID` },
        { status: 400 }
      )
    }

    const session = await getServerSession(authOptions)

    let userId: string | null = null
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true },
      })
      if (user) userId = user.id
    }

    const subtotalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )

    const order = await prisma.order.create({
      data: {
        status: "pending",
        subtotalAmount,
        shippingAmount: 0,
        amountTotal: subtotalAmount,
        currency: "usd",
        userId,
        items: {
          create: items.map(item => ({
            title: `${item.title} – ${item.variantLabel}`,
            variantId: item.variantId,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    })

    console.log("[checkout] Order created:", order.id)

    // Diagnostic: log which Stripe account this key belongs to
    try {
      const account = await stripe.accounts.retrieve()
      console.log("[checkout] STRIPE ACCOUNT ID:", account.id)
    } catch (accErr) {
      console.error("[checkout] STRIPE ACCOUNT RETRIEVE ERROR:", accErr)
    }

    // Pre-flight: verify shipping rate exists in this Stripe account/mode
    try {
      const sr = await stripe.shippingRates.retrieve(STRIPE_SHIPPING_RATE_ID)
      console.log("[checkout] Shipping rate verified:", sr.id, sr.active ? "(active)" : "(INACTIVE)")
      if (!sr.active) {
        return NextResponse.json(
          { error: `Shipping rate ${sr.id} exists but is inactive` },
          { status: 422 }
        )
      }
    } catch (srErr) {
      const msg = srErr instanceof Stripe.errors.StripeError ? srErr.message : String(srErr)
      console.error("[checkout] Shipping rate verification failed:", msg)
      return NextResponse.json(
        { error: `Shipping rate not found in current Stripe account: ${msg}` },
        { status: 422 }
      )
    }

    // Pre-flight: verify all price IDs exist in this Stripe account/mode
    for (const item of items) {
      try {
        const price = await stripe.prices.retrieve(item.stripePriceId)
        console.log("[checkout] Price verified:", price.id, price.active ? "(active)" : "(INACTIVE)")
        if (!price.active) {
          return NextResponse.json(
            { error: `Price ${price.id} for "${item.title}" exists but is inactive` },
            { status: 422 }
          )
        }
      } catch (prErr) {
        const msg = prErr instanceof Stripe.errors.StripeError ? prErr.message : String(prErr)
        console.error("[checkout] Price verification failed for", item.stripePriceId, ":", msg)
        return NextResponse.json(
          { error: `Price "${item.stripePriceId}" for "${item.title}" not found in current Stripe account: ${msg}` },
          { status: 422 }
        )
      }
    }

    console.log("[checkout] All pre-flight checks passed, creating session")

    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",

      customer_creation: "always",

      billing_address_collection: "required",
      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      automatic_tax: { enabled: true },

      shipping_options: [
        {
          shipping_rate: STRIPE_SHIPPING_RATE_ID,
        },
      ],

      line_items: items.map(item => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),

      metadata: {
        orderId: order.id,
      },

      success_url: `${BASE_URL}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/shop`,
    })

    console.log("[checkout] Stripe session created:", stripeSession.id)

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    const message =
      error instanceof Stripe.errors.StripeError
        ? error.message
        : error instanceof Error
          ? error.message
          : "Unknown error"

    console.error("[checkout] Unhandled error:", message, error)

    return NextResponse.json(
      { error: `Checkout failed: ${message}` },
      { status: 500 }
    )
  }
}
