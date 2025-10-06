import type { Product } from "@/types";
import { Image } from "@/components/atoms/image/Image";
import { Text } from "@/components/atoms/text/Text";
import { formatPrice } from "@/lib/utils";
import styles from "./ProductCard.module.css";
import { AddToCartButton } from "./components/AddToCartButton";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageContainer}>
        <Image src={product.image} alt={product.title} aspectRatio="square" objectFit="contain" rounded />
      </div>

      <div className={styles.content}>
        <Text variant="h4" className={styles.title}>
          {product.title}
        </Text>

        <div className={styles.priceRow}>
          <Text variant="h3" as="span" className={styles.price}>
            {formatPrice(product.price)}
          </Text>
        </div>

        <div className={styles.actions}>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
