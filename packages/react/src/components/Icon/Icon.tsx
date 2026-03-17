/**
 * Icon Component
 *
 * A normalized wrapper for Lucide icons that provides:
 * - Consistent sizing via design tokens
 * - Semantic color variants
 * - Proper accessibility handling
 * - Tree-shaking friendly (icons imported directly from lucide-react)
 *
 * @example Basic usage
 * ```tsx
 * import { Icon } from '@orion/react';
 * import { Search, AlertCircle, Check } from 'lucide-react';
 *
 * // Decorative icon (hidden from screen readers)
 * <Icon icon={Search} size="md" decorative />
 *
 * // Semantic icon (announced to screen readers)
 * <Icon icon={AlertCircle} size="lg" label="Warning" color="warning" />
 *
 * // Custom pixel size
 * <Icon icon={Check} size={18} color="success" />
 * ```
 *
 * @example In Button component
 * ```tsx
 * import { Button, Icon } from '@orion/react';
 * import { Download } from 'lucide-react';
 *
 * <Button icon={<Icon icon={Download} decorative />}>
 *   Download File
 * </Button>
 * ```
 */

import { forwardRef, useMemo } from "react";
import type { IconProps, IconSize } from "./Icon.types";
import styles from "./Icon.module.css";

/**
 * Size token to pixel mapping
 * These values must match the CSS variables in theme.css
 */
const SIZE_MAP: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
};

export const Icon = forwardRef<SVGSVGElement, IconProps>(
  (
    {
      icon: IconComponent,
      size = "md",
      color = "current",
      strokeWidth = 2,
      label,
      decorative = false,
      disabled = false,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    // Resolve size to pixels
    const resolvedSize = useMemo(() => {
      if (typeof size === "number") {
        return size;
      }
      return SIZE_MAP[size];
    }, [size]);

    // Build class names
    const classNames = useMemo(() => {
      const classes = [styles.icon];

      // Add size class only for token sizes (not custom pixels)
      if (typeof size === "string") {
        classes.push(styles[size]);
      }

      // Add color class
      classes.push(styles[color]);

      // Add state classes
      if (disabled) {
        classes.push(styles.disabled);
      }

      // Add custom class
      if (className) {
        classes.push(className);
      }

      return classes.filter(Boolean).join(" ");
    }, [size, color, disabled, className]);

    // Accessibility attributes
    const a11yProps = useMemo(() => {
      if (decorative) {
        // Decorative icons are hidden from screen readers
        return {
          "aria-hidden": true as const,
          role: "presentation" as const,
        };
      }

      // Semantic icons need accessible name
      return {
        "aria-label": label,
        role: "img" as const,
      };
    }, [decorative, label]);

    // Merge custom styles with size override for pixel values
    const mergedStyle = useMemo(() => {
      if (typeof size === "number") {
        return {
          width: size,
          height: size,
          ...style,
        };
      }
      return style;
    }, [size, style]);

    return (
      <IconComponent
        ref={ref}
        className={classNames}
        size={resolvedSize}
        strokeWidth={strokeWidth}
        style={mergedStyle}
        {...a11yProps}
        {...rest}
      />
    );
  },
);

Icon.displayName = "Icon";
