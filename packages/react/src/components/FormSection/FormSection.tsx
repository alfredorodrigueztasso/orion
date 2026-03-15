"use client";

/**
 * FormSection Component
 *
 * A form section for settings pages and structured form layouts.
 * Optimized for Product Mode with clear hierarchy and efficient space usage.
 *
 * @example
 * ```tsx
 * <FormSection
 *   title="Profile Information"
 *   description="Update your personal details"
 *   actions={<Button>Save</Button>}
 * >
 *   <FormSection.Group columns={2}>
 *     <Field label="First Name" type="text" />
 *     <Field label="Last Name" type="text" />
 *   </FormSection.Group>
 *   <Field label="Email" type="email" />
 * </FormSection>
 * ```
 */

import { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type {
  FormSectionProps,
  FormSectionGroupProps,
  FormSectionActionsProps,
} from "./FormSection.types";
import styles from "./FormSection.module.css";

// Sub-component: Group
const FormSectionGroup = forwardRef<HTMLDivElement, FormSectionGroupProps>(
  ({ label, helpText, children, columns = 1, className, ...rest }, ref) => {
    const classNames = [styles.group, styles[`columns-${columns}`], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {label && <div className={styles.groupLabel}>{label}</div>}
        <div className={styles.groupFields}>{children}</div>
        {helpText && <div className={styles.groupHelp}>{helpText}</div>}
      </div>
    );
  },
);

FormSectionGroup.displayName = "FormSection.Group";

// Sub-component: Actions
const FormSectionActions = forwardRef<HTMLDivElement, FormSectionActionsProps>(
  ({ children, align = "end", className, ...rest }, ref) => {
    const classNames = [styles.actions, styles[`align-${align}`], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classNames} {...rest}>
        {children}
      </div>
    );
  },
);

FormSectionActions.displayName = "FormSection.Actions";

// Main component
const FormSectionBase = forwardRef<HTMLDivElement, FormSectionProps>(
  (
    {
      title,
      description,
      children,
      actions,
      collapsible = false,
      defaultCollapsed = false,
      divider = false,
      variant = "default",
      icon,
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const classNames = [
      styles.formSection,
      styles[`variant-${variant}`],
      divider && styles.divider,
      disabled && styles.disabled,
      collapsible && styles.collapsible,
      collapsed && styles.collapsed,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const handleToggle = () => {
      if (collapsible) {
        setCollapsed(!collapsed);
      }
    };

    const HeaderTag = collapsible ? "button" : "div";
    const headerProps = collapsible
      ? {
          type: "button" as const,
          onClick: handleToggle,
          "aria-expanded": !collapsed,
        }
      : {};

    // Only render header if there's content to show
    const hasHeader = title || icon || collapsible;

    return (
      <div ref={ref} className={classNames} {...rest}>
        {hasHeader && (
          <HeaderTag className={styles.header} {...headerProps}>
            <div className={styles.headerContent}>
              {icon && <span className={styles.icon}>{icon}</span>}
              {(title || description) && (
                <div className={styles.headerText}>
                  {title && <h3 className={styles.title}>{title}</h3>}
                  {description && (
                    <p className={styles.description}>{description}</p>
                  )}
                </div>
              )}
            </div>
            {collapsible && (
              <ChevronDown
                size={20}
                className={`${styles.collapseIcon} ${collapsed ? styles.iconCollapsed : ""}`}
              />
            )}
          </HeaderTag>
        )}

        {(!collapsible || !collapsed) && (
          <div className={styles.content}>
            <div className={styles.fields}>{children}</div>
            {actions && <div className={styles.actionsWrapper}>{actions}</div>}
          </div>
        )}
      </div>
    );
  },
);

FormSectionBase.displayName = "FormSection";

// Compose with sub-components
export const FormSection = Object.assign(FormSectionBase, {
  Group: FormSectionGroup,
  Actions: FormSectionActions,
});
