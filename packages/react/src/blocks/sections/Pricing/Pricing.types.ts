import type { ReactNode } from "react";

export interface PricingPlan {
  /** Plan name */
  name: string;
  /** Price display string */
  price: string;
  /** Billing period (e.g. "/month") */
  period?: string;
  /** Short plan description */
  description?: string;
  /** List of included features */
  features: string[];
  /** CTA element */
  action?: ReactNode;
  /** Highlight this plan as popular/recommended */
  popular?: boolean;
}

export interface PricingCardProps extends PricingPlan {
  /** Additional CSS class */
  className?: string;
}

export interface PricingProps {
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Additional CSS class */
  className?: string;
}
