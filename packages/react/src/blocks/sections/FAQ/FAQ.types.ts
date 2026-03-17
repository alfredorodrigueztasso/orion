export interface FAQItem {
  /** Unique identifier */
  id: string;
  /** The question */
  question: string;
  /** The answer */
  answer: string;
}

export interface FAQItemCardProps extends FAQItem {
  /** Whether the item is currently expanded */
  isOpen?: boolean;
  /** Toggle callback */
  onToggle?: () => void;
  /** Additional CSS class */
  className?: string;
}

export interface FAQProps {
  /** Section heading */
  title?: string;
  /** Section description */
  description?: string;
  /** Array of FAQ items */
  items: FAQItem[];
  /** Allow multiple items open at once */
  allowMultiple?: boolean;
  /** Additional CSS class */
  className?: string;
}
