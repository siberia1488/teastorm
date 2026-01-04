import Link from "next/link";
import { getAdminOrders } from "@/lib/queries";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Orders
        </h1>
        <p className="text-sm text-gray-500">
          All customer orders
        </p>
      </header>

      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No orders yet
                </td>
              </tr>
            )}

            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {order.id.slice(0, 8)}
                  </Link>
                </td>

                <td className="px-4 py-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="px-4 py-3">
                  {order.email ?? "—"}
                </td>

                <td className="px-4 py-3">
                  {(order.amountTotal / 100).toFixed(2)}{" "}
                  {order.currency.toUpperCase()}
                </td>

                <td className="px-4 py-3">
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
