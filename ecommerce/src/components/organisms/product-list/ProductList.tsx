import { ProductCard } from "@/components/molecules/product-card/ProductCard";
import styles from "./ProductList.module.css";
import { Text } from "@/components/atoms/text/Text";
import { Product } from "@/types";

export interface ProductListProps {
  products: Product[];
}

export async function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.emptyState}>
            <Text variant="h2">No products found</Text>
            <Text color="secondary">This category is empty.</Text>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.productList}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
