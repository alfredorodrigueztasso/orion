"use client";

/**
 * SettingsTemplate
 *
 * Flexible settings/configuration page with multiple sections and save functionality.
 * Supports unsaved changes detection and organized section navigation.
 *
 * @example
 * ```tsx
 * <SettingsTemplate
 *   title="Settings"
 *   sections={sections}
 *   onSave={handleSave}
 *   hasUnsavedChanges={hasChanges}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Card, Button } from "@orion-ds/react";
import { AlertCircle, Check } from "lucide-react";
import type { SettingsTemplateProps } from "./SettingsTemplate.types";
import styles from "./SettingsTemplate.module.css";

export const SettingsTemplate = forwardRef<
  HTMLDivElement,
  SettingsTemplateProps
>(
  (
    {
      title = "Settings",
      sections = [],
      activeSectionId,
      onSelectSection,
      onSave,
      onReset,
      isLoading = false,
      hasUnsavedChanges = false,
      error,
      successMessage,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selectedSection, setSelectedSection] = useState(
      activeSectionId || sections[0]?.id || "",
    );

    const handleSelectSection = useCallback(
      (sectionId: string) => {
        setSelectedSection(sectionId);
        onSelectSection?.(sectionId);
      },
      [onSelectSection],
    );

    const activeSection = sections.find((s) => s.id === selectedSection);

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Header */}
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          {hasUnsavedChanges && (
            <div className={styles.unsavedBadge}>Unsaved changes</div>
          )}
        </div>

        <div className={styles.container}>
          {/* Sidebar Navigation */}
          {sections.length > 0 && (
            <nav className={styles.sidebar}>
              <div className={styles.sidebarContent}>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={[
                      styles.navItem,
                      selectedSection === section.id && styles.navItemActive,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleSelectSection(section.id)}
                    disabled={isLoading}
                  >
                    <div className={styles.navItemLabel}>{section.title}</div>
                    {section.description && (
                      <div className={styles.navItemDescription}>
                        {section.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </nav>
          )}

          {/* Main Content */}
          <div className={styles.content}>
            {/* Messages */}
            {error && (
              <div className={styles.errorMessage}>
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {successMessage && (
              <div className={styles.successMessage}>
                <Check size={18} />
                {successMessage}
              </div>
            )}

            {/* Section Content */}
            {activeSection ? (
              <Card className={styles.sectionCard}>
                <Card.Header>
                  <h2 className={styles.sectionTitle}>{activeSection.title}</h2>
                  {activeSection.description && (
                    <p className={styles.sectionDescription}>
                      {activeSection.description}
                    </p>
                  )}
                </Card.Header>
                <Card.Body className={styles.sectionBody}>
                  {activeSection.content}
                </Card.Body>
              </Card>
            ) : sections.length === 0 ? (
              <Card>
                <Card.Body className={styles.emptyState}>
                  <p>No settings sections configured</p>
                </Card.Body>
              </Card>
            ) : null}

            {/* Action Buttons */}
            {sections.length > 0 && (
              <div className={styles.actions}>
                <Button
                  variant="ghost"
                  onClick={onReset}
                  disabled={isLoading || !hasUnsavedChanges}
                >
                  Discard Changes
                </Button>
                <Button
                  variant="primary"
                  onClick={onSave}
                  isLoading={isLoading}
                  disabled={!hasUnsavedChanges}
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);

SettingsTemplate.displayName = "SettingsTemplate";
export default SettingsTemplate;
