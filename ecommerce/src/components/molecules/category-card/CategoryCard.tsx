"use client";

import { Link } from "@/components/atoms/link/Link";
import { Spinner } from "@/components/atoms/spinner/Spinner";
import { Text } from "@/components/atoms/text/Text";
import styles from "./CategoryCard.module.css";

export interface CategoryCardProps {
  name: string;
  href: string;
  productCount?: number;
}

export function CategoryCard({ name, href, productCount }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className={styles.card}
      loadingClassName={styles.loading}
      showLoader={false}
      aria-label={`Navigate to ${name} category`}>
      {(isPending) => (
        <>
          <div className={styles.content}>
            <h3 className={styles.title}>{name}</h3>
            {productCount !== undefined && (
              <p className={styles.count}>
                {productCount} {productCount === 1 ? "item" : "items"}
              </p>
            )}
            <div className={styles.arrow}>
              {isPending ? (
                <Spinner size="small" label="Loading" />
              ) : (
                <Text color="accent" variant="small">
                  show products
                </Text>
              )}
            </div>
          </div>
          {isPending && <div className={styles.loadingOverlay} />}
        </>
      )}
    </Link>
  );
}
