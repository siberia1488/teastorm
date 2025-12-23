"use client";

import React from "react";
import { CartProvider } from "@/app/cart-context";

export default function Providers({ children }: { children: React.ReactNode }) {
return <CartProvider>{children}</CartProvider>;
}
