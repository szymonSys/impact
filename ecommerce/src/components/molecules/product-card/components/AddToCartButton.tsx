"use client";

import { Button } from "@/components/atoms/button/Button";
import { useCart } from "@/context/cart-context";
import { Product } from "@/types";

export interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  return (
    <Button onClick={() => addToCart(product)} fullWidth size="medium">
      Add to Cart
    </Button>
  );
}
