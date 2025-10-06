import { Text } from "@/components/atoms/text/Text";
import { CheckoutContent } from "@/components/organisms";
import styles from "./page.module.css";

export default function CheckoutPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <Text variant="h1">Checkout</Text>
          <div className={styles.demoBadge}>
            <Text variant="small" color="secondary">
              Demo Mode
            </Text>
          </div>
        </header>

        <div className={styles.content}>
          <CheckoutContent />
        </div>
      </div>
    </div>
  );
}
