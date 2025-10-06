"use client";

import { MinusIcon, PlusIcon } from "@/components/atoms/icon/Icon";
import styles from "./QuantitySelector.module.css";

export interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className={styles.quantitySelector}>
      <button
        className={styles.button}
        onClick={handleDecrement}
        disabled={value <= min}
        aria-label="Decrease quantity">
        <MinusIcon size={16} />
      </button>

      <span className={styles.value}>{value}</span>

      <button
        className={styles.button}
        onClick={handleIncrement}
        disabled={value >= max}
        aria-label="Increase quantity">
        <PlusIcon size={16} />
      </button>
    </div>
  );
}
