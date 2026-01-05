import Link from "next/link";
import {
  getAdminDashboardStats,
  getAdminRecentOrders,
} from "@/lib/queries";

/**
 * Admin dashboard
 */
export default async function AdminDashboardPage() {
  const [stats, orders] = await Promise.all([
    getAdminDashboardStats(),
    getAdminRecentOrders(),
  ]);

  return (
    <div className="space-y-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of store activity
        </p>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-white p-6">
          <div className="text-sm text-gray-500">
            Total orders
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {stats.totalOrders}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="text-sm text-gray-500">
            Paid orders
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {stats.paidOrders}
          </div>
        </div>

        <div className="rounded-lg border bg-white p-6">
          <div className="text-sm text-gray-500">
            Revenue
          </div>
          <div className="mt-2 text-2xl font-semibold">
            {(stats.revenue / 100).toFixed(2)} USD
          </div>
        </div>
      </section>

      {/* Recent orders */}
      <section className="rounded-lg border bg-white">
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-medium text-gray-900">
            Recent orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b bg-gray-50 text-left">
              <tr>
                <th className="px-4 py-3">Order</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b last:border-0 hover:bg-gray-50"
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
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
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
      </section>
    </div>
  );
}
