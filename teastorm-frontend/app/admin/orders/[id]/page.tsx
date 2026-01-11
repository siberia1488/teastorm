import { notFound, redirect } from "next/navigation";
import {
  getAdminOrderById,
  getAdminOrderStatusLog,
} from "@/lib/queries";

// Stripe address
type ShippingAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};

// Format address
function formatAddress(address: ShippingAddress | null): string[] {
  if (!address) return [];

  const lines: string[] = [];

  if (address.line1) lines.push(address.line1);
  if (address.line2) lines.push(address.line2);

  const cityLine = [address.city, address.state, address.postal_code]
    .filter(Boolean)
    .join(", ");

  if (cityLine) lines.push(cityLine);
  if (address.country) lines.push(address.country);

  return lines;
}

// Status colors
function getStatusBadge(status: string) {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
}

// Page
type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminOrderDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;
  if (!id) notFound();

  const order = await getAdminOrderById(id);
  if (!order) notFound();

  const statusLog = await getAdminOrderStatusLog(id);

  // Update status
  async function updateStatus(formData: FormData) {
    "use server";

    const status = formData.get("status");
    if (!status || typeof status !== "string") return;

    await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );

    redirect(`/admin/orders/${id}`);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">
          Order {order.id.slice(0, 8)}
        </h1>
        <p className="text-sm text-gray-500">
          {new Date(order.createdAt).toLocaleString()}
        </p>
      </header>

      {/* Summary */}
      <section className="rounded-lg border bg-white p-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-gray-500">Status</div>
            <span
              className={`inline-flex rounded-full px-2 py-1 text-xs ${getStatusBadge(
                order.status
              )}`}
            >
              {order.status}
            </span>
          </div>

          <div>
            <div className="text-sm text-gray-500">Email</div>
            <div className="font-medium">
              {order.email ?? "—"}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-500">Total</div>
            <div className="font-semibold">
              {(order.amountTotal / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </div>
          </div>
        </div>
      </section>

      {/* Shipping */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">Shipping</h2>

        {order.shippingName || order.shippingAddress ? (
          <div className="space-y-1 text-sm">
            {order.shippingName && (
              <div className="font-medium">
                {order.shippingName}
              </div>
            )}

            {formatAddress(
              order.shippingAddress as ShippingAddress
            ).map((line, i) => (
              <div key={i} className="text-gray-700">
                {line}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm text-gray-500">
            No shipping info
          </div>
        )}
      </section>

      {/* Status history */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">
          Status history
        </h2>

        {statusLog.length === 0 ? (
          <p className="text-sm text-gray-500">
            No changes yet
          </p>
        ) : (
          <ul className="space-y-2 text-sm">
            {statusLog.map((log) => (
              <li
                key={log.id}
                className="flex justify-between border-b pb-1"
              >
                <span>
                  {log.fromStatus} →{" "}
                  <strong>{log.toStatus}</strong>
                </span>
                <span className="text-gray-500">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Items */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">Items</h2>

        <table className="w-full text-sm">
          <thead className="border-b">
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-b">
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>
                  {(item.price / 100).toFixed(2)}{" "}
                  {order.currency.toUpperCase()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Actions */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium">Actions</h2>

        <div className="flex gap-3">
          {["paid", "shipped", "cancelled"].map((s) => (
            <form key={s} action={updateStatus}>
              <input type="hidden" name="status" value={s} />
              <button className="rounded bg-gray-800 px-4 py-2 text-sm text-white">
                Mark {s}
              </button>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
