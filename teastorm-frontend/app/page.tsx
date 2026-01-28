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
        background:
          "radial-gradient(1200px 600px at 50% -200px, #FFFFFF 0%, #F7F6F3 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 64,
      }}
    >
      <div style={{ maxWidth: 760, width: "100%", textAlign: "center" }}>
        {/* Headline */}
        <h1
          style={{
            fontSize: 56,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            marginBottom: 16,
            color: "#1A1A1A",
          }}
        >
          Your TeaStorm Ritual Begins
        </h1>

        <p
          style={{
            color: "#6F6F6F",
            fontSize: 18,
            marginBottom: 56,
            maxWidth: 520,
            marginInline: "auto",
            lineHeight: 1.6,
          }}
        >
          Thank you for your order. Each leaf is now being prepared, packed, and
          sent with care — from origin to cup.
        </p>

        {/* Order Card */}
        <div
          style={{
            background: "#FFFFFF",
            borderRadius: 28,
            padding: 40,
            boxShadow: "0 20px 60px rgba(0,0,0,0.06)",
            border: "1px solid #E6E4DE",
            marginBottom: 56,
            textAlign: "left",
          }}
        >
          <h3
            style={{
              fontSize: 22,
              marginBottom: 28,
              color: "#1A1A1A",
              letterSpacing: "-0.01em",
            }}
          >
            Order Summary
          </h3>

          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                fontSize: 15,
                color: "#333",
              }}
            >
              <span>
                {item.title}{" "}
                <span style={{ color: "#8A8A8A" }}>
                  × {item.quantity}
                </span>
              </span>
              <span>
                $
                {((item.price * item.quantity) / 100).toFixed(2)}
              </span>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid #E6E4DE",
              marginTop: 28,
              paddingTop: 28,
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              fontWeight: 500,
              color: "#1A1A1A",
            }}
          >
            <span>Total</span>
            <span>${(order.amountTotal / 100).toFixed(2)}</span>
          </div>
        </div>

        {/* Ritual Line */}
        <p
          style={{
            fontStyle: "italic",
            color: "#8B8B8B",
            marginBottom: 48,
            letterSpacing: "0.02em",
          }}
        >
          Brew slowly. Sip with intention.
        </p>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 42px",
              borderRadius: 999,
              background: "#1A1A1A",
              color: "#FFFFFF",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Explore the Collection
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "16px 42px",
              borderRadius: 999,
              border: "1px solid #D8D6CF",
              background: "transparent",
              color: "#1A1A1A",
              textDecoration: "none",
              fontSize: 15,
              fontWeight: 500,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
