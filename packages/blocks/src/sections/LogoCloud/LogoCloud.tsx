/**
 * LogoCloud Component
 *
 * A logo cloud section for displaying partner/client logos.
 * Supports grid, inline, and animated marquee layouts.
 *
 * @example
 * ```tsx
 * <LogoCloud
 *   eyebrow="Trusted by"
 *   title="Industry leaders use Orion"
 *   logos={[
 *     { logo: <img src="/vercel.svg" alt="" />, name: "Vercel" },
 *     { logo: <img src="/stripe.svg" alt="" />, name: "Stripe" },
 *     { logo: <img src="/linear.svg" alt="" />, name: "Linear" },
 *     { logo: <img src="/notion.svg" alt="" />, name: "Notion" },
 *     { logo: <img src="/figma.svg" alt="" />, name: "Figma" }
 *   ]}
 *   layout="inline"
 *   grayscale={true}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { LogoCloudProps } from "./LogoCloud.types";
import { Section, Container } from "@orion-ds/react";
import styles from "./LogoCloud.module.css";

export const LogoCloud = forwardRef<HTMLElement, LogoCloudProps>(
  (
    {
      eyebrow,
      title,
      description,
      logos,
      layout = "inline",
      columns = 5,
      size = "md",
      grayscale = true,
      background = "none",
      centered = true,
      marqueeSpeed = "normal",
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [
      styles.logoCloud,
      styles[`layout-${layout}`],
      styles[`size-${size}`],
      grayscale && styles.grayscale,
      centered && styles.centered,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const renderLogo = (item: (typeof logos)[0], index: number) => {
      const logoElement = (
        <div className={styles.logo} key={item.name || index}>
          {item.logo}
          <span className="sr-only">{item.name}</span>
        </div>
      );

      if (item.href) {
        return (
          <a
            key={item.name || index}
            href={item.href}
            className={styles.logoLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
          >
            {item.logo}
          </a>
        );
      }

      return logoElement;
    };

    const renderLogos = () => {
      if (layout === "marquee") {
        return (
          <div
            className={`${styles.marquee} ${styles[`speed-${marqueeSpeed}`]}`}
          >
            <div className={styles.marqueeTrack}>
              {logos.map(renderLogo)}
              {/* Duplicate for seamless loop */}
              {logos.map((item, index) =>
                renderLogo(item, index + logos.length),
              )}
            </div>
          </div>
        );
      }

      return (
        <div
          className={`${styles.logosContainer} ${layout === "grid" ? styles[`cols-${columns}`] : ""}`}
        >
          {logos.map(renderLogo)}
        </div>
      );
    };

    return (
      <Section
        ref={ref}
        spacing="md"
        background={background}
        className={classNames}
        {...rest}
      >
        <Container size="xl">
          {hasHeader && (
            <header className={styles.header}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}

          {renderLogos()}
        </Container>
      </Section>
    );
  },
);

LogoCloud.displayName = "LogoCloud";
