"use client";

/**
 * Icon Browser - Documentation Utility
 *
 * A comprehensive gallery for browsing all available Lucide icons
 * with search, filtering, and click-to-copy functionality.
 *
 * This is a documentation tool, not a component for use in applications.
 * All display settings are hardcoded for optimal browsing experience.
 */

import React, { useState, useMemo, useCallback } from "react";
import { icons, Search } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { IconGalleryProps } from "./IconGallery.types";
import styles from "./IconGallery.module.css";

const ICON_CATEGORIES: Record<string, string[]> = {
  Navigation: [
    "Menu",
    "X",
    "ChevronDown",
    "ChevronUp",
    "ChevronLeft",
    "ChevronRight",
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
    "Home",
    "Settings",
    "Bell",
    "User",
    "LogOut",
    "LogIn",
    "Search",
    "MapPin",
    "Navigation",
  ],
  Actions: [
    "Plus",
    "Minus",
    "Check",
    "Copy",
    "Download",
    "Upload",
    "Share2",
    "Trash2",
    "Edit",
    "Eye",
    "EyeOff",
    "Lock",
    "Unlock",
    "Zap",
    "Refresh",
    "RotateCw",
    "Save",
    "Send",
    "Archive",
    "Flag",
  ],
  Status: [
    "AlertCircle",
    "CheckCircle",
    "XCircle",
    "Info",
    "HelpCircle",
    "AlertTriangle",
    "CheckCircle2",
    "Circle",
    "Loader",
    "Loader2",
    "Clock",
    "Calendar",
  ],
  Media: [
    "Image",
    "Video",
    "Music",
    "FileText",
    "File",
    "Folder",
    "FolderOpen",
    "Camera",
    "Paperclip",
    "Play",
    "Pause",
    "Volume2",
    "VolumeX",
  ],
  Communication: [
    "Mail",
    "MessageSquare",
    "Heart",
    "Star",
    "Share",
    "MessageCircle",
    "Phone",
    "Smartphone",
    "Gift",
    "ThumbsUp",
    "ThumbsDown",
  ],
  Commerce: [
    "ShoppingCart",
    "DollarSign",
    "CreditCard",
    "Tag",
    "Briefcase",
    "TrendingUp",
    "TrendingDown",
    "BarChart",
    "PieChart",
    "Activity",
  ],
};

export const IconGallery: React.FC<IconGalleryProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Get all icon names from lucide-react's icons export
  const allIconNames = useMemo(() => {
    return Object.keys(icons).sort();
  }, []);

  // Filter icons based on search and category
  const filteredIcons = useMemo(() => {
    let filtered = allIconNames;

    if (selectedCategory) {
      const categoryIcons = ICON_CATEGORIES[selectedCategory];
      if (categoryIcons) {
        filtered = filtered.filter((name) => categoryIcons.includes(name));
      }
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((name) => name.toLowerCase().includes(term));
    }

    return filtered.sort();
  }, [allIconNames, searchTerm, selectedCategory]);

  const copyToClipboard = useCallback((iconName: string) => {
    const code = `import { ${iconName} } from 'lucide-react';`;
    navigator.clipboard.writeText(code);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 1500);
  }, []);

  const renderIcon = useCallback((iconName: string) => {
    const Icon = icons[iconName as keyof typeof icons] as
      | LucideIcon
      | undefined;
    return Icon ? <Icon size={24} /> : null;
  }, []);

  return (
    <div className={`${styles.gallery}${className ? ` ${className}` : ""}`}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Icon Browser</h1>
        <p>{allIconNames.length.toLocaleString()} icons available</p>
      </div>

      {/* Search */}
      <div className={styles.searchContainer}>
        <Search size={20} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search icons..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        {searchTerm && (
          <span className={styles.resultCount}>
            {filteredIcons.length} results
          </span>
        )}
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        <button
          className={`${styles.categoryBtn} ${!selectedCategory ? styles.active : ""}`}
          onClick={() => setSelectedCategory(null)}
          type="button"
        >
          All
        </button>
        {Object.keys(ICON_CATEGORIES).map((category) => (
          <button
            key={category}
            className={`${styles.categoryBtn} ${selectedCategory === category ? styles.active : ""}`}
            onClick={() => setSelectedCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Icon Grid */}
      <div className={styles.iconGrid}>
        {filteredIcons.map((iconName) => (
          <button
            key={iconName}
            className={styles.iconItem}
            onClick={() => copyToClipboard(iconName)}
            title={iconName}
            type="button"
          >
            <span className={styles.iconDisplay}>{renderIcon(iconName)}</span>
            <span className={styles.iconName}>{iconName}</span>
            {copiedIcon === iconName && (
              <span className={styles.copiedBadge}>Copied!</span>
            )}
          </button>
        ))}
      </div>

      {/* No Results */}
      {filteredIcons.length === 0 && (
        <div className={styles.noResults}>
          <p>No icons found for "{searchTerm}"</p>
        </div>
      )}

      {/* Usage */}
      <div className={styles.usageInfo}>
        <h3>Usage</h3>
        <pre
          className={styles.codeBlock}
        >{`import { Search, Download } from 'lucide-react';

<Button icon={<Search size={20} />}>Search</Button>`}</pre>
      </div>
    </div>
  );
};

IconGallery.displayName = "IconGallery";
