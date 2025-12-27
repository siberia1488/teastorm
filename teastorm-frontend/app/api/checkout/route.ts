import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CartItem = {
  variantId: string;
  title: string;
  priceUsd: number;
  quantity: number;
};

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: CartItem[] };

  const orderId = crypto.randomUUID();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",

    // ✅ Email + billing
    customer_creation: "always",
    billing_address_collection: "required",

    // ✅ Shipping address
    shipping_address_collection: {
      allowed_countries: ["US", "CA"],
    },

    // 🛒 Items
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.priceUsd * 100),
        product_data: {
          name: item.title,
        },
      },
    })),

    // 🚚 Shipping
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 550,
            currency: "usd",
          },
          display_name: "USPS Ground",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
    ],

    // 🧾 Metadata
    metadata: {
      orderId,
      items: JSON.stringify(
        items.map((i) => ({
          id: i.variantId,
          qty: i.quantity,
          price: i.priceUsd,
        }))
      ),
    },

    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?orderId=${orderId}`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cart`,
  });

  return NextResponse.json({ url: session.url });
}
