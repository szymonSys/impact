import { PageHero, CategoriesSection } from "@/components/organisms";
import { getAllCategories } from "@/lib/api";
import styles from "./page.module.css";

export default async function HomePage() {
  const categories = await getAllCategories();

  return (
    <div className={styles.page}>
      <PageHero title="Shop by Category" description="Browse products organized by category and find what you need." />

      <CategoriesSection categories={categories} title="Explore Categories" showCount />
    </div>
  );
}
