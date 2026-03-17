"use client";

import React from "react";
import type { TeamProps, TeamMemberCardProps } from "./Team.types";
import { TeamMemberCard } from "./TeamMemberCard";
import styles from "./Team.module.css";

type TeamComponent = React.ForwardRefExoticComponent<
  TeamProps & React.RefAttributes<HTMLElement>
> & {
  MemberCard: React.FC<TeamMemberCardProps>;
};

export const Team = React.forwardRef<HTMLElement, TeamProps>(
  ({ title, description, members, columns = 4, className }, ref) => {
    const gridClass =
      columns === 2
        ? styles.grid2
        : columns === 3
          ? styles.grid3
          : styles.grid4;

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <div className={styles.container}>
          {(title || description) && (
            <div className={styles.header}>
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </div>
          )}
          <div className={`${styles.grid} ${gridClass}`}>
            {members.map((member) => (
              <TeamMemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>
    );
  },
) as TeamComponent;

Team.displayName = "Team";
Team.MemberCard = TeamMemberCard;
