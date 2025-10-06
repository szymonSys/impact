"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Link } from "@/components/atoms/link/Link";
import { Text } from "@/components/atoms/text/Text";
import { Button } from "@/components/atoms/button/Button";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/utils";
import styles from "./CheckoutContent.module.css";

const PROCESSING_DELAY = 1000;
const REDIRECT_DELAY = 2000;

export function CheckoutContent() {
  const router = useRouter();
  const { cart, clearCart, getTotalPrice, getTotalItems } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const isEmpty = cart.items.length === 0;

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      timeoutRef.current = setTimeout(() => {
        router.push("/");
      }, REDIRECT_DELAY);
    }
  }, [isSuccess, router]);

  const handleFinalize = async () => {
    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve) => {
        timeoutRef.current = setTimeout(resolve, PROCESSING_DELAY);
      });
      clearCart();
      setIsSuccess(true);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Checkout failed:", errorMessage);
      setIsProcessing(false);
    } finally {
      if (!isSuccess) {
        setIsProcessing(false);
      }
    }
  };

  if (isEmpty && !isSuccess) {
    return (
      <div className={styles.emptyState}>
        <Text variant="h2">Your cart is empty</Text>
        <Text color="secondary">Add products to continue.</Text>
        <div className={styles.actions}>
          <Link href="/" showLoader={false}>
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={styles.successState}>
        <div className={styles.successIcon}>✓</div>
        <Text variant="h1">Order Placed!</Text>
        <Text color="secondary">Redirecting to home...</Text>
      </div>
    );
  }

  return (
    <>
      <div className={styles.summary}>
        <Text variant="h2" className={styles.summaryTitle}>
          Order Summary
        </Text>

        <div className={styles.items}>
          {cart.items.map((item) => (
            <div key={item.product.id} className={styles.item}>
              <div className={styles.itemInfo}>
                <Text className={styles.itemTitle}>{item.product.title}</Text>
                <Text variant="small" color="secondary">
                  Quantity: {item.quantity}
                </Text>
              </div>
              <Text className={styles.itemPrice}>{formatPrice(item.product.price * item.quantity)}</Text>
            </div>
          ))}
        </div>

        <div className={styles.totals}>
          <div className={styles.totalRow}>
            <Text color="secondary">Items ({totalItems})</Text>
            <Text>{formatPrice(totalPrice)}</Text>
          </div>
          <div className={styles.totalRow}>
            <Text color="secondary">Shipping</Text>
            <Text color="secondary">Free</Text>
          </div>
          <div className={styles.divider} />
          <div className={styles.totalRow}>
            <Text variant="h3" as="span">
              Total
            </Text>
            <Text variant="h3" as="span" className={styles.totalPrice}>
              {formatPrice(totalPrice)}
            </Text>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Link href="/cart" showLoader={false}>
          <Button variant="secondary" fullWidth disabled={isProcessing}>
            Back to Cart
          </Button>
        </Link>
        <Button onClick={handleFinalize} fullWidth disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Finalize Order"}
        </Button>
      </div>
    </>
  );
}
