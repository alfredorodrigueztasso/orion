"use client";

/**
 * ProfilePageTemplate
 *
 * User profile page with avatar, personal information, and settings sections.
 * Includes tabbed interface for organized information display.
 *
 * @example
 * ```tsx
 * <ProfilePageTemplate
 *   user={currentUser}
 *   onEditProfile={handleEdit}
 *   onChangePassword={handleChangePassword}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Card, Button } from "@orion-ds/react";
import { Edit2, Lock, LogOut, Calendar, MapPin, Phone } from "lucide-react";
import type { ProfilePageTemplateProps } from "./ProfilePageTemplate.types";
import styles from "./ProfilePageTemplate.module.css";

const defaultTabs = [
  { id: "profile", label: "Profile" },
  { id: "security", label: "Security" },
  { id: "settings", label: "Settings" },
];

export const ProfilePageTemplate = forwardRef<
  HTMLDivElement,
  ProfilePageTemplateProps
>(
  (
    {
      user = {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
      },
      onEditProfile,
      onChangePassword,
      onLogout,
      tabs = defaultTabs,
      activeTab = "profile",
      onSelectTab,
      isLoading = false,
      error,
      className,
      ...rest
    },
    ref,
  ) => {
    const [selectedTab, setSelectedTab] = useState(activeTab);

    const handleTabSelect = useCallback(
      (tabId: string) => {
        setSelectedTab(tabId);
        onSelectTab?.(tabId);
      },
      [onSelectTab],
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Profile Header */}
        <Card className={styles.headerCard}>
          <Card.Body className={styles.headerBody}>
            <div className={styles.headerContent}>
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
              )}
              {!user?.avatar && (
                <div className={styles.avatarPlaceholder}>
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}

              <div className={styles.userInfo}>
                <h1 className={styles.userName}>{user?.name}</h1>
                <p className={styles.userEmail}>{user?.email}</p>
                {user?.bio && <p className={styles.userBio}>{user.bio}</p>}
              </div>
            </div>

            <div className={styles.headerActions}>
              <Button
                variant="secondary"
                icon={<Edit2 size={18} />}
                onClick={onEditProfile}
                disabled={isLoading}
              >
                Edit Profile
              </Button>
              <Button
                variant="ghost"
                icon={<LogOut size={18} />}
                onClick={onLogout}
                disabled={isLoading}
              >
                Logout
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* Error Message */}
        {error && <div className={styles.error}>{error}</div>}

        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={[
                  styles.tabButton,
                  selectedTab === tab.id && styles.tabButtonActive,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleTabSelect(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className={styles.tabContent}>
            {selectedTab === "profile" && (
              <Card>
                <Card.Header>
                  <h2 className={styles.sectionTitle}>Profile Information</h2>
                </Card.Header>
                <Card.Body className={styles.sectionBody}>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Name</span>
                      <span className={styles.infoValue}>{user?.name}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Email</span>
                      <span className={styles.infoValue}>{user?.email}</span>
                    </div>

                    {user?.phone && (
                      <div className={styles.infoItem}>
                        <Phone size={16} />
                        <span className={styles.infoLabel}>Phone</span>
                        <span className={styles.infoValue}>{user.phone}</span>
                      </div>
                    )}

                    {user?.location && (
                      <div className={styles.infoItem}>
                        <MapPin size={16} />
                        <span className={styles.infoLabel}>Location</span>
                        <span className={styles.infoValue}>
                          {user.location}
                        </span>
                      </div>
                    )}

                    {user?.joinDate && (
                      <div className={styles.infoItem}>
                        <Calendar size={16} />
                        <span className={styles.infoLabel}>Member Since</span>
                        <span className={styles.infoValue}>
                          {new Date(user.joinDate).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            )}

            {selectedTab === "security" && (
              <Card>
                <Card.Header>
                  <h2 className={styles.sectionTitle}>Security Settings</h2>
                </Card.Header>
                <Card.Body className={styles.sectionBody}>
                  <div className={styles.securityItem}>
                    <div>
                      <h3 className={styles.securityItemTitle}>
                        Password & Authentication
                      </h3>
                      <p className={styles.securityItemDescription}>
                        Manage your password and security settings
                      </p>
                    </div>
                    <Button
                      variant="secondary"
                      icon={<Lock size={18} />}
                      onClick={onChangePassword}
                      disabled={isLoading}
                    >
                      Change Password
                    </Button>
                  </div>

                  <div className={styles.securityItem}>
                    <div>
                      <h3 className={styles.securityItemTitle}>
                        Two-Factor Authentication
                      </h3>
                      <p className={styles.securityItemDescription}>
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="ghost" disabled={isLoading}>
                      Set Up
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            )}

            {selectedTab === "settings" && (
              <Card>
                <Card.Header>
                  <h2 className={styles.sectionTitle}>Settings</h2>
                </Card.Header>
                <Card.Body className={styles.sectionBody}>
                  <div className={styles.settingItem}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        defaultChecked
                        disabled={isLoading}
                      />
                      <span>Email notifications</span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <label className={styles.checkbox}>
                      <input
                        type="checkbox"
                        defaultChecked
                        disabled={isLoading}
                      />
                      <span>Marketing emails</span>
                    </label>
                  </div>
                  <div className={styles.settingItem}>
                    <label className={styles.checkbox}>
                      <input type="checkbox" disabled={isLoading} />
                      <span>Account activity alerts</span>
                    </label>
                  </div>
                </Card.Body>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  },
);

ProfilePageTemplate.displayName = "ProfilePageTemplate";
export default ProfilePageTemplate;
