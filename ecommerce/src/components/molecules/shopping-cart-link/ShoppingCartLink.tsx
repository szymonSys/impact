"use client";

import { Link } from "@/components/atoms/link/Link";
import { ShoppingCartIcon } from "@/components/atoms/icon/Icon";
import { Badge } from "@/components/atoms/badge/Badge";
import { useCart } from "@/context/cart-context";
import styles from "./ShoppingCartLink.module.css";
import { Spinner } from "@/components/atoms/spinner/Spinner";

export function ShoppingCartLink() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link href="/cart" showLoader={true}>
      {(isPending) =>
        isPending ? (
          <Spinner size="small" label="Loading" />
        ) : (
          <button className={styles.cartButton} aria-label="Shopping cart">
            <ShoppingCartIcon size={24} />
            {totalItems > 0 && (
              <Badge variant="accent" size="small" className={styles.cartBadge}>
                {totalItems}
              </Badge>
            )}
          </button>
        )
      }
    </Link>
  );
}
