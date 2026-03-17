import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Radio } from "./Radio";

const meta = {
  title: "Components/Forms/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Radio size",
    },
    label: {
      control: "text",
      description: "Radio label",
    },
    helperText: {
      control: "text",
      description: "Helper text below radio",
    },
    error: {
      control: "text",
      description: "Error message",
    },
    disabled: {
      control: "boolean",
      description: "Disable radio",
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Default option",
    name: "demo",
    value: "default",
  },
};

export const Checked: Story = {
  args: {
    label: "Selected option",
    name: "demo",
    value: "selected",
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Pro Plan",
    helperText: "Recommended for teams",
    name: "plan",
    value: "pro",
  },
};

export const WithError: Story = {
  args: {
    label: "Required option",
    error: "This field is required",
    name: "required",
    value: "required",
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
    name: "disabled",
    value: "disabled",
  },
};

export const DisabledChecked: Story = {
  args: {
    label: "Disabled selected",
    disabled: true,
    checked: true,
    name: "disabled-checked",
    value: "disabled-checked",
    readOnly: true,
  },
};

export const SmallSize: Story = {
  args: {
    label: "Small radio",
    size: "sm",
    name: "size",
    value: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    label: "Large radio",
    size: "lg",
    name: "size",
    value: "lg",
  },
};

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState("free");

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-4)",
        }}
      >
        <Radio
          label="Free Plan"
          helperText="Basic features"
          name="plan"
          value="free"
          checked={selected === "free"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Pro Plan"
          helperText="Advanced features + support"
          name="plan"
          value="pro"
          checked={selected === "pro"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Enterprise"
          helperText="Custom solutions"
          name="plan"
          value="enterprise"
          checked={selected === "enterprise"}
          onChange={(e) => setSelected(e.target.value)}
        />
        <p
          style={{
            marginTop: "var(--spacing-4)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          Selected: <strong>{selected}</strong>
        </p>
      </div>
    );
  },
};

export const PaymentMethodSelector: Story = {
  render: () => {
    const [method, setMethod] = useState("card");

    return (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Payment Method
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <Radio
            label="Credit Card"
            helperText="Visa, Mastercard, Amex"
            name="payment"
            value="card"
            checked={method === "card"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <Radio
            label="PayPal"
            helperText="Pay with your PayPal account"
            name="payment"
            value="paypal"
            checked={method === "paypal"}
            onChange={(e) => setMethod(e.target.value)}
          />
          <Radio
            label="Bank Transfer"
            helperText="Direct bank transfer (2-3 days)"
            name="payment"
            value="bank"
            checked={method === "bank"}
            onChange={(e) => setMethod(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

export const DeliveryOptions: Story = {
  render: () => {
    const [delivery, setDelivery] = useState("standard");

    return (
      <div
        style={{
          width: "450px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Delivery Speed
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-6)",
          }}
        >
          <Radio
            label="Standard Delivery - Free"
            helperText="Arrives in 5-7 business days"
            name="delivery"
            value="standard"
            checked={delivery === "standard"}
            onChange={(e) => setDelivery(e.target.value)}
          />
          <Radio
            label="Express Delivery - $9.99"
            helperText="Arrives in 2-3 business days"
            name="delivery"
            value="express"
            checked={delivery === "express"}
            onChange={(e) => setDelivery(e.target.value)}
          />
          <Radio
            label="Next Day Delivery - $19.99"
            helperText="Order before 2pm for next day delivery"
            name="delivery"
            value="nextday"
            checked={delivery === "nextday"}
            onChange={(e) => setDelivery(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

export const SurveyQuestion: Story = {
  render: () => {
    const [rating, setRating] = useState("");

    return (
      <div
        style={{
          width: "500px",
          padding: "var(--spacing-8)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-2)",
            fontSize: "var(--font-size-18)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Customer Satisfaction Survey
        </h3>
        <p
          style={{
            marginBottom: "var(--spacing-8)",
            fontSize: "var(--font-size-14)",
            color: "var(--text-secondary)",
          }}
        >
          How satisfied are you with our service?
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
          }}
        >
          <Radio
            label="Very Satisfied"
            name="satisfaction"
            value="5"
            checked={rating === "5"}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            label="Satisfied"
            name="satisfaction"
            value="4"
            checked={rating === "4"}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            label="Neutral"
            name="satisfaction"
            value="3"
            checked={rating === "3"}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            label="Dissatisfied"
            name="satisfaction"
            value="2"
            checked={rating === "2"}
            onChange={(e) => setRating(e.target.value)}
          />
          <Radio
            label="Very Dissatisfied"
            name="satisfaction"
            value="1"
            checked={rating === "1"}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        {rating && (
          <div
            style={{
              marginTop: "var(--spacing-6)",
              padding: "var(--spacing-4)",
              borderRadius: "var(--radius-sm)",
              background: "var(--surface-subtle)",
              fontSize: "var(--font-size-14)",
            }}
          >
            Thank you for your feedback! (Rating: {rating}/5)
          </div>
        )}
      </div>
    );
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
      <Radio label="Small radio" size="sm" name="size" value="sm" />
      <Radio label="Medium radio (default)" size="md" name="size" value="md" />
      <Radio label="Large radio" size="lg" name="size" value="lg" />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-6)",
      }}
    >
      <Radio label="Unchecked (default)" name="state" value="1" />
      <Radio label="Checked" name="state" value="2" defaultChecked />
      <Radio
        label="With helper text"
        helperText="Additional information"
        name="state"
        value="3"
      />
      <Radio label="Disabled unchecked" disabled name="state" value="4" />
      <Radio
        label="Disabled checked"
        disabled
        checked
        name="state"
        value="5"
        readOnly
      />
      <Radio
        label="With error"
        error="This field is required"
        name="state"
        value="6"
      />
    </div>
  ),
};

export const CompactLayout: Story = {
  render: () => (
    <div
      style={{
        width: "300px",
        padding: "var(--spacing-6)",
        borderRadius: "var(--radius-control)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <h3
        style={{
          marginBottom: "var(--spacing-4)",
          fontSize: "var(--font-size-16)",
          fontWeight: "var(--font-weight-medium)",
        }}
      >
        Select Language
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-3)",
        }}
      >
        <Radio
          label="English"
          size="sm"
          name="language"
          value="en"
          defaultChecked
        />
        <Radio label="Español" size="sm" name="language" value="es" />
        <Radio label="Français" size="sm" name="language" value="fr" />
        <Radio label="Deutsch" size="sm" name="language" value="de" />
        <Radio label="日本語" size="sm" name="language" value="ja" />
      </div>
    </div>
  ),
};

export const WithValidation: Story = {
  render: () => {
    const [selected, setSelected] = useState("");
    const [showError, setShowError] = useState(false);

    const handleSubmit = () => {
      if (!selected) {
        setShowError(true);
      } else {
        setShowError(false);
        alert(`Selected: ${selected}`);
      }
    };

    return (
      <div
        style={{
          width: "400px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Select Your Plan
        </h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "var(--spacing-4)",
            marginBottom: "var(--spacing-6)",
          }}
        >
          <Radio
            label="Free Plan"
            name="plan"
            value="free"
            checked={selected === "free"}
            onChange={(e) => {
              setSelected(e.target.value);
              setShowError(false);
            }}
            error={showError ? "Please select a plan" : ""}
          />
          <Radio
            label="Pro Plan"
            name="plan"
            value="pro"
            checked={selected === "pro"}
            onChange={(e) => {
              setSelected(e.target.value);
              setShowError(false);
            }}
          />
          <Radio
            label="Enterprise"
            name="plan"
            value="enterprise"
            checked={selected === "enterprise"}
            onChange={(e) => {
              setSelected(e.target.value);
              setShowError(false);
            }}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            padding: "var(--spacing-3) var(--spacing-6)",
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: "var(--interactive-primary)",
            color: "var(--surface-base)",
            fontSize: "var(--font-size-14)",
            fontWeight: "var(--font-weight-medium)",
            cursor: "pointer",
          }}
        >
          Continue
        </button>
      </div>
    );
  },
};

export const HorizontalLayout: Story = {
  render: () => {
    const [size, setSize] = useState("M");

    return (
      <div
        style={{
          width: "450px",
          padding: "var(--spacing-6)",
          borderRadius: "var(--radius-control)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <h3
          style={{
            marginBottom: "var(--spacing-6)",
            fontSize: "var(--font-size-16)",
            fontWeight: "var(--font-weight-medium)",
          }}
        >
          Select Size
        </h3>
        <div
          style={{ display: "flex", gap: "var(--spacing-6)", flexWrap: "wrap" }}
        >
          <Radio
            label="XS"
            name="size"
            value="XS"
            checked={size === "XS"}
            onChange={(e) => setSize(e.target.value)}
          />
          <Radio
            label="S"
            name="size"
            value="S"
            checked={size === "S"}
            onChange={(e) => setSize(e.target.value)}
          />
          <Radio
            label="M"
            name="size"
            value="M"
            checked={size === "M"}
            onChange={(e) => setSize(e.target.value)}
          />
          <Radio
            label="L"
            name="size"
            value="L"
            checked={size === "L"}
            onChange={(e) => setSize(e.target.value)}
          />
          <Radio
            label="XL"
            name="size"
            value="XL"
            checked={size === "XL"}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
      </div>
    );
  },
};

export const WithCustomStyling: Story = {
  args: {
    label: "Custom styled radio",
    helperText: "This radio has custom styling",
    className: "custom-radio",
    name: "custom",
    value: "custom",
  },
};
