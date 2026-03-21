import type { Meta, StoryObj } from "@storybook/react";
import { AppDownload } from "./AppDownload";

const meta = {
  title: "Sections/Marketing/AppDownload",
  component: AppDownload,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppDownload>;

export default meta;
type Story = StoryObj<typeof meta>;

const appBadges = [
  {
    store: "apple" as const,
    href: "https://apps.apple.com/app/id1234567890",
  },
  {
    store: "google" as const,
    href: "https://play.google.com/store/apps/details?id=com.example.app",
  },
];

const appFeatures = [
  {
    title: "Lightning Fast",
    description: "Optimized performance on all devices",
  },
  {
    title: "Secure & Private",
    description: "Enterprise-grade encryption for your data",
  },
  {
    title: "Offline Mode",
    description: "Work seamlessly without internet connection",
  },
];

export const Default: Story = {
  args: {
    title: "Download Our App",
    description: "Available on iOS and Android",
    badges: appBadges,
    appImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=800&fit=crop",
    features: appFeatures,
    layout: "centered",
  },
};

export const SplitLeftLayout: Story = {
  args: {
    title: "Get the Mobile Experience",
    description: "Download our app for on-the-go access",
    badges: appBadges,
    appImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=800&fit=crop",
    features: appFeatures,
    layout: "split-left",
  },
};

export const SplitRightLayout: Story = {
  args: {
    title: "Take Productivity Everywhere",
    description: "Sync across all your devices seamlessly",
    badges: appBadges,
    appImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=800&fit=crop",
    features: appFeatures,
    layout: "split-right",
  },
};

export const WithQRCode: Story = {
  args: {
    title: "Scan to Download",
    badges: appBadges,
    showQrCode: true,
    qrCode: "https://via.placeholder.com/200x200?text=QR+Code",
    rating: {
      value: 4.8,
      count: "45K reviews",
    },
  },
};

export const Compact: Story = {
  args: {
    title: "Download Our App",
    description: "Available on iOS and Android",
    badges: appBadges,
    compact: true,
  },
};

export const AllVariants: Story = {
  args: {
    title: "Download Our App",
    description: "Available on iOS and Android",
    badges: appBadges,
    appImage:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=800&fit=crop",
    features: appFeatures,
    layout: "centered",
  },
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "60px" }}>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>Centered Layout</h3>
        <AppDownload {...args} />
      </div>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>With Rating & QR Code</h3>
        <AppDownload
          title="Scan to Download"
          badges={appBadges}
          showQrCode={true}
          qrCode="https://via.placeholder.com/200x200?text=QR"
          rating={{ value: 4.8, count: "45K reviews" }}
        />
      </div>
      <div>
        <h3 style={{ margin: "0 0 20px 0" }}>Compact Mode</h3>
        <AppDownload
          title="Download Now"
          description="Get started in seconds"
          badges={appBadges}
          compact={true}
        />
      </div>
    </div>
  ),
};
