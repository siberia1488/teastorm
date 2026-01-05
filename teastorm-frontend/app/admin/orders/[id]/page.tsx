import { notFound, redirect } from "next/navigation";
import { getAdminOrderById } from "@/lib/queries";

/**
 * Admin order details page
 * Allows admin to view order and change status
 */
type PageProps = {
  // Next.js 16: params is async
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminOrderDetailsPage({ params }: PageProps) {
  // unwrap params promise
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const order = await getAdminOrderById(id);

  if (!order) {
    notFound();
  }

  /**
   * Server action: update order status
   */
  async function updateStatus(formData: FormData) {
    "use server";

    const status = formData.get("status");

    if (!status || typeof status !== "string") {
      return;
    }

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    // refresh page after update
    redirect(`/admin/orders/${id}`);
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Order {order.id.slice(0, 8)}
        </h1>
        <p className="text-sm text-gray-500">
          Created {new Date(order.createdAt).toLocaleString()}
        </p>
      </header>

      {/* Summary */}
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
            <dt className="text-sm text-gray-500">Total</dt>
            <dd className="font-semibold">
              {(order.amountTotal / 100).toFixed(2)}{" "}
              {order.currency.toUpperCase()}
            </dd>
          </div>
        </dl>
      </section>

      {/* Admin actions */}
      <section className="rounded-lg border bg-white p-6">
        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Actions
        </h2>

        <div className="flex flex-wrap gap-3">
          <form action={updateStatus}>
            <input type="hidden" name="status" value="paid" />
            <button className="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
              Mark as paid
            </button>
          </form>

          <form action={updateStatus}>
            <input type="hidden" name="status" value="shipped" />
            <button className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700">
              Mark as shipped
            </button>
          </form>

          <form action={updateStatus}>
            <input type="hidden" name="status" value="cancelled" />
            <button className="rounded bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700">
              Cancel order
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
