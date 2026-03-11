/**
 * Team Component
 *
 * A team/about section for displaying team members with avatars,
 * roles, bios, and social links.
 *
 * @example
 * ```tsx
 * <Team
 *   eyebrow={<Badge>Our Team</Badge>}
 *   title="Meet the people behind Orion"
 *   description="A passionate team building the future of design systems"
 *   members={[
 *     {
 *       name: "Jane Doe",
 *       role: "CEO & Founder",
 *       bio: "10+ years in design systems",
 *       avatar: <img src="/jane.jpg" alt="Jane" />,
 *       socialLinks: [
 *         { platform: "twitter", href: "#", icon: <Twitter size={18} /> },
 *         { platform: "linkedin", href: "#", icon: <Linkedin size={18} /> }
 *       ]
 *     }
 *   ]}
 *   columns={4}
 * />
 * ```
 */

import { forwardRef } from "react";
import type { TeamProps } from "./Team.types";
import { Section, Container } from "@orion-ds/react";
import { TeamMemberCard } from "./TeamMemberCard";
import styles from "./Team.module.css";

export const Team = forwardRef<HTMLElement, TeamProps>(
  (
    {
      eyebrow,
      title,
      description,
      members,
      columns = 4,
      variant = "default",
      background = "base",
      centered = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;

    const classNames = [styles.team, centered && styles.centered, className]
      .filter(Boolean)
      .join(" ");

    return (
      <Section
        ref={ref}
        spacing="lg"
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

          <div className={`${styles.grid} ${styles[`cols-${columns}`]}`}>
            {members.map((member, index) => (
              <TeamMemberCard
                key={member.name || index}
                member={member}
                variant={variant}
              />
            ))}
          </div>
        </Container>
      </Section>
    );
  },
);

Team.displayName = "Team";
