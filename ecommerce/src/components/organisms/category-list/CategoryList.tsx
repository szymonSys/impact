import { CategoryCard } from "@/components/molecules/category-card/CategoryCard";
import { categoryToSlug, capitalize } from "@/lib/utils";
import styles from "./CategoryList.module.css";

export interface CategoryListProps {
  categories: string[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className={styles.categoryList}>
      {categories.map((category) => (
        <CategoryCard key={category} name={capitalize(category)} href={`/category/${categoryToSlug(category)}`} />
      ))}
    </div>
  );
}
