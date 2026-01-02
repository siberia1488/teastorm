import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendOrderPaidEmail } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return new NextResponse("Invalid signature", { status: 400 });
  }

  // prevent duplicate processing
  const existing = await prisma.order.findFirst({
    where: { stripeEventId: event.id },
  });

  if (existing) {
    return NextResponse.json({ received: true });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (!orderId) {
      return new NextResponse("Missing orderId", { status: 400 });
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "paid",
        stripeEventId: event.id,
        stripeSessionId: session.id,
        paymentIntentId: session.payment_intent as string,
        email: session.customer_details?.email ?? null,
      },
      include: { items: true },
    });

    if (order.email) {
      await sendOrderPaidEmail({
        to: order.email,
        orderId: order.id,
        items: order.items.map((i) => ({
          title: i.title,
          quantity: i.quantity,
          price: i.price,
        })),
        total: order.amountTotal,
      });
    }
  }

  return NextResponse.json({ received: true });
}
