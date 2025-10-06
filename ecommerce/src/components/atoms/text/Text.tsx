import type { ReactNode, ElementType } from "react";
import classNames from "classnames";
import styles from "./Text.module.css";

export interface TextProps {
  children: ReactNode;
  as?: ElementType;
  variant?: "h1" | "h2" | "h3" | "h4" | "body" | "small" | "caption";
  color?: "primary" | "secondary" | "tertiary" | "accent" | "error";
  className?: string;
}

export function Text({ children, as, variant = "body", color = "primary", className }: TextProps) {
  const Component = as || (variant.startsWith("h") ? variant : "p");

  return (
    <Component className={classNames(styles.text, styles[variant], styles[color], className)}>{children}</Component>
  );
}
