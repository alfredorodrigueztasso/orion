"use client";

import { useState, forwardRef } from "react";
import { Building2, ChevronDown, Settings, Users, Plus } from "lucide-react";
import { Popover } from "../../components/Popover";
import { Avatar } from "../../components/Avatar";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { Divider } from "../../components/Divider";
import styles from "./WorkspaceSwitcher.module.css";
import type { WorkspaceSwitcherProps } from "./WorkspaceSwitcher.types";

export const WorkspaceSwitcher = forwardRef<
  HTMLDivElement,
  WorkspaceSwitcherProps
>(
  (
    {
      currentOrg,
      organizations,
      onSettings,
      onParticipants,
      onCreateOrganization,
      onOrgChange,
      fullWidth = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);

    const trigger = (
      <button className={styles.trigger}>
        <Avatar size="xs" icon={<Building2 size={16} />} />
        <span className={styles.triggerName}>{currentOrg.name}</span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>
    );

    const content = (
      <div className={styles.content}>
        {/* Active workspace */}
        <div className={styles.activeWorkspace}>
          <Avatar size="lg" icon={<Building2 size={20} />} />
          <Badge variant="secondary" size="sm">
            {currentOrg.role}
          </Badge>
          <div>
            <div className={styles.orgName}>{currentOrg.name}</div>
            <div className={styles.orgMeta}>
              {currentOrg.memberCount} participantes
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className={styles.actionButtons}>
          <Button
            variant="secondary"
            size="sm"
            icon={<Settings size={16} />}
            onClick={onSettings}
          >
            Configuración
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Users size={16} />}
            onClick={onParticipants}
          >
            Participantes
          </Button>
        </div>

        {/* Divider */}
        <div className={styles.dividerWrapper}>
          <Divider />
        </div>

        {/* Other orgs label */}
        <div className={styles.sectionLabel}>Otras organizaciones</div>

        {/* Org list */}
        <div className={styles.orgList}>
          {organizations.map((org) => (
            <div
              key={org.name}
              className={styles.orgItem}
              onClick={() => onOrgChange?.(org.name)}
            >
              <Avatar size="xs" initials={org.name.slice(0, 2).toUpperCase()} />
              <div>
                <div className={styles.orgItemName}>{org.name}</div>
                <div className={styles.orgItemRole}>{org.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <Button
          variant="ghost"
          size="sm"
          icon={<Plus size={16} />}
          fullWidth
          onClick={onCreateOrganization}
        >
          Nueva organización
        </Button>
      </div>
    );

    return (
      <div
        ref={ref}
        className={[className].filter(Boolean).join(" ") || undefined}
        {...rest}
      >
        <Popover
          trigger={trigger}
          content={content}
          onOpenChange={setIsOpen}
          placement="bottom-start"
          showArrow={false}
          fullWidth={fullWidth}
        />
      </div>
    );
  },
);

WorkspaceSwitcher.displayName = "WorkspaceSwitcher";
