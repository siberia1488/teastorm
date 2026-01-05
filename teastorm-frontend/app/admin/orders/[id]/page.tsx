import { notFound } from "next/navigation";
import { getAdminOrderById } from "@/lib/queries";

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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900">
          Order {order.id}
        </h1>
        <p className="text-sm text-gray-500">
          Created {new Date(order.createdAt).toLocaleString()}
        </p>
      </header>

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
    </div>
  );
}
