"use client";

import type { CartItem as CartItemType } from "@/types";
import { Image } from "@/components/atoms/image/Image";
import { Text } from "@/components/atoms/text/Text";
import { TrashIcon } from "@/components/atoms/icon/Icon";
import { QuantitySelector } from "../quantity-selector/QuantitySelector";
import { formatPrice } from "@/lib/utils";
import styles from "./CartItem.module.css";

export interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const { product, quantity } = item;
  const totalPrice = product.price * quantity;

  return (
    <div className={styles.cartItem}>
      <div className={styles.imageContainer}>
        <Image src={product.image} alt={product.title} aspectRatio="square" objectFit="contain" />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <Text variant="h4" className={styles.title}>
            {product.title}
          </Text>
          <button className={styles.removeButton} onClick={() => onRemove(product.id)} aria-label="Remove item">
            <TrashIcon size={20} />
          </button>
        </div>

        <div className={styles.footer}>
          <QuantitySelector
            value={quantity}
            onChange={(newQuantity) => onUpdateQuantity(product.id, newQuantity)}
            min={1}
            max={99}
          />

          <Text variant="h3" className={styles.price}>
            {formatPrice(totalPrice)}
          </Text>
        </div>
      </div>
    </div>
  );
}
