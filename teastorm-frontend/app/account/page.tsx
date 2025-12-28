import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import LogoutButton from "./logout-button";


export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <main style={styles.center}>
        <h1 style={{ fontSize: 28, marginBottom: 12 }}>Account</h1>
        <p style={{ color: "#555", marginBottom: 24 }}>
          You need to sign in to view your account.
        </p>
        <Link href="/api/auth/signin">Sign in →</Link>
      </main>
    );
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={{ fontSize: 28, marginBottom: 8 }}>Account</h1>
        <div style={{ color: "#666", marginBottom: 24 }}>
          {session.user.email}
        </div>

        <h2 style={{ fontSize: 18, marginBottom: 12 }}>Orders</h2>

        {orders.length === 0 && (
          <p style={{ color: "#777" }}>No orders yet.</p>
        )}

        {orders.map((order) => (
          <div key={order.id} style={styles.order}>
            <div>
              <strong>Order</strong> #{order.id.slice(0, 8)}
            </div>
            <div>Status: {order.status}</div>
            <div>
              Total: ${(order.amountTotal / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </div>
            <div style={{ fontSize: 12, color: "#777" }}>
              {order.createdAt.toDateString()}
            </div>
          </div>
        ))}

        <LogoutButton />
      </div>
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 24,
  },
  center: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  card: {
    width: "100%",
    maxWidth: 520,
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 24,
  },
  order: {
    borderTop: "1px solid #eee",
    paddingTop: 12,
    marginTop: 12,
  },
};
