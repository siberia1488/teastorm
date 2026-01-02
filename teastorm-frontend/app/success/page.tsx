import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

type PageProps = {
  searchParams: {
    orderId?: string;
  };
};

type ShippingAddress = {
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
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

  const shippingAddress = order.shippingAddress as ShippingAddress | null;

  return (
    <main style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Payment successful</h1>

        <div style={styles.meta}>
          Order #{order.id.slice(0, 8)}
        </div>

        <section style={styles.section}>
          <strong>Status</strong>
          <div>{order.status}</div>
        </section>

        <section style={styles.section}>
          <strong>Items</strong>

          {order.items.map((item) => (
            <div key={item.id} style={styles.item}>
              <div style={{ fontWeight: 500 }}>{item.title}</div>
              <div style={styles.itemMeta}>
                Qty: {item.quantity} · $
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

        {order.shippingName && (
          <section style={styles.section}>
            <strong>Shipping</strong>
            <div>{order.shippingName}</div>

            {shippingAddress && (
              <div style={styles.address}>
                {formatAddress(shippingAddress)}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

function formatAddress(address: ShippingAddress) {
  return [
    address.line1,
    address.line2,
    address.city && address.state && address.postal_code
      ? `${address.city}, ${address.state} ${address.postal_code}`
      : null,
    address.country,
  ]
    .filter(Boolean)
    .join(", ");
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
  address: {
    marginTop: 6,
    fontSize: 14,
    color: "#555",
  },
};
