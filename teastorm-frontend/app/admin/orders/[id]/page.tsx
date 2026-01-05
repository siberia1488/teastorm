import { notFound } from "next/navigation";
import { getAdminOrderById } from "@/lib/queries";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function AdminOrderDetailsPage({ params }: PageProps) {
  const order = await getAdminOrderById(params.id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Order {order.id}
        </h1>
        <p className="text-sm text-gray-500">
          Created {new Date(order.createdAt).toLocaleString()}
        </p>
      </header>

      {/* Order summary */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Summary
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-gray-500">Status</dt>
            <dd className="font-medium">{order.status}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Email</dt>
            <dd className="font-medium">{order.email ?? "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Subtotal</dt>
            <dd className="font-medium">
              {(order.subtotalAmount / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Shipping</dt>
            <dd className="font-medium">
              {(order.shippingAmount / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-gray-500">Total</dt>
            <dd className="font-semibold">
              {(order.amountTotal / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </dd>
          </div>
        </dl>
      </section>

      {/* Items */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Items
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b text-left">
              <tr>
                <th className="py-2">Product</th>
                <th className="py-2">Variant</th>
                <th className="py-2">Qty</th>
                <th className="py-2">Price</th>
                <th className="py-2">Line total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id} className="border-b last:border-0">
                  <td className="py-2 font-medium">
                    {item.title}
                  </td>
                  <td className="py-2 text-gray-500">
                    Variant ID: {item.variantId}
                  </td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2">
                    {(item.price / 100).toFixed(2)}{" "}
                    {order.currency.toUpperCase()}
                  </td>
                  <td className="py-2 font-medium">
                    {((item.price * item.quantity) / 100).toFixed(2)}{" "}
                    {order.currency.toUpperCase()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Shipping */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Shipping
        </h2>

        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-500">Name:</span>{" "}
            {order.shippingName ?? "—"}
          </div>

          <div>
            <span className="text-gray-500">Address:</span>
            <pre className="mt-2 rounded bg-gray-50 p-3 text-xs">
              {order.shippingAddress
                ? JSON.stringify(order.shippingAddress, null, 2)
                : "—"}
            </pre>
          </div>
        </div>
      </section>

      {/* Stripe */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Stripe
        </h2>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
          <div>
            <dt className="text-gray-500">Session ID</dt>
            <dd className="font-mono break-all">
              {order.stripeSessionId ?? "—"}
            </dd>
          </div>

          <div>
            <dt className="text-gray-500">Payment Intent</dt>
            <dd className="font-mono break-all">
              {order.paymentIntentId ?? "—"}
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}
