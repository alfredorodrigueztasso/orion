import React from "react";
import type { TeamMemberCardProps } from "./Team.types";
import styles from "./Team.module.css";

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  avatarSrc,
  className,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`${styles.card} ${className || ""}`}>
      {avatarSrc ? (
        <img src={avatarSrc} alt={name} className={styles.avatar} />
      ) : (
        <div className={styles.avatarPlaceholder}>{initials}</div>
      )}
      <h3 className={styles.memberName}>{name}</h3>
      <p className={styles.memberRole}>{role}</p>
    </div>
  );
};

TeamMemberCard.displayName = "TeamMemberCard";
