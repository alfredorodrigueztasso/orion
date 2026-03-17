import type { Meta, StoryObj } from "@storybook/react";
import { User } from "lucide-react";
import { Avatar } from "./Avatar";
import { Button } from "../Button";
import styles from "./Avatar.stories.module.css";

const meta = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
      description: "Avatar size",
    },
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy"],
      description: "Status indicator",
    },
    interactive: {
      control: "boolean",
      description: "Make avatar clickable",
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=1",
    alt: "User avatar",
  },
};

export const WithInitials: Story = {
  args: {
    initials: "JD",
  },
};

export const WithIcon: Story = {
  args: {
    icon: <User size={20} />,
  },
};

export const OnlineStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=2",
    alt: "Online user",
    status: "online",
  },
};

export const OfflineStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "Offline user",
    status: "offline",
  },
};

export const AwayStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=4",
    alt: "Away user",
    status: "away",
  },
};

export const BusyStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    alt: "Busy user",
    status: "busy",
  },
};

export const ExtraSmall: Story = {
  args: {
    initials: "XS",
    size: "xs",
  },
};

export const Small: Story = {
  args: {
    initials: "SM",
    size: "sm",
  },
};

export const Large: Story = {
  args: {
    initials: "LG",
    size: "lg",
  },
};

export const ExtraLarge: Story = {
  args: {
    initials: "XL",
    size: "xl",
  },
};

export const TwoExtraLarge: Story = {
  args: {
    initials: "2XL",
    size: "2xl",
  },
};

export const Interactive: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=6",
    alt: "Clickable user",
    interactive: true,
    onClick: () => alert("Avatar clicked!"),
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className={styles.storyContainer}>
      <div className={styles.sizeItem}>
        <Avatar initials="XS" size="xs" />
        <p className={styles.sizeLabel}>XS</p>
      </div>
      <div className={styles.sizeItem}>
        <Avatar initials="SM" size="sm" />
        <p className={styles.sizeLabel}>SM</p>
      </div>
      <div className={styles.sizeItem}>
        <Avatar initials="MD" size="md" />
        <p className={styles.sizeLabel}>MD</p>
      </div>
      <div className={styles.sizeItem}>
        <Avatar initials="LG" size="lg" />
        <p className={styles.sizeLabel}>LG</p>
      </div>
      <div className={styles.sizeItem}>
        <Avatar initials="XL" size="xl" />
        <p className={styles.sizeLabel}>XL</p>
      </div>
      <div className={styles.sizeItem}>
        <Avatar initials="2X" size="2xl" />
        <p className={styles.sizeLabel}>2XL</p>
      </div>
    </div>
  ),
};

export const AllStatuses: Story = {
  render: () => (
    <div className={styles.storyContainerWide}>
      <div className={styles.statusItem}>
        <Avatar
          src="https://i.pravatar.cc/150?img=7"
          alt="Online"
          status="online"
          size="lg"
        />
        <p className={styles.statusLabel}>Online</p>
      </div>
      <div className={styles.statusItem}>
        <Avatar
          src="https://i.pravatar.cc/150?img=8"
          alt="Away"
          status="away"
          size="lg"
        />
        <p className={styles.statusLabel}>Away</p>
      </div>
      <div className={styles.statusItem}>
        <Avatar
          src="https://i.pravatar.cc/150?img=9"
          alt="Busy"
          status="busy"
          size="lg"
        />
        <p className={styles.statusLabel}>Busy</p>
      </div>
      <div className={styles.statusItem}>
        <Avatar
          src="https://i.pravatar.cc/150?img=10"
          alt="Offline"
          status="offline"
          size="lg"
        />
        <p className={styles.statusLabel}>Offline</p>
      </div>
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className={styles.avatarGroup}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={styles.avatarGroupItem}>
          <Avatar
            src={`https://i.pravatar.cc/150?img=${i + 10}`}
            alt={`User ${i}`}
            size="md"
            style={{ border: "2px solid var(--surface-base)" }}
          />
        </div>
      ))}
    </div>
  ),
};

export const UserProfile: Story = {
  render: () => (
    <div className={styles.userProfileCard}>
      <Avatar
        src="https://i.pravatar.cc/150?img=15"
        alt="John Doe"
        size="2xl"
        status="online"
        className={styles.profileAvatar}
      />
      <h3 className={styles.profileName}>John Doe</h3>
      <p className={styles.profileRole}>Product Designer</p>
      <p className={styles.profileEmail}>john.doe@example.com</p>
      <div className={styles.profileActions}>
        <Button variant="secondary">Message</Button>
        <Button variant="primary">Follow</Button>
      </div>
    </div>
  ),
};

export const UserList: Story = {
  render: () => (
    <div className={styles.userListCard}>
      <h3 className={styles.userListTitle}>Team Members</h3>
      <div className={styles.userListItems}>
        {[
          {
            name: "Alice Johnson",
            role: "Product Manager",
            status: "online",
            img: 20,
          },
          {
            name: "Bob Smith",
            role: "Lead Developer",
            status: "away",
            img: 21,
          },
          {
            name: "Carol Williams",
            role: "UX Designer",
            status: "busy",
            img: 22,
          },
          {
            name: "David Brown",
            role: "Backend Engineer",
            status: "offline",
            img: 23,
          },
        ].map((user) => (
          <div key={user.name} className={styles.userListItem}>
            <Avatar
              src={`https://i.pravatar.cc/150?img=${user.img}`}
              alt={user.name}
              status={user.status as "online" | "offline" | "away" | "busy"}
              size="md"
            />
            <div className={styles.userListItemInfo}>
              <div className={styles.userListItemName}>{user.name}</div>
              <div className={styles.userListItemRole}>{user.role}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const CommentThread: Story = {
  render: () => (
    <div className={styles.commentThreadContainer}>
      {[
        {
          name: "Sarah Miller",
          initials: "SM",
          comment: "This looks great! Love the design.",
          time: "2 hours ago",
        },
        {
          name: "Mike Davis",
          initials: "MD",
          comment: "Agreed, the colors work really well together.",
          time: "1 hour ago",
        },
        {
          name: "Emma Wilson",
          initials: "EW",
          comment: "Should we add more spacing between sections?",
          time: "30 minutes ago",
        },
      ].map((comment, i, arr) => (
        <div
          key={i}
          className={
            i < arr.length - 1
              ? styles.commentItemWithMargin
              : styles.commentItem
          }
        >
          <Avatar initials={comment.initials} size="sm" />
          <div className={styles.commentContent}>
            <div className={styles.commentHeader}>
              <span className={styles.commentAuthor}>{comment.name}</span>
              <span className={styles.commentTime}>{comment.time}</span>
            </div>
            <p className={styles.commentText}>{comment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const Mentions: Story = {
  render: () => (
    <div className={styles.mentionsCard}>
      <h3 className={styles.mentionsTitle}>Recent Mentions</h3>
      <div className={styles.mentionsItems}>
        {[
          {
            name: "Alex Turner",
            initials: "AT",
            mention: "mentioned you in Design Review",
          },
          {
            name: "Sophie Chen",
            initials: "SC",
            mention: "mentioned you in Sprint Planning",
          },
          {
            name: "James Wilson",
            initials: "JW",
            mention: "mentioned you in Q4 Goals",
          },
        ].map((item) => (
          <div key={item.name} className={styles.mentionItem}>
            <Avatar initials={item.initials} size="sm" />
            <div className={styles.mentionContent}>
              <span className={styles.mentionText}>
                <span className={styles.mentionAuthor}>{item.name}</span>{" "}
                {item.mention}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};

export const ProfileHeader: Story = {
  render: () => (
    <div className={styles.profileHeaderCard}>
      <div className={styles.profileHeaderBanner} />
      <div className={styles.profileHeaderContent}>
        <Avatar
          src="https://i.pravatar.cc/150?img=30"
          alt="Profile"
          size="2xl"
          status="online"
          className={styles.profileHeaderAvatar}
        />
        <div className={styles.profileHeaderInfo}>
          <h2 className={styles.profileHeaderName}>Emma Rodriguez</h2>
          <p className={styles.profileHeaderBio}>
            Senior Product Designer at TechCorp
          </p>
          <div className={styles.profileHeaderStats}>
            <div>
              <span className={styles.profileHeaderStatValue}>2.5K</span>{" "}
              Followers
            </div>
            <div>
              <span className={styles.profileHeaderStatValue}>342</span>{" "}
              Following
            </div>
            <div>
              <span className={styles.profileHeaderStatValue}>89</span> Posts
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "var(--spacing-6)",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <Avatar src="https://i.pravatar.cc/150?img=1" alt="User" size="lg" />
        <p className={styles.sizeLabel}>Image</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar initials="JD" size="lg" />
        <p className={styles.sizeLabel}>Initials</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar icon={<User size={24} />} size="lg" />
        <p className={styles.sizeLabel}>Icon</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=2"
          alt="Online"
          size="lg"
          status="online"
        />
        <p className={styles.sizeLabel}>Online</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=3"
          alt="Away"
          size="lg"
          status="away"
        />
        <p className={styles.sizeLabel}>Away</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=4"
          alt="Busy"
          size="lg"
          status="busy"
        />
        <p className={styles.sizeLabel}>Busy</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar
          src="https://i.pravatar.cc/150?img=5"
          alt="Offline"
          size="lg"
          status="offline"
        />
        <p className={styles.sizeLabel}>Offline</p>
      </div>
    </div>
  ),
};
