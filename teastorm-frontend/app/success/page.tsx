import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";

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

  const session = await getServerSession(authOptions);

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      ...(session?.user?.id
        ? { userId: session.user.id }
        : {}),
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Thank you for your order 🎉</h1>

        <p style={styles.text}>
          Your payment was successful. We’ve received your order and will start
          processing it shortly.
        </p>

        <div style={styles.meta}>
          <div>
            <strong>Order:</strong> #{order.id.slice(0, 8)}
          </div>
          <div>
            <strong>Total:</strong>{" "}
            ${(order.amountTotal / 100).toFixed(2)}{" "}
            {order.currency.toUpperCase()}
          </div>
        </div>

        <div style={styles.actions}>
          <Link href={`/orders/${order.id}`} style={styles.primary}>
            View order
          </Link>

          <Link href="/shop" style={styles.secondary}>
            Continue shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  card: {
    width: "100%",
    maxWidth: 520,
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 32,
    textAlign: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 12,
  },
  text: {
    color: "#555",
    marginBottom: 24,
    fontSize: 16,
  },
  meta: {
    marginBottom: 32,
    color: "#333",
    fontSize: 15,
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  primary: {
    padding: "12px 16px",
    borderRadius: 8,
    background: "#000",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 500,
  },
  secondary: {
    padding: "12px 16px",
    borderRadius: 8,
    border: "1px solid #ddd",
    color: "#000",
    textDecoration: "none",
  },
};
