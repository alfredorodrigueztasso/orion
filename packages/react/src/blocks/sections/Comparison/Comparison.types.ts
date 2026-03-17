import type { HTMLAttributes } from "react";

export interface ComparisonColumn {
  title: string;
  highlighted?: boolean;
  badge?: string;
}

export interface ComparisonFeature {
  name: string;
  values: (boolean | string)[];
}

export interface ComparisonProps extends HTMLAttributes<HTMLElement> {
  /** Section heading */
  title: string;
  /** Column definitions */
  columns: ComparisonColumn[];
  /** Feature rows with values per column */
  features: ComparisonFeature[];
  /** Additional class name */
  className?: string;
}
