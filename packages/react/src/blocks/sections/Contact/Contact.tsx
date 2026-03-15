"use client";

/**
 * Contact Component
 *
 * A contact section with form and contact information.
 * Supports multiple layouts and custom form fields.
 *
 * @example
 * ```tsx
 * <Contact
 *   eyebrow={<Badge>Contact</Badge>}
 *   title="Get in touch"
 *   description="We'd love to hear from you"
 *   contactInfo={[
 *     { icon: <Mail size={20} />, label: "Email", value: "hello@example.com", href: "mailto:hello@example.com" },
 *     { icon: <Phone size={20} />, label: "Phone", value: "+1 (555) 000-0000", href: "tel:+15550000000" },
 *     { icon: <MapPin size={20} />, label: "Address", value: "123 Main St, City, Country" }
 *   ]}
 *   formFields={[
 *     { name: "name", label: "Name", required: true },
 *     { name: "email", label: "Email", type: "email", required: true },
 *     { name: "message", label: "Message", type: "textarea", required: true }
 *   ]}
 *   onSubmit={(data) => console.log(data)}
 * />
 * ```
 */

import { forwardRef, useCallback, useState } from "react";
import type { ContactProps, ContactFormField } from "./Contact.types";
import { Section, Container } from "@/sections";
import { Button } from "@/components/Button";
import { Field } from "@/components/Field";
import { Textarea } from "@/components/Textarea";
import styles from "./Contact.module.css";

const defaultFields: ContactFormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    placeholder: "your@email.com",
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    required: true,
    placeholder: "How can we help?",
    rows: 4,
  },
];

export const Contact = forwardRef<HTMLElement, ContactProps>(
  (
    {
      eyebrow,
      title,
      description,
      contactInfo,
      formFields = defaultFields,
      onSubmit,
      submitButton,
      submitText = "Send Message",
      layout = "split",
      background = "subtle",
      additionalContent,
      className,
      ...rest
    },
    ref,
  ) => {
    const hasHeader = eyebrow || title || description;
    const hasContactInfo = contactInfo && contactInfo.length > 0;
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleFieldChange = useCallback((name: string, value: string) => {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (onSubmit) {
          onSubmit(formData);
        }
      },
      [formData, onSubmit],
    );

    const classNames = [styles.contact, styles[`layout-${layout}`], className]
      .filter(Boolean)
      .join(" ");

    const renderForm = () => (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formFields}>
          {formFields.map((field) => {
            if (field.type === "textarea") {
              return (
                <Textarea
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  placeholder={field.placeholder}
                  required={field.required}
                  rows={field.rows || 4}
                  value={formData[field.name] || ""}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  className={styles.formField}
                />
              );
            }

            return (
              <Field
                key={field.name}
                label={field.label}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                className={styles.formField}
              />
            );
          })}
        </div>

        <div className={styles.formAction}>
          {submitButton || (
            <Button type="submit" size="lg">
              {submitText}
            </Button>
          )}
        </div>
      </form>
    );

    const renderContactInfo = () => (
      <div className={styles.contactInfo}>
        {contactInfo?.map((info, index) => (
          <div key={info.label || index} className={styles.infoItem}>
            {info.icon && <div className={styles.infoIcon}>{info.icon}</div>}
            <div className={styles.infoContent}>
              <span className={styles.infoLabel}>{info.label}</span>
              {info.href ? (
                <a href={info.href} className={styles.infoValue}>
                  {info.value}
                </a>
              ) : (
                <span className={styles.infoValue}>{info.value}</span>
              )}
            </div>
          </div>
        ))}

        {additionalContent && (
          <div className={styles.additionalContent}>{additionalContent}</div>
        )}
      </div>
    );

    return (
      <Section
        ref={ref}
        spacing="lg"
        background={background}
        className={classNames}
        {...rest}
      >
        <Container size="lg">
          {hasHeader && (
            <header className={styles.header}>
              {eyebrow && <div className={styles.eyebrow}>{eyebrow}</div>}
              {title && <h2 className={styles.title}>{title}</h2>}
              {description && (
                <p className={styles.description}>{description}</p>
              )}
            </header>
          )}

          <div className={styles.content}>
            {layout !== "form-only" && hasContactInfo && renderContactInfo()}
            {renderForm()}
          </div>
        </Container>
      </Section>
    );
  },
);

Contact.displayName = "Contact";
