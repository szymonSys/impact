import { Spinner } from "@/components/atoms/spinner/Spinner";
import styles from "./PageLoading.module.css";

export interface PageLoadingProps {
  message?: string;
}

export function PageLoading({ message = "Loading..." }: PageLoadingProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Spinner size="large" />
        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}
