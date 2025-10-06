import type { ReactNode } from "react";
import classNames from "classnames";
import styles from "./Badge.module.css";

export interface BadgeProps {
  children: ReactNode;
  variant?: "primary" | "accent" | "success" | "error";
  size?: "small" | "medium" | "large";
  className?: string;
}

export function Badge({ children, variant = "primary", size = "medium", className }: BadgeProps) {
  return <span className={classNames(styles.badge, styles[variant], styles[size], className)}>{children}</span>;
}
