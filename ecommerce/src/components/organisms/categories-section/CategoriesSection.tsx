import { CategoryList } from "@/components/organisms/category-list/CategoryList";
import styles from "./CategoriesSection.module.css";

export interface CategoriesSectionProps {
  categories: string[];
  title?: string;
  showCount?: boolean;
}

export function CategoriesSection({
  categories,
  title = "Explore Categories",
  showCount = true,
}: CategoriesSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          {showCount && <span className={styles.count}>{categories.length} Categories</span>}
        </div>
        <CategoryList categories={categories} />
      </div>
    </section>
  );
}
