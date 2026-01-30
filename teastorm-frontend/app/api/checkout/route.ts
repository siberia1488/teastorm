console.log("STRIPE KEY PREFIX:", process.env.STRIPE_SECRET_KEY?.slice(0, 12))

import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

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
    const { items } = (await req.json()) as { items: CartItem[] }

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
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
          shipping_rate: process.env.STRIPE_SHIPPING_RATE_ID!,
        },
      ],

      line_items: items.map(item => ({
        price: item.stripePriceId,
        quantity: item.quantity,
      })),

      metadata: {
        orderId: order.id,
      },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${order.id}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/shop`,
    })

    return NextResponse.json({ url: stripeSession.url })
  } catch (error) {
    console.error("Checkout error:", error)
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
