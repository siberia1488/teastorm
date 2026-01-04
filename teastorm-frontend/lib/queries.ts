import { prisma } from "@/lib/prisma";

// Sanity (teas)

export const teasQuery = `
  *[_type == "tea"]{
    _id,
    title,
    slug,
    category,
    origin,
    description,
    image,
    variants[]{
      _id,
      title,
      weight,
      price
    }
  }
`;

// Admin orders (read only)

export async function getAdminOrders() {
  return prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

export async function getAdminOrderById(orderId: string) {
  return prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: true,
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}
