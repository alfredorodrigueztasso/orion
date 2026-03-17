/**
 * Slider Component Stories
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./Slider";

const meta: Meta<typeof Slider> = {
  title: "Components/Forms/Slider",
  component: Slider,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "300px", padding: "var(--spacing-5)" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

// Interactive wrapper
const InteractiveSlider = (
  props: Partial<React.ComponentProps<typeof Slider>>,
) => {
  const [value, setValue] = useState(props.value ?? 50);

  return <Slider value={value} onChange={setValue} {...props} />;
};

export const Default: Story = {
  render: () => <InteractiveSlider />,
};

export const WithValue: Story = {
  render: () => <InteractiveSlider showValue />,
};

export const WithLabels: Story = {
  render: () => <InteractiveSlider showLabels />,
};

export const WithValueAndLabels: Story = {
  render: () => <InteractiveSlider showValue showLabels />,
};

export const WithTicks: Story = {
  render: () => <InteractiveSlider showTicks showLabels />,
};

export const CustomRange: Story = {
  render: () => (
    <InteractiveSlider min={-100} max={100} value={0} showValue showLabels />
  ),
};

export const SmallStep: Story = {
  render: () => (
    <InteractiveSlider
      min={0}
      max={1}
      step={0.01}
      value={0.5}
      showValue
      formatValue={(v) => v.toFixed(2)}
    />
  ),
};

export const LargeStep: Story = {
  render: () => (
    <InteractiveSlider
      min={0}
      max={100}
      step={10}
      value={50}
      showValue
      showTicks
      tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
    />
  ),
};

export const PercentageFormat: Story = {
  render: () => (
    <InteractiveSlider showValue showLabels formatValue={(v) => `${v}%`} />
  ),
};

export const CurrencyFormat: Story = {
  render: () => (
    <InteractiveSlider
      min={0}
      max={1000}
      value={500}
      showValue
      showLabels
      formatValue={(v) => `$${v}`}
    />
  ),
};

export const SmallSize: Story = {
  render: () => <InteractiveSlider size="sm" showValue />,
};

export const LargeSize: Story = {
  render: () => <InteractiveSlider size="lg" showValue />,
};

export const Disabled: Story = {
  args: {
    value: 50,
    onChange: () => {},
    disabled: true,
    showValue: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-8)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-14)",
          }}
        >
          Small
        </p>
        <InteractiveSlider size="sm" showValue />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-14)",
          }}
        >
          Medium (Default)
        </p>
        <InteractiveSlider size="md" showValue />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-2)",
            fontWeight: "var(--font-weight-medium)",
            fontSize: "var(--font-size-14)",
          }}
        >
          Large
        </p>
        <InteractiveSlider size="lg" showValue />
      </div>
    </div>
  ),
};

export const VolumeControl: Story = {
  render: () => {
    const [volume, setVolume] = useState(75);

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--spacing-3)",
            marginBottom: "var(--spacing-4)",
          }}
        >
          <span style={{ fontSize: "var(--font-size-24)" }}>🔊</span>
          <span style={{ fontWeight: "var(--font-weight-medium)" }}>
            {volume}%
          </span>
        </div>
        <Slider
          value={volume}
          onChange={setVolume}
          min={0}
          max={100}
          label="Volume"
          showTicks
          tickValues={[0, 25, 50, 75, 100]}
        />
      </div>
    );
  },
};

export const PriceRange: Story = {
  render: () => {
    const [price, setPrice] = useState(250);

    return (
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Max Price: ${price}
        </p>
        <Slider
          value={price}
          onChange={setPrice}
          min={0}
          max={500}
          step={10}
          showValue
          showLabels
          formatValue={(v) => `$${v}`}
          label="Maximum price"
        />
      </div>
    );
  },
};

export const TemperatureControl: Story = {
  render: () => {
    const [temp, setTemp] = useState(22);

    return (
      <div>
        <div style={{ textAlign: "center", marginBottom: "var(--spacing-4)" }}>
          <span
            style={{
              fontSize: "var(--font-size-48)",
              fontWeight: "var(--font-weight-bold)",
            }}
          >
            {temp}°
          </span>
          <p
            style={{
              color: "var(--text-secondary)",
              marginTop: "var(--spacing-1)",
            }}
          >
            {temp < 18 ? "❄️ Cold" : temp > 24 ? "🔥 Warm" : "✨ Comfortable"}
          </p>
        </div>
        <Slider
          value={temp}
          onChange={setTemp}
          min={15}
          max={30}
          step={0.5}
          showLabels
          formatValue={(v) => `${v}°C`}
          label="Temperature"
        />
      </div>
    );
  },
};
