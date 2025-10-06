import type { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[variant], styles[size], { [styles.fullWidth]: fullWidth }, className)}
      {...props}>
      {children}
    </button>
  );
}
