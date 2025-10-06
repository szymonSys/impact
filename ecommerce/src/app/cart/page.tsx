"use client";

import { Link } from "@/components/atoms/link/Link";
import { Text } from "@/components/atoms/text/Text";
import { Button } from "@/components/atoms/button/Button";
import { CartItem } from "@/components/molecules/cart-item/CartItem";
import { CartSummary } from "@/components/organisms/cart-summary/CartSummary";
import { useCart } from "@/context/cart-context";
import styles from "./page.module.css";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } = useCart();
  const isEmpty = cart.items.length === 0;
  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (isEmpty) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <header className={styles.header}>
            <Text variant="h1">Shopping Cart</Text>
          </header>

          <div className={styles.content}>
            <div className={styles.emptyState}>
              <Text variant="h2">Your cart is empty</Text>
              <Text color="secondary">Add some products to your cart to see them here.</Text>
              <div className={styles.emptyActions}>
                <Link href="/" showLoader={false}>
                  <Button>Browse Categories</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Text variant="h1">Shopping Cart</Text>
        </header>

        <div className={styles.content}>
          <div className={styles.cartItems}>
            {cart.items.map((item) => (
              <CartItem key={item.product.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} />
            ))}
          </div>

          <div className={styles.summary}>
            <CartSummary subtotal={totalPrice} itemCount={totalItems} />
            <Link href="/checkout" showLoader={false} className={styles.checkoutLink}>
              <Button fullWidth>Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
