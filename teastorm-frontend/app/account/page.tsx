import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import LogoutButton from "./logout-button";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
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

        {orders.map(
          (order: {
            id: string;
            status: string;
            amountTotal: number;
            currency: string;
            createdAt: Date;
          }) => (
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
          )
        )}

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
