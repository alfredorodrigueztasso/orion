/**
 * Command Component Stories
 */

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import {
  Calendar,
  Settings,
  User,
  Mail,
  Search,
  CreditCard,
  Moon,
  Sun,
  LogOut,
  FileText,
  Calculator,
  Smile,
} from "lucide-react";
import { Command } from "./Command";
import { Button } from "../Button/Button";

const meta: Meta<typeof Command> = {
  title: "Components/Overlays/Command",
  component: Command,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <Command.Input placeholder="Type a command or search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Suggestions">
            <Command.Item onSelect={() => console.log("Calendar")}>
              <Calendar size={16} /> Calendar
            </Command.Item>
            <Command.Item onSelect={() => console.log("Search")}>
              <Search size={16} /> Search Emoji
            </Command.Item>
            <Command.Item onSelect={() => console.log("Calculator")}>
              <Calculator size={16} /> Calculator
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Settings">
            <Command.Item onSelect={() => console.log("Profile")}>
              <User size={16} /> Profile
              <Command.Shortcut>⌘P</Command.Shortcut>
            </Command.Item>
            <Command.Item onSelect={() => console.log("Billing")}>
              <CreditCard size={16} /> Billing
              <Command.Shortcut>⌘B</Command.Shortcut>
            </Command.Item>
            <Command.Item onSelect={() => console.log("Settings")}>
              <Settings size={16} /> Settings
              <Command.Shortcut>⌘S</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};

export const WithDialog: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "var(--spacing-3)",
          }}
        >
          <Button variant="secondary" onClick={() => setOpen(true)}>
            <Search size={16} /> Open Command Palette
          </Button>
          <span
            style={{
              fontSize: "var(--font-size-13)",
              color: "var(--text-tertiary)",
            }}
          >
            Or press ⌘K
          </span>
        </div>
        <Command.Dialog open={open} onOpenChange={setOpen}>
          <Command.Input placeholder="Type a command or search..." />
          <Command.List>
            <Command.Empty>No results found.</Command.Empty>
            <Command.Group heading="Navigation">
              <Command.Item
                onSelect={() => {
                  console.log("Home");
                  setOpen(false);
                }}
              >
                <FileText size={16} /> Home
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  console.log("Mail");
                  setOpen(false);
                }}
              >
                <Mail size={16} /> Mail
                <Command.Shortcut>⌘M</Command.Shortcut>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  console.log("Calendar");
                  setOpen(false);
                }}
              >
                <Calendar size={16} /> Calendar
                <Command.Shortcut>⌘C</Command.Shortcut>
              </Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Theme">
              <Command.Item
                onSelect={() => {
                  console.log("Light");
                  setOpen(false);
                }}
              >
                <Sun size={16} /> Light Mode
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  console.log("Dark");
                  setOpen(false);
                }}
              >
                <Moon size={16} /> Dark Mode
              </Command.Item>
            </Command.Group>
            <Command.Separator />
            <Command.Group heading="Account">
              <Command.Item
                onSelect={() => {
                  console.log("Profile");
                  setOpen(false);
                }}
              >
                <User size={16} /> Profile
                <Command.Shortcut>⌘P</Command.Shortcut>
              </Command.Item>
              <Command.Item
                onSelect={() => {
                  console.log("Logout");
                  setOpen(false);
                }}
              >
                <LogOut size={16} /> Log out
              </Command.Item>
            </Command.Group>
          </Command.List>
        </Command.Dialog>
      </>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <Command.Input placeholder="Search actions..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Actions">
            <Command.Item onSelect={() => console.log("Profile")}>
              <User size={16} /> Edit Profile
            </Command.Item>
            <Command.Item disabled>
              <CreditCard size={16} /> Billing (unavailable)
            </Command.Item>
            <Command.Item onSelect={() => console.log("Settings")}>
              <Settings size={16} /> Settings
            </Command.Item>
            <Command.Item disabled>
              <Mail size={16} /> Invite Team (upgrade required)
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};

export const SearchFiltering: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <Command.Input placeholder="Try typing 'cal' or 'set'..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Apps">
            <Command.Item value="calendar events scheduling">
              <Calendar size={16} /> Calendar
            </Command.Item>
            <Command.Item value="calculator math numbers">
              <Calculator size={16} /> Calculator
            </Command.Item>
            <Command.Item value="settings preferences configuration">
              <Settings size={16} /> Settings
            </Command.Item>
            <Command.Item value="mail email messages inbox">
              <Mail size={16} /> Mail
            </Command.Item>
            <Command.Item value="emoji smileys reactions">
              <Smile size={16} /> Emoji Picker
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};

export const SimpleList: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <Command.Input placeholder="Search..." />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Item onSelect={() => console.log("1")}>
            Item One
          </Command.Item>
          <Command.Item onSelect={() => console.log("2")}>
            Item Two
          </Command.Item>
          <Command.Item onSelect={() => console.log("3")}>
            Item Three
          </Command.Item>
          <Command.Separator />
          <Command.Item onSelect={() => console.log("4")}>
            Item Four
          </Command.Item>
          <Command.Item onSelect={() => console.log("5")}>
            Item Five
          </Command.Item>
        </Command.List>
      </Command>
    </div>
  ),
};

export const MultipleGroups: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <Command>
        <Command.Input placeholder="What do you need?" />
        <Command.List>
          <Command.Empty>No results found.</Command.Empty>
          <Command.Group heading="Recently Used">
            <Command.Item>
              <FileText size={16} /> Quarterly Report
              <Command.Shortcut>2m ago</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Mail size={16} /> Team Standup
              <Command.Shortcut>1h ago</Command.Shortcut>
            </Command.Item>
          </Command.Group>
          <Command.Separator />
          <Command.Group heading="Quick Actions">
            <Command.Item>
              <Calendar size={16} /> Schedule Meeting
              <Command.Shortcut>⌘⇧M</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <User size={16} /> Invite Teammate
              <Command.Shortcut>⌘⇧I</Command.Shortcut>
            </Command.Item>
            <Command.Item>
              <Settings size={16} /> Preferences
              <Command.Shortcut>⌘,</Command.Shortcut>
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  ),
};
