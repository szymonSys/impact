"use client";

import { type ReactNode } from "react";
import { useLinkStatus } from "next/link";
import { Spinner } from "@/components/atoms/spinner/Spinner";
import styles from "./Link.module.css";

export interface LinkContentProps {
  children: ReactNode | ((isPending: boolean) => ReactNode);
  showLoader: boolean;
  loaderSize: "small" | "medium" | "large";
  replaceContent: boolean;
  loadingClassName?: string;
}

export function LinkContent({ children, showLoader, loaderSize, replaceContent, loadingClassName }: LinkContentProps) {
  const { pending: isPending } = useLinkStatus();

  const content = typeof children === "function" ? children(isPending) : children;
  const wrapperClassName = isPending && loadingClassName ? loadingClassName : isPending ? styles.loading : undefined;

  if (isPending && showLoader && replaceContent) {
    return (
      <span className={wrapperClassName}>
        <Spinner size={loaderSize} />
      </span>
    );
  }

  return (
    <span className={wrapperClassName} style={{ display: "contents" }}>
      {content}
      {isPending && showLoader && !replaceContent && typeof children !== "function" && (
        <Spinner size={loaderSize} className={styles.inlineSpinner} />
      )}
    </span>
  );
}
