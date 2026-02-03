import type { ReactNode } from "react";
import "./globals.css";

import Providers from "./providers";
import ClientShell from "./ClientShell";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
