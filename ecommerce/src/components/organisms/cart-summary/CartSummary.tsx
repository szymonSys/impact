import classNames from "classnames";
import { Text } from "@/components/atoms/text/Text";
import { formatPrice } from "@/lib/utils";
import styles from "./CartSummary.module.css";

export interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
  shipping?: number;
}

export function CartSummary({ subtotal, itemCount, shipping }: CartSummaryProps) {
  const total = subtotal + (shipping ?? 0);

  return (
    <div className={styles.cartSummary}>
      <Text variant="h3">Order Summary</Text>

      <div className={styles.row}>
        <Text color="secondary">Items ({itemCount})</Text>
        <Text>{formatPrice(subtotal)}</Text>
      </div>

      <div className={styles.row}>
        <Text color="secondary">Shipping</Text>
        <Text color="accent">Free</Text>
      </div>

      <div className={classNames(styles.row, styles.total)}>
        <Text variant="h3">Total</Text>
        <Text variant="h2" className={styles.totalPrice}>
          {formatPrice(total)}
        </Text>
      </div>
    </div>
  );
}
