"use client";

import dynamic from "next/dynamic";

import SiteHeader from "@/app/components/SiteHeader";

const CartDrawer = dynamic(
  () => import("@/components/cart/CartDrawer"),
  { ssr: false }
);

export default function ClientShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      {children}
      <CartDrawer />
    </>
  );
}
