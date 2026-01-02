import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";

type PageProps = {
  searchParams: {
    orderId?: string;
  };
};

export default async function SuccessPage({ searchParams }: PageProps) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/login");
  }

  const orderId = searchParams.orderId;

  if (!orderId) {
    notFound();
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: session.user.id,
      status: "paid",
    },
    include: {
      items: true,
    },
  });

  if (!order) {
    notFound();
  }

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment successful</h1>

        <div style={styles.meta}>
          Order #{order.id.slice(0, 8)} ·{" "}
          {order.createdAt.toDateString()}
        </div>

        <section style={styles.section}>
          <strong>Items</strong>

          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <div>{item.title}</div>
              <div style={styles.itemMeta}>
                Qty {item.quantity} · $
                {(item.price / 100).toFixed(2)}
              </div>
            </div>
          ))}
        </section>

        <section style={styles.section}>
          <strong>Total</strong>
          <div>
            ${(order.amountTotal / 100).toFixed(2)}{" "}
            {order.currency.toUpperCase()}
          </div>
        </section>
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
    maxWidth: 560,
    border: "1px solid #eee",
    borderRadius: 16,
    padding: 24,
  },
  title: {
    fontSize: 28,
    marginBottom: 6,
  },
  meta: {
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  item: {
    borderTop: "1px solid #eee",
    paddingTop: 12,
    marginTop: 12,
  },
  itemMeta: {
    fontSize: 14,
    color: "#666",
  },
};
