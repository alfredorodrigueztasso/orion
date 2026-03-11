/**
 * Footer Component
 *
 * A flexible footer section with support for brand info, link groups,
 * social links, newsletter signup, and legal links.
 *
 * @example
 * ```tsx
 * <Footer
 *   brand={{ name: "Orion", description: "AI-first design system" }}
 *   linkGroups={[
 *     { title: "Product", links: [{ label: "Features", href: "#" }] },
 *     { title: "Company", links: [{ label: "About", href: "#" }] },
 *   ]}
 *   socialLinks={[
 *     { label: "Twitter", href: "#", icon: <Twitter size={20} /> },
 *   ]}
 *   copyright="© 2024 Orion. All rights reserved."
 * />
 * ```
 */

import { forwardRef } from "react";
import type { FooterProps, FooterLink } from "./Footer.types";
import { Section, Container } from "@orion-ds/react";
import styles from "./Footer.module.css";

const FooterLinkItem = ({ link }: { link: FooterLink }) => (
  <li className={styles.linkItem}>
    <a
      href={link.href}
      className={styles.link}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
    >
      {link.label}
    </a>
  </li>
);

export const Footer = forwardRef<HTMLElement, FooterProps>(
  (
    {
      brand,
      linkGroups,
      socialLinks,
      newsletter,
      copyright,
      legalLinks,
      variant = "default",
      background = "subtle",
      className,
      ...rest
    },
    ref,
  ) => {
    const currentYear = new Date().getFullYear();
    const copyrightText =
      copyright ||
      `© ${currentYear} ${brand?.name || "Company"}. All rights reserved.`;

    const classNames = [styles.footer, styles[`variant-${variant}`], className]
      .filter(Boolean)
      .join(" ");

    return (
      <Section
        ref={ref}
        as="footer"
        spacing="lg"
        background={background}
        borderTop
        className={classNames}
        {...rest}
      >
        <Container size="xl">
          {/* Main footer content */}
          <div className={styles.main}>
            {/* Brand column */}
            {brand && (
              <div className={styles.brandColumn}>
                <div className={styles.brandHeader}>
                  {brand.logo && (
                    <span className={styles.logo}>{brand.logo}</span>
                  )}
                  <span className={styles.brandName}>{brand.name}</span>
                </div>

                {brand.description && (
                  <p className={styles.brandDescription}>{brand.description}</p>
                )}

                {/* Social links (in brand column for default variant) */}
                {socialLinks &&
                  socialLinks.length > 0 &&
                  variant === "default" && (
                    <div className={styles.socialLinks}>
                      {socialLinks.map((social) => (
                        <a
                          key={social.label}
                          href={social.href}
                          className={styles.socialLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  )}
              </div>
            )}

            {/* Link groups */}
            {linkGroups && linkGroups.length > 0 && (
              <div className={styles.linkGroups}>
                {linkGroups.map((group) => (
                  <div key={group.title} className={styles.linkGroup}>
                    <h4 className={styles.groupTitle}>{group.title}</h4>
                    <ul className={styles.linkList}>
                      {group.links.map((link) => (
                        <FooterLinkItem key={link.label} link={link} />
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {/* Newsletter */}
            {newsletter && (
              <div className={styles.newsletter}>{newsletter}</div>
            )}
          </div>

          {/* Bottom bar */}
          <div className={styles.bottom}>
            <p className={styles.copyright}>{copyrightText}</p>

            {legalLinks && legalLinks.length > 0 && (
              <nav className={styles.legalLinks}>
                {legalLinks.map((link, index) => (
                  <span key={link.label}>
                    <a
                      href={link.href}
                      className={styles.legalLink}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                    >
                      {link.label}
                    </a>
                    {index < legalLinks.length - 1 && (
                      <span className={styles.legalSeparator}>·</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {/* Social links (in bottom bar for minimal/centered variants) */}
            {socialLinks && socialLinks.length > 0 && variant !== "default" && (
              <div className={styles.socialLinks}>
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={styles.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>
    );
  },
);

Footer.displayName = "Footer";
