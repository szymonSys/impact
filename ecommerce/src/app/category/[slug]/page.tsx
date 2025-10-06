import { notFound } from "next/navigation";
import { Text } from "@/components/atoms/text/Text";
import { ProductList } from "@/components/organisms/product-list/ProductList";
import { getProductsByCategory, getAllCategories } from "@/lib/api";
import { slugToCategory, categoryToSlug, capitalize } from "@/lib/utils";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const categories = await getAllCategories();

  return categories.map((category) => ({
    slug: categoryToSlug(category),
  }));
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const categoryName = slugToCategory(slug);
  const products = await getProductsByCategory(categoryName).catch((error) => {
    console.error("Error fetching products:", error);
    notFound();
  });
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.titleRow}>
            <Text variant="h1">{capitalize(categoryName)}</Text>
            <Text as="span" className={styles.count}>
              ({products.length} {products.length === 1 ? "product" : "products"})
            </Text>
          </div>
        </header>
        <ProductList products={products} />
      </div>
    </div>
  );
}
