export type NewsletterSize = "sm" | "md";

export interface NewsletterProps {
  /** Section title */
  title: string;
  /** Description text */
  description?: string;
  /** Input placeholder text */
  placeholder?: string;
  /** Submit button text */
  submitLabel?: string;
  /** Disclaimer text below the form */
  disclaimer?: string;
  /** Size variant */
  size?: NewsletterSize;
  /** Callback when form is submitted with email */
  onSubmit?: (email: string) => void;
  /** Optional className */
  className?: string;
}
