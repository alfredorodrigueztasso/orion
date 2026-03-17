export interface TeamMember {
  /** Member name */
  name: string;
  /** Job title or role */
  role: string;
  /** Avatar image URL */
  avatarSrc?: string;
}

export interface TeamMemberCardProps extends TeamMember {
  /** Additional CSS class */
  className?: string;
}

export interface TeamProps {
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Team members array */
  members: TeamMember[];
  /** Grid columns (2 | 3 | 4) */
  columns?: 2 | 3 | 4;
  /** Additional CSS class */
  className?: string;
}
