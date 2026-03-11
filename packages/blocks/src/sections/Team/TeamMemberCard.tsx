/**
 * TeamMemberCard Component
 *
 * Internal component for rendering individual team member cards.
 */

import type { TeamMemberCardProps } from "./Team.types";
import { Card, Avatar } from "@orion-ds/react";
import styles from "./Team.module.css";

export const TeamMemberCard = ({
  member,
  variant = "default",
  className,
}: TeamMemberCardProps) => {
  const { name, role, bio, avatarSrc, avatarInitials, avatar, socialLinks } =
    member;

  // Determine avatar size based on variant
  const avatarSize = variant === "compact" ? "xl" : "profile";

  const classNames = [
    styles.memberCard,
    styles[`variant-${variant}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Generate initials from name if not provided
  const initials =
    avatarInitials ||
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const content = (
    <>
      <div className={styles.avatarWrapper}>
        {/* Use Avatar component if avatarSrc is provided, otherwise fall back to legacy avatar ReactNode */}
        {avatarSrc ? (
          <Avatar
            src={avatarSrc}
            alt={name}
            initials={initials}
            size={avatarSize}
          />
        ) : avatar ? (
          <div className={styles.avatarLegacy}>{avatar}</div>
        ) : (
          <Avatar initials={initials} size={avatarSize} />
        )}
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.role}>{role}</p>

        {bio && variant !== "compact" && <p className={styles.bio}>{bio}</p>}

        {socialLinks && socialLinks.length > 0 && (
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a
                key={link.platform || index}
                href={link.href}
                className={styles.socialLink}
                aria-label={link.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );

  if (variant === "cards") {
    return (
      <Card variant="base" className={classNames}>
        <Card.Body className={styles.cardBody}>{content}</Card.Body>
      </Card>
    );
  }

  return <div className={classNames}>{content}</div>;
};

TeamMemberCard.displayName = "TeamMemberCard";
