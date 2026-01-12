import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import {
  sendOrderPaidEmail,
  sendAdminOrderPaidEmail,
} from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type StripeSessionWithShipping = Stripe.Checkout.Session & {
  shipping_details?: {
    name?: string | null;
    address?: {
      line1?: string | null;
      line2?: string | null;
      city?: string | null;
      state?: string | null;
      postal_code?: string | null;
      country?: string | null;
    } | null;
  } | null;
};

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

  const alreadyProcessed = await prisma.order.findFirst({
    where: { stripeEventId: event.id },
  });

  if (alreadyProcessed) {
    return NextResponse.json({ received: true });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as StripeSessionWithShipping;
  const orderId = session.metadata?.orderId;

  if (!orderId) {
    return new NextResponse("Missing orderId", { status: 400 });
  }

  const shipping = session.shipping_details;

  const order = await prisma.order.update({
    where: { id: orderId },
    data: {
      status: "paid",
      stripeEventId: event.id,
      stripeSessionId: session.id,
      paymentIntentId: session.payment_intent as string,
      email: session.customer_details?.email ?? null,
      shippingName: shipping?.name ?? null,
      shippingAddress: shipping?.address
        ? {
            line1: shipping.address.line1,
            line2: shipping.address.line2,
            city: shipping.address.city,
            state: shipping.address.state,
            postal_code: shipping.address.postal_code,
            country: shipping.address.country,
          }
        : undefined,
    },
  });

  const items = await prisma.orderItem.findMany({
    where: { orderId: order.id },
  });

  if (order.email) {
    await sendOrderPaidEmail({
      to: order.email,
      orderId: order.id,
      items: items.map((i) => ({
        title: i.title,
        quantity: i.quantity,
        price: i.price,
      })),
      total: order.amountTotal,
    });
  }

  await sendAdminOrderPaidEmail({
    orderId: order.id,
    email: order.email,
    items: items.map((i) => ({
      title: i.title,
      quantity: i.quantity,
      price: i.price,
    })),
    total: order.amountTotal,
  });

  return NextResponse.json({ received: true });
}
