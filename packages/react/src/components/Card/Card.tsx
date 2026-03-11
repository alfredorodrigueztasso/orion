/**
 * Card Component
 *
 * A versatile container card with header, body, and footer sections.
 *
 * @example
 * ```tsx
 * <Card variant="base">
 *   <Card.Header>Card Title</Card.Header>
 *   <Card.Body>
 *     Card content goes here
 *   </Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 *
 * <Card variant="glass" interactive>
 *   <Card.Body>Clickable glass card</Card.Body>
 * </Card>
 * ```
 */

import React from "react";
import type {
  CardProps,
  CardHeaderProps,
  CardBodyProps,
  CardFooterProps,
  ImageCardPosition,
  ImageContentProps,
  ImageTitleProps,
  ImageDescriptionProps,
  ImageMetaProps,
} from "./Card.types";
import styles from "./Card.module.css";

// Gradient class mapping
const getGradientClass = (position: ImageCardPosition): string => {
  const map: Record<ImageCardPosition, string | undefined> = {
    top: styles.gradientTop,
    center: styles.gradientCenter,
    bottom: styles.gradientBottom,
  };
  return map[position] || styles.gradientBottom || "";
};

// Main Card component
export const Card: React.FC<CardProps> & {
  Header: React.FC<CardHeaderProps>;
  Body: React.FC<CardBodyProps>;
  Footer: React.FC<CardFooterProps>;
  ImageContent: React.FC<ImageContentProps>;
  ImageTitle: React.FC<ImageTitleProps>;
  ImageDescription: React.FC<ImageDescriptionProps>;
  ImageMeta: React.FC<ImageMetaProps>;
} = ({
  variant = "base",
  interactive = false,
  imageUrl,
  imagePosition = "bottom",
  aspectRatio = "16/9",
  className,
  children,
  style,
  ...rest
}) => {
  // Deprecation: outlined → base alias
  const resolvedVariant = variant === "outlined" ? "base" : variant;

  if (process.env.NODE_ENV !== "production" && variant === "outlined") {
    console.warn(
      '[Orion] Card variant="outlined" is deprecated. Use variant="base" instead. ' +
        "It will be removed in the next major version.",
    );
  }

  const isImageVariant = resolvedVariant === "image";

  const classNames = [
    styles.card,
    styles[resolvedVariant],
    interactive && styles.interactive,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cardStyle = isImageVariant
    ? {
        ...style,
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
        aspectRatio,
      }
    : style;

  if (isImageVariant) {
    return (
      <div className={classNames} style={cardStyle} {...rest}>
        <div
          className={`${styles.imageOverlay} ${getGradientClass(imagePosition)}`}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={classNames} style={style} {...rest}>
      {children}
    </div>
  );
};

// Card Header subcomponent
const CardHeader: React.FC<CardHeaderProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.header, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

// Card Body subcomponent
const CardBody: React.FC<CardBodyProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.body, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

// Card Footer subcomponent
const CardFooter: React.FC<CardFooterProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.footer, className].filter(Boolean).join(" ");

  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

// Image Card subcomponents
const ImageContent: React.FC<ImageContentProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.imageContent, className].filter(Boolean).join(" ");
  return (
    <div className={classNames} {...rest}>
      {children}
    </div>
  );
};

const ImageTitle: React.FC<ImageTitleProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.imageTitle, className].filter(Boolean).join(" ");
  return (
    <h3 className={classNames} {...rest}>
      {children}
    </h3>
  );
};

const ImageDescription: React.FC<ImageDescriptionProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.imageDescription, className]
    .filter(Boolean)
    .join(" ");
  return (
    <p className={classNames} {...rest}>
      {children}
    </p>
  );
};

const ImageMeta: React.FC<ImageMetaProps> = ({
  className,
  children,
  ...rest
}) => {
  const classNames = [styles.imageMeta, className].filter(Boolean).join(" ");
  return (
    <span className={classNames} {...rest}>
      {children}
    </span>
  );
};

// Attach subcomponents
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.ImageContent = ImageContent;
Card.ImageTitle = ImageTitle;
Card.ImageDescription = ImageDescription;
Card.ImageMeta = ImageMeta;

// Display names for debugging
Card.displayName = "Card";
CardHeader.displayName = "Card.Header";
CardBody.displayName = "Card.Body";
CardFooter.displayName = "Card.Footer";
ImageContent.displayName = "Card.ImageContent";
ImageTitle.displayName = "Card.ImageTitle";
ImageDescription.displayName = "Card.ImageDescription";
ImageMeta.displayName = "Card.ImageMeta";
