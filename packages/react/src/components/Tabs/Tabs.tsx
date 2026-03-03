/**
 * Tabs Component
 *
 * Navigation tabs for switching between content sections.
 *
 * @example
 * ```tsx
 * <Tabs
 *   tabs={[
 *     {
 *       id: 'profile',
 *       label: 'Profile',
 *       content: <ProfileContent />,
 *       icon: <UserIcon />
 *     },
 *     {
 *       id: 'settings',
 *       label: 'Settings',
 *       content: <SettingsContent />,
 *       badge: 3
 *     },
 *     {
 *       id: 'billing',
 *       label: 'Billing',
 *       content: <BillingContent />,
 *       disabled: true
 *     }
 *   ]}
 *   defaultTab="profile"
 * />
 * ```
 */

import React, { useState, useRef, useCallback } from "react";
import type { TabsProps } from "./Tabs.types";
import styles from "./Tabs.module.css";

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  activeTab: controlledActiveTab,
  onChange,
  fullWidth = false,
  noPanelPadding = false,
  className,
}) => {
  // Determine if controlled or uncontrolled
  const isControlled = controlledActiveTab !== undefined;

  // Internal state for uncontrolled mode
  const [internalActiveTab, setInternalActiveTab] = useState(
    defaultTab || tabs[0]?.id || "",
  );

  // Refs for tab buttons
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Get current active tab
  const activeTab = isControlled ? controlledActiveTab : internalActiveTab;

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    if (!isControlled) {
      setInternalActiveTab(tabId);
    }
    onChange?.(tabId);
  };

  // Get enabled tabs (filter out disabled)
  const getEnabledTabs = useCallback(() => {
    return tabs.filter((tab) => !tab.disabled);
  }, [tabs]);

  // Focus a specific tab by index in the enabled tabs list
  const focusTabByIndex = useCallback(
    (index: number) => {
      const enabledTabs = getEnabledTabs();
      if (enabledTabs.length === 0) return;

      // Wrap around
      const wrappedIndex =
        ((index % enabledTabs.length) + enabledTabs.length) %
        enabledTabs.length;
      const targetTab = enabledTabs[wrappedIndex];
      if (!targetTab) return;
      const tabElement = tabRefs.current.get(targetTab.id);
      tabElement?.focus();
    },
    [getEnabledTabs],
  );

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent, currentTabId: string) => {
      const enabledTabs = getEnabledTabs();
      const currentIndex = enabledTabs.findIndex(
        (tab) => tab.id === currentTabId,
      );

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          focusTabByIndex(currentIndex - 1);
          break;
        case "ArrowRight":
          event.preventDefault();
          focusTabByIndex(currentIndex + 1);
          break;
        case "Home":
          event.preventDefault();
          focusTabByIndex(0);
          break;
        case "End":
          event.preventDefault();
          focusTabByIndex(enabledTabs.length - 1);
          break;
      }
    },
    [getEnabledTabs, focusTabByIndex],
  );

  // Find active tab content
  const activeTabData = tabs.find((tab) => tab.id === activeTab);

  const containerClasses = [
    styles.container,
    fullWidth && styles.fullWidth,
    noPanelPadding && styles.noPanelPadding,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClasses}>
      {/* Tab list */}
      <div className={styles.tabList} role="tablist">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          const tabClasses = [styles.tab, isActive && styles.active]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) {
                  tabRefs.current.set(tab.id, el);
                } else {
                  tabRefs.current.delete(tab.id);
                }
              }}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              className={tabClasses}
              onClick={() => handleTabChange(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, tab.id)}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
            >
              {/* Icon */}
              {tab.icon && <span className={styles.icon}>{tab.icon}</span>}

              {/* Label */}
              <span>{tab.label}</span>

              {/* Badge */}
              {tab.badge !== undefined && (
                <span className={styles.badge}>{tab.badge}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab panel (content) */}
      {activeTabData && (
        <div
          key={activeTab}
          className={styles.panel}
          role="tabpanel"
          id={`panel-${activeTab}`}
          aria-labelledby={`tab-${activeTab}`}
        >
          {activeTabData.content}
        </div>
      )}
    </div>
  );
};

Tabs.displayName = "Tabs";
