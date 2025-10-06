import NextImage from "next/image";
import classNames from "classnames";
import styles from "./Image.module.css";

export interface ImageProps {
  src: string;
  alt: string;
  aspectRatio?: "square" | "portrait" | "landscape" | "wide";
  objectFit?: "cover" | "contain";
  rounded?: boolean;
  className?: string;
}

export function Image({
  src,
  alt,
  aspectRatio = "square",
  objectFit = "cover",
  rounded = false,
  className,
}: ImageProps) {
  return (
    <div className={classNames(styles.imageWrapper, styles[aspectRatio], { [styles.rounded]: rounded })}>
      <NextImage
        src={src}
        alt={alt}
        fill
        className={classNames(styles.image, { [styles.contain]: objectFit === "contain" }, className)}
        sizes="(max-width: 768px) 100vw, 33vw"
      />
    </div>
  );
}
