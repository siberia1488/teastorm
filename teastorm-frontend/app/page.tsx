import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: Promise<{
    orderId?: string;
  }>;
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const orderId = params.orderId;

  if (!orderId) notFound();

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: true },
  });

  if (!order) notFound();

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#F7F6F3",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 48,
      }}
    >
      <div style={{ maxWidth: 720, width: "100%" }}>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 500,
            letterSpacing: -1,
            marginBottom: 12,
            color: "#1A1A1A",
          }}
        >
          Thank you for your order
        </h1>

        <p style={{ color: "#6B6B6B", fontSize: 18, marginBottom: 48 }}>
          Your TeaStorm ritual is being prepared.
        </p>

        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 20,
            padding: 32,
            boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
            border: "1px solid #E5E3DD",
            marginBottom: 48,
          }}
        >
          <h3
            style={{
              fontSize: 20,
              marginBottom: 24,
              color: "#1A1A1A",
            }}
          >
            Order summary
          </h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 14,
                color: "#333",
              }}
            >
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>
                ${(item.price * item.quantity / 100).toFixed(2)}
              </span>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid #E5E3DD",
              marginTop: 24,
              paddingTop: 24,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 500,
              color: "#1A1A1A",
            }}
          >
            <span>Total</span>
            <span>
              ${(order.amountTotal / 100).toFixed(2)}
            </span>
          </div>
        </div>

        <p
          style={{
            fontStyle: "italic",
            color: "#8A8A8A",
            marginBottom: 40,
          }}
        >
          Brew slowly. Sip with intention.
        </p>

        <Link
          href="/shop"
          style={{
            display: "inline-block",
            padding: "14px 36px",
            borderRadius: 999,
            background: "#1A1A1A",
            color: "#FFFFFF",
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Continue shopping
        </Link>
      </div>
    </main>
  );
}

