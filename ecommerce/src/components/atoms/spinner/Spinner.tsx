import classNames from "classnames";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: "small" | "medium" | "large";
  className?: string;
  label?: string;
}

export function Spinner({ size = "medium", className, label = "Loading" }: SpinnerProps) {
  return (
    <span className={classNames(styles.spinner, styles[size], className)} role="status" aria-label={label}>
      <span className={styles.visuallyHidden}>{label}</span>
    </span>
  );
}
