"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/atoms/link/Link";
import { ShoppingCartIcon, HomeIcon } from "@/components/atoms/icon/Icon";
import { Button } from "@/components/atoms/button/Button";
import { ShoppingCartLink } from "@/components/molecules/shopping-cart-link/ShoppingCartLink";
import styles from "./Header.module.css";

export function Header() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} showLoader={false}>
          <ShoppingCartIcon size={28} />
          <span>FakeStore</span>
        </Link>

        <nav className={styles.nav}>
          {!isHomePage && (
            <Link href="/" showLoader={false}>
              <Button variant="ghost" size="small">
                <HomeIcon size={20} />
                Home
              </Button>
            </Link>
          )}

          <ShoppingCartLink />
        </nav>
      </div>
    </header>
  );
}
