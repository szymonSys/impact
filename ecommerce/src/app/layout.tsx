import type { Metadata } from "next";
import { Header } from "@/components/organisms/header/Header";
import { CartProvider } from "@/context/cart-context";
import { ErrorBoundary } from "@/components/error-boundary/ErrorBoundary";
import "./globals.css";

export const metadata: Metadata = {
  title: "FakeStore - E-commerce Demo",
  description: "A modern e-commerce application built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <ErrorBoundary>
            <Header />
            <main>{children}</main>
          </ErrorBoundary>
        </CartProvider>
      </body>
    </html>
  );
}
