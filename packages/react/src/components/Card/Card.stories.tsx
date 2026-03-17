import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button";
import { Badge } from "../Badge";

const meta = {
  title: "Components/Data Display/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ============================================================================
 * VARIANT STORIES
 * ============================================================================ */

export const Default: Story = {
  render: () => (
    <Card style={{ width: "400px" }}>
      <Card.Header>Card Title</Card.Header>
      <Card.Body>
        <p>
          This is the card body content. Cards can contain any content you need.
        </p>
      </Card.Body>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card style={{ width: "400px" }}>
      <Card.Header>Product Details</Card.Header>
      <Card.Body>
        <p>Premium subscription plan with all features included.</p>
        <p
          style={{
            fontSize: "var(--font-size-24)",
            fontWeight: "var(--font-bold)",
            margin: "var(--spacing-4) 0",
          }}
        >
          $29.99/month
        </p>
      </Card.Body>
      <Card.Footer>
        <Button variant="primary" fullWidth>
          Subscribe Now
        </Button>
      </Card.Footer>
    </Card>
  ),
};

export const Elevated: Story = {
  render: () => (
    <Card variant="elevated" style={{ width: "400px" }}>
      <Card.Header>Elevated Card</Card.Header>
      <Card.Body>
        <p>This card has an elevated appearance with a subtle shadow.</p>
      </Card.Body>
    </Card>
  ),
};

export const Glass: Story = {
  render: () => (
    <div
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-400) 0%, var(--color-brand-600) 100%)",
        padding: "var(--spacing-8)",
        borderRadius: "var(--radius-container)",
      }}
    >
      <Card variant="glass" style={{ width: "400px" }}>
        <Card.Header>Glass Card</Card.Header>
        <Card.Body>
          <p>This card has a glassmorphism effect with backdrop blur.</p>
        </Card.Body>
      </Card>
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <Card style={{ width: "400px" }}>
      <Card.Header>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>Notification</span>
          <Badge variant="error">New</Badge>
        </div>
      </Card.Header>
      <Card.Body>
        <p>You have a new message waiting for you.</p>
      </Card.Body>
      <Card.Footer>
        <div style={{ display: "flex", gap: "var(--spacing-2)" }}>
          <Button variant="primary" size="sm">
            Read
          </Button>
          <Button variant="ghost" size="sm">
            Dismiss
          </Button>
        </div>
      </Card.Footer>
    </Card>
  ),
};

/* ============================================================================
 * IMAGE CARD STORIES
 * ============================================================================ */

export const ImageCard: Story = {
  render: () => (
    <Card
      variant="image"
      imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
      imagePosition="bottom"
      style={{ width: "400px" }}
    >
      <Card.ImageContent>
        <Card.ImageTitle>Mountain Adventure</Card.ImageTitle>
        <Card.ImageDescription>
          Discover breathtaking views and unforgettable experiences in the Swiss
          Alps.
        </Card.ImageDescription>
        <Card.ImageMeta>Photography • 5 min read</Card.ImageMeta>
      </Card.ImageContent>
    </Card>
  ),
};

export const ImageCardTop: Story = {
  render: () => (
    <Card
      variant="image"
      imageUrl="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800"
      imagePosition="top"
      style={{ width: "400px" }}
    >
      <Card.ImageContent>
        <Card.ImageMeta>Featured Article</Card.ImageMeta>
        <Card.ImageTitle>Ocean Sunset</Card.ImageTitle>
        <Card.ImageDescription>
          Experience the magic of coastal sunsets around the world.
        </Card.ImageDescription>
      </Card.ImageContent>
    </Card>
  ),
};

export const ImageCardCenter: Story = {
  render: () => (
    <Card
      variant="image"
      imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800"
      imagePosition="center"
      style={{ width: "400px" }}
    >
      <Card.ImageContent>
        <Card.ImageTitle>Starry Night</Card.ImageTitle>
        <Card.ImageDescription>
          A journey through the cosmos
        </Card.ImageDescription>
      </Card.ImageContent>
    </Card>
  ),
};

export const ImageCardSquare: Story = {
  render: () => (
    <Card
      variant="image"
      imageUrl="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800"
      imagePosition="bottom"
      aspectRatio="1/1"
      style={{ width: "300px" }}
    >
      <Card.ImageContent>
        <Card.ImageTitle>Forest Path</Card.ImageTitle>
        <Card.ImageDescription>Explore hidden trails</Card.ImageDescription>
      </Card.ImageContent>
    </Card>
  ),
};

export const ImageCardInteractive: Story = {
  render: () => (
    <Card
      variant="image"
      imageUrl="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800"
      imagePosition="bottom"
      interactive
      style={{ width: "400px", cursor: "pointer" }}
      onClick={() => alert("Card clicked!")}
    >
      <Card.ImageContent>
        <Card.ImageTitle>Click Me</Card.ImageTitle>
        <Card.ImageDescription>
          Interactive image cards respond to hover and click events.
        </Card.ImageDescription>
      </Card.ImageContent>
    </Card>
  ),
};

export const ImageCardGrid: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "var(--spacing-4)",
        maxWidth: "900px",
      }}
    >
      <Card
        variant="image"
        imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
        imagePosition="bottom"
        aspectRatio="4/3"
        interactive
      >
        <Card.ImageContent>
          <Card.ImageTitle>Mountains</Card.ImageTitle>
          <Card.ImageMeta>12 photos</Card.ImageMeta>
        </Card.ImageContent>
      </Card>
      <Card
        variant="image"
        imageUrl="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=400"
        imagePosition="bottom"
        aspectRatio="4/3"
        interactive
      >
        <Card.ImageContent>
          <Card.ImageTitle>Ocean</Card.ImageTitle>
          <Card.ImageMeta>8 photos</Card.ImageMeta>
        </Card.ImageContent>
      </Card>
      <Card
        variant="image"
        imageUrl="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400"
        imagePosition="bottom"
        aspectRatio="4/3"
        interactive
      >
        <Card.ImageContent>
          <Card.ImageTitle>Night Sky</Card.ImageTitle>
          <Card.ImageMeta>15 photos</Card.ImageMeta>
        </Card.ImageContent>
      </Card>
    </div>
  ),
};

/* ============================================================================
 * COMBINATION STORIES
 * ============================================================================ */

export const AllVariantsWithInverse: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "var(--spacing-4)",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <Card variant="base" style={{ width: "220px" }}>
          <Card.Header>Base</Card.Header>
          <Card.Body>Standard card style</Card.Body>
        </Card>
        <Card variant="elevated" style={{ width: "220px" }}>
          <Card.Header>Elevated</Card.Header>
          <Card.Body>With shadow</Card.Body>
        </Card>
        <div
          style={{
            padding: "var(--spacing-4)",
            borderRadius: "var(--radius-container)",
            background:
              "linear-gradient(135deg, var(--color-brand-400), var(--color-brand-600))",
          }}
        >
          <Card variant="glass" style={{ width: "220px" }}>
            <Card.Header>Glass</Card.Header>
            <Card.Body>Glassmorphism effect</Card.Body>
          </Card>
        </div>
        <Card
          variant="image"
          imageUrl="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400"
          imagePosition="bottom"
          style={{ width: "220px" }}
        >
          <Card.ImageContent>
            <Card.ImageTitle>Image</Card.ImageTitle>
            <Card.ImageDescription>With background image</Card.ImageDescription>
          </Card.ImageContent>
        </Card>
      </div>
      <div
        style={{
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-container)",
          background:
            "linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))",
        }}
      >
        <h3
          style={{
            color: "var(--color-neutral-0)",
            marginBottom: "var(--spacing-4)",
          }}
        >
          Inverse Variant (on dark background)
        </h3>
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-4)",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          <Card variant="inverse" style={{ width: "220px" }}>
            <Card.Header>Inverse</Card.Header>
            <Card.Body>For dark backgrounds</Card.Body>
          </Card>
          <Card variant="base" style={{ width: "220px" }}>
            <Card.Header>Base (Auto-switch)</Card.Header>
            <Card.Body>Becomes inverse on dark</Card.Body>
          </Card>
          <Card variant="elevated" style={{ width: "220px" }}>
            <Card.Header>Elevated (Auto-switch)</Card.Header>
            <Card.Body>Becomes inverse on dark</Card.Body>
          </Card>
        </div>
      </div>
    </div>
  ),
};
