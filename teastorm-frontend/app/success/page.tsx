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
    },
  });

  if (!order) {
    notFound();
  }

  // 🔒 guard: success page is only for paid orders
  if (order.status !== "paid") {
    redirect(`/orders/${order.id}`);
  }

  // 🔒 guard: prevent refresh abuse
  // success page is shown once, then user goes to order page
  redirect(`/orders/${order.id}`);
}
