import "@testing-library/jest-dom";
import "vitest-axe/extend-expect";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import React from "react";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia (for theme detection)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Mock HTMLElement.scrollIntoView for portal elements
if (!HTMLElement.prototype.scrollIntoView) {
  HTMLElement.prototype.scrollIntoView = vi.fn();
}

// Mock ResizeObserver for components using responsive sizing
if (!global.ResizeObserver) {
  global.ResizeObserver = class ResizeObserver {
    constructor(callback: any) {
      this.callback = callback;
    }
    callback: any;
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  } as any;
}

// Mock lucide-react icons for testing
// This prevents SVG rendering issues in jsdom and speeds up tests
vi.mock("lucide-react", () => {
  // Create a mock icon component factory
  const createMockIcon = (iconName: string) => {
    const MockIcon = React.forwardRef<
      HTMLSpanElement,
      React.SVGProps<SVGSVGElement> & { "data-testid"?: string; size?: number }
    >((props, ref) => {
      const {
        "aria-label": ariaLabel,
        "aria-hidden": ariaHidden,
        size,
        ...rest
      } = props;

      // Determine role based on accessibility props
      const role =
        ariaHidden === "true" || ariaHidden === true ? "presentation" : "img";

      return React.createElement("span", {
        ref,
        "data-lucide": iconName,
        "data-icon": iconName,
        role,
        "aria-label": ariaLabel,
        "aria-hidden": ariaHidden,
        size,
        ...rest,
      });
    });

    MockIcon.displayName = iconName;
    return MockIcon;
  };

  // Export all commonly used and requested icons as mocks
  return {
    // Navigation & UI
    Menu: createMockIcon("Menu"),
    X: createMockIcon("X"),
    ChevronDown: createMockIcon("ChevronDown"),
    ChevronUp: createMockIcon("ChevronUp"),
    ChevronLeft: createMockIcon("ChevronLeft"),
    ChevronRight: createMockIcon("ChevronRight"),
    Home: createMockIcon("Home"),
    Settings: createMockIcon("Settings"),
    User: createMockIcon("User"),
    Users: createMockIcon("Users"),
    Search: createMockIcon("Search"),
    Bell: createMockIcon("Bell"),
    Mail: createMockIcon("Mail"),

    // Actions
    Plus: createMockIcon("Plus"),
    Minus: createMockIcon("Minus"),
    Check: createMockIcon("Check"),
    Copy: createMockIcon("Copy"),
    Download: createMockIcon("Download"),
    Upload: createMockIcon("Upload"),
    Trash2: createMockIcon("Trash2"),
    Edit: createMockIcon("Edit"),
    Eye: createMockIcon("Eye"),
    EyeOff: createMockIcon("EyeOff"),
    ExternalLink: createMockIcon("ExternalLink"),
    MoreVertical: createMockIcon("MoreVertical"),
    MoreHorizontal: createMockIcon("MoreHorizontal"),

    // Status & Alerts
    AlertCircle: createMockIcon("AlertCircle"),
    CheckCircle: createMockIcon("CheckCircle"),
    XCircle: createMockIcon("XCircle"),
    Info: createMockIcon("Info"),
    HelpCircle: createMockIcon("HelpCircle"),
    AlertTriangle: createMockIcon("AlertTriangle"),

    // Media & Social
    Heart: createMockIcon("Heart"),
    Star: createMockIcon("Star"),
    MessageSquare: createMockIcon("MessageSquare"),
    Image: createMockIcon("Image"),
    Video: createMockIcon("Video"),
    File: createMockIcon("File"),
    FileText: createMockIcon("FileText"),
    Paperclip: createMockIcon("Paperclip"),
    Send: createMockIcon("Send"),
    Smile: createMockIcon("Smile"),
    ThumbsUp: createMockIcon("ThumbsUp"),
    Share2: createMockIcon("Share2"),

    // Commerce
    ShoppingCart: createMockIcon("ShoppingCart"),
    DollarSign: createMockIcon("DollarSign"),
    CreditCard: createMockIcon("CreditCard"),

    // Common UI elements
    Calendar: createMockIcon("Calendar"),
    Clock: createMockIcon("Clock"),
    Filter: createMockIcon("Filter"),
    Layout: createMockIcon("Layout"),
    Loader: createMockIcon("Loader"),
    Loader2: createMockIcon("Loader2"),
    Lock: createMockIcon("Lock"),
    Unlock: createMockIcon("Unlock"),
    LogOut: createMockIcon("LogOut"),
    LogIn: createMockIcon("LogIn"),
    Maximize: createMockIcon("Maximize"),
    Minimize: createMockIcon("Minimize"),
    Mic: createMockIcon("Mic"),
    MicOff: createMockIcon("MicOff"),
    Moon: createMockIcon("Moon"),
    Sun: createMockIcon("Sun"),
    Play: createMockIcon("Play"),
    Pause: createMockIcon("Pause"),
    RefreshCw: createMockIcon("RefreshCw"),
    RotateCw: createMockIcon("RotateCw"),
    Save: createMockIcon("Save"),
    Sliders: createMockIcon("Sliders"),
    Tag: createMockIcon("Tag"),
    Zap: createMockIcon("Zap"),
    ZoomIn: createMockIcon("ZoomIn"),
    ZoomOut: createMockIcon("ZoomOut"),

    // Additional icons used by components
    Inbox: createMockIcon("Inbox"),
    Building2: createMockIcon("Building2"),

    __esModule: true,
  };
});
