import { type ReactNode, type AnchorHTMLAttributes } from "react";
import NextLink from "next/link";
import { LinkContent } from "./LinkContent";

export interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> {
  href: string;
  children: ReactNode | ((isPending: boolean) => ReactNode);
  className?: string;
  showLoader?: boolean;
  loaderSize?: "small" | "medium" | "large";
  replaceContent?: boolean;
  loadingClassName?: string;
  external?: boolean;
  prefetch?: boolean;
}

export function Link({
  href,
  children,
  className,
  showLoader = true,
  loaderSize = "small",
  replaceContent = false,
  loadingClassName,
  external = false,
  prefetch = true,
  ...anchorProps
}: LinkProps) {
  const linkProps = {
    href,
    className,
    prefetch,
    ...(external && { target: "_blank", rel: "noopener noreferrer" }),
    ...anchorProps,
  };

  return (
    <NextLink {...linkProps}>
      <LinkContent
        showLoader={showLoader}
        loaderSize={loaderSize}
        replaceContent={replaceContent}
        loadingClassName={loadingClassName}>
        {children}
      </LinkContent>
    </NextLink>
  );
}
