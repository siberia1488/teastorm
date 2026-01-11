import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: {
    orderId?: string;
  };
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const orderId = searchParams.orderId;

  if (!orderId) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  if (order.status !== "paid") {
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        <h1>Payment processing</h1>
        <p>Your payment is being confirmed. Please refresh this page in a moment.</p>
      </main>
    );
  }

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 40 }}>
      <h1>Thank you for your order</h1>

      <p>
        Order <strong>{order.id}</strong> has been successfully paid.
      </p>

      <ul style={{ marginTop: 24 }}>
        {order.items.map((item) => (
          <li key={item.id} style={{ marginBottom: 8 }}>
            {item.title} × {item.quantity}
          </li>
        ))}
      </ul>

      <p style={{ marginTop: 32 }}>
        We will send you a confirmation email with tracking information once your order ships.
      </p>
    </main>
  );
}
