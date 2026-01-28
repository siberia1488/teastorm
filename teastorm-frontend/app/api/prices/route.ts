import { NextResponse } from "next/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
apiVersion: "2025-12-15.clover",
})

export async function POST(req: Request) {
  try {
    const { priceIds } = await req.json()

    if (!Array.isArray(priceIds)) {
      return NextResponse.json({}, { status: 400 })
    }

    const prices = await Promise.all(
      priceIds.map((id) => stripe.prices.retrieve(id))
    )

    const map: Record<string, number> = {}

    for (const p of prices) {
      if (typeof p.unit_amount === "number") {
        map[p.id] = p.unit_amount
      }
    }

    return NextResponse.json(map)
  } catch (e) {
    console.error("Stripe price fetch failed:", e)
    return NextResponse.json({}, { status: 500 })
  }
}
