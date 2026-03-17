/**
 * Stepper Component Stories
 *
 * Minimalist Linear-style stepper with clean, refined design.
 */

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { User, CreditCard, Package, CheckCircle, FileText } from "lucide-react";
import { Stepper } from "./Stepper";
import { Button } from "../Button";

const meta: Meta<typeof Stepper> = {
  title: "Components/Layout/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A minimalist stepper component inspired by Linear's design language. Features thin borders, subtle colors, and clean typography.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const basicSteps = [
  { id: "1", title: "Account" },
  { id: "2", title: "Profile" },
  { id: "3", title: "Review" },
  { id: "4", title: "Complete" },
];

const detailedSteps = [
  {
    id: "1",
    title: "Account Details",
    description: "Enter your email and password",
  },
  { id: "2", title: "Personal Info", description: "Tell us about yourself" },
  { id: "3", title: "Payment Method", description: "Add a payment method" },
  { id: "4", title: "Confirmation", description: "Review and submit" },
];

export const Default: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
  },
};

export const WithDescriptions: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-6)",
        }}
      >
        <Stepper
          steps={detailedSteps}
          currentStep={currentStep}
          clickable
          onStepClick={(index) => {
            if (index <= currentStep) {
              setCurrentStep(index);
            }
          }}
        />
        <div
          style={{
            display: "flex",
            gap: "var(--spacing-3)",
            justifyContent: "center",
          }}
        >
          <Button
            variant="secondary"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(
                Math.min(detailedSteps.length - 1, currentStep + 1),
              )
            }
            disabled={currentStep === detailedSteps.length - 1}
          >
            {currentStep === detailedSteps.length - 2 ? "Finish" : "Next"}
          </Button>
        </div>
      </div>
    );
  },
};

export const WithIcons: Story = {
  args: {
    steps: [
      { id: "1", title: "Account", icon: <User size={16} /> },
      { id: "2", title: "Payment", icon: <CreditCard size={16} /> },
      { id: "3", title: "Shipping", icon: <Package size={16} /> },
      { id: "4", title: "Complete", icon: <CheckCircle size={16} /> },
    ],
    currentStep: 2,
    showNumbers: false,
  },
};

export const Vertical: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
    orientation: "vertical",
  },
};

export const WithOptionalSteps: Story = {
  args: {
    steps: [
      { id: "1", title: "Basic Info", description: "Required information" },
      {
        id: "2",
        title: "Additional Details",
        description: "Extra information",
        optional: true,
      },
      { id: "3", title: "Review", description: "Check your information" },
    ],
    currentStep: 0,
  },
};

export const WithError: Story = {
  args: {
    steps: [
      { id: "1", title: "Account", description: "Email and password" },
      {
        id: "2",
        title: "Verification",
        description: "Verify your email",
        error: true,
        errorMessage: "Verification failed. Please try again.",
      },
      { id: "3", title: "Complete", description: "Finish setup" },
    ],
    currentStep: 1,
  },
};

export const SmallSize: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    size: "sm",
  },
};

export const LargeSize: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    size: "lg",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--spacing-10)",
      }}
    >
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            color: "var(--text-tertiary)",
            fontSize: "var(--font-size-12)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Small
        </p>
        <Stepper steps={basicSteps} currentStep={1} size="sm" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            color: "var(--text-tertiary)",
            fontSize: "var(--font-size-12)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Medium (Default)
        </p>
        <Stepper steps={basicSteps} currentStep={1} size="md" />
      </div>
      <div>
        <p
          style={{
            marginBottom: "var(--spacing-4)",
            color: "var(--text-tertiary)",
            fontSize: "var(--font-size-12)",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Large
        </p>
        <Stepper steps={basicSteps} currentStep={1} size="lg" />
      </div>
    </div>
  ),
};

export const NoNumbers: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    showNumbers: false,
  },
};

export const NoConnectors: Story = {
  args: {
    steps: basicSteps,
    currentStep: 2,
    showConnectors: false,
  },
};

export const LabelRight: Story = {
  args: {
    steps: detailedSteps,
    currentStep: 1,
    labelPosition: "right",
  },
};

export const AllCompleted: Story = {
  args: {
    steps: basicSteps,
    currentStep: basicSteps.length,
  },
};

export const WithDisabledSteps: Story = {
  args: {
    steps: [
      { id: "1", title: "Step 1" },
      { id: "2", title: "Step 2", disabled: true },
      { id: "3", title: "Step 3" },
      { id: "4", title: "Step 4", disabled: true },
    ],
    currentStep: 0,
    clickable: true,
  },
};

export const MobilePreview: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps = [
      { id: "1", title: "Account", description: "Create account" },
      { id: "2", title: "Profile", description: "Add your info" },
      { id: "3", title: "Verify", description: "Confirm email" },
      { id: "4", title: "Done", description: "All set!" },
    ];

    return (
      <div
        style={{
          maxWidth: "375px",
          margin: "0 auto",
          border: "1px solid var(--border-subtle)",
          borderRadius: "24px",
          overflow: "hidden",
          background: "var(--surface-base)",
        }}
      >
        {/* Phone notch */}
        <div
          style={{
            height: "44px",
            background: "var(--surface-base)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "28px",
              background: "var(--text-primary)",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "var(--spacing-4)" }}>
          <Stepper steps={steps} currentStep={currentStep} />

          {/* Current step info shown separately on mobile */}
          <div
            style={{
              marginTop: "var(--spacing-6)",
              padding: "var(--spacing-5)",
              background: "var(--surface-subtle)",
              borderRadius: "var(--radius-control)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-12)",
                color: "var(--text-tertiary)",
                marginBottom: "var(--spacing-1)",
              }}
            >
              Step {currentStep + 1} of {steps.length}
            </div>
            <h3
              style={{
                fontSize: "var(--font-size-18)",
                marginBottom: "var(--spacing-1)",
              }}
            >
              {steps[currentStep]?.title}
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-14)",
              }}
            >
              {steps[currentStep]?.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-3)",
              marginTop: "var(--spacing-4)",
            }}
          >
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              fullWidth
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 2 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "134px",
              height: "5px",
              background: "var(--text-tertiary)",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    );
  },
};

export const CheckoutWizard: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      { id: "cart", title: "Cart", icon: <Package size={14} /> },
      { id: "shipping", title: "Shipping", icon: <FileText size={14} /> },
      { id: "payment", title: "Payment", icon: <CreditCard size={14} /> },
      { id: "confirm", title: "Confirm", icon: <CheckCircle size={14} /> },
    ];

    const stepContent = [
      {
        title: "Review Cart",
        desc: "Review your shopping cart and make any changes.",
      },
      {
        title: "Shipping Address",
        desc: "Enter your shipping address for delivery.",
      },
      {
        title: "Payment Method",
        desc: "Add your payment information securely.",
      },
      { title: "Confirm Order", desc: "Review your order and place it." },
    ];

    return (
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        <Stepper steps={steps} currentStep={currentStep} showNumbers={false} />

        <div
          style={{
            marginTop: "var(--spacing-6)",
            padding: "var(--spacing-6)",
            background: "var(--surface-subtle)",
            borderRadius: "var(--radius-control)",
          }}
        >
          <div
            style={{ textAlign: "center", marginBottom: "var(--spacing-6)" }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--soft-brand)",
                color: "var(--text-brand)",
                marginBottom: "var(--spacing-3)",
              }}
            >
              {steps[currentStep]?.icon}
            </div>
            <h3 style={{ marginBottom: "var(--spacing-1)" }}>
              {stepContent[currentStep]?.title}
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-14)",
              }}
            >
              {stepContent[currentStep]?.desc}
            </p>
          </div>

          <div style={{ display: "flex", gap: "var(--spacing-3)" }}>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              fullWidth
              onClick={() =>
                currentStep < steps.length - 1
                  ? setCurrentStep(currentStep + 1)
                  : alert("Order placed!")
              }
            >
              {currentStep === steps.length - 1 ? "Place Order" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Scrollable Mobile - Shows the stepper with horizontal scrolling enabled for many steps.
 * Best viewed in mobile viewport. Labels stay visible and scroll with touch/drag.
 */
export const ScrollableMobile: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);

    const steps = [
      { id: "1", title: "Account", description: "Create account" },
      { id: "2", title: "Profile", description: "Add your info" },
      { id: "3", title: "Verification", description: "Verify email" },
      { id: "4", title: "Payment", description: "Add payment" },
      { id: "5", title: "Review", description: "Review details" },
      { id: "6", title: "Complete", description: "All done!" },
    ];

    return (
      <div
        style={{
          maxWidth: "375px",
          margin: "0 auto",
          border: "1px solid var(--border-subtle)",
          borderRadius: "24px",
          overflow: "hidden",
          background: "var(--surface-base)",
        }}
      >
        {/* Phone notch */}
        <div
          style={{
            height: "44px",
            background: "var(--surface-base)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "28px",
              background: "var(--text-primary)",
              borderRadius: "20px",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ padding: "var(--spacing-4)" }}>
          <p
            style={{
              fontSize: "var(--font-size-12)",
              color: "var(--text-tertiary)",
              marginBottom: "var(--spacing-3)",
              textAlign: "center",
            }}
          >
            Scrollable mode - swipe horizontally
          </p>

          <Stepper
            steps={steps}
            currentStep={currentStep}
            scrollable
            clickable
            onStepClick={(index) => setCurrentStep(index)}
          />

          {/* Current step info */}
          <div
            style={{
              marginTop: "var(--spacing-6)",
              padding: "var(--spacing-5)",
              background: "var(--surface-subtle)",
              borderRadius: "var(--radius-control)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "var(--font-size-12)",
                color: "var(--text-tertiary)",
                marginBottom: "var(--spacing-1)",
              }}
            >
              Step {currentStep + 1} of {steps.length}
            </div>
            <h3
              style={{
                fontSize: "var(--font-size-18)",
                marginBottom: "var(--spacing-1)",
              }}
            >
              {steps[currentStep]?.title}
            </h3>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "var(--font-size-14)",
              }}
            >
              {steps[currentStep]?.description}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "var(--spacing-3)",
              marginTop: "var(--spacing-4)",
            }}
          >
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button
              fullWidth
              onClick={() =>
                setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
              }
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === steps.length - 2 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>

        {/* Home indicator */}
        <div
          style={{
            height: "34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "134px",
              height: "5px",
              background: "var(--text-tertiary)",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>
    );
  },
};

/**
 * Scrollable Comparison - Compare scrollable vs default mode side by side
 */
export const ScrollableComparison: Story = {
  render: () => {
    const [step1, setStep1] = useState(2);
    const [step2, setStep2] = useState(2);

    const steps = [
      { id: "1", title: "Account", description: "Create account" },
      { id: "2", title: "Profile", description: "Add your info" },
      { id: "3", title: "Verification", description: "Verify email" },
      { id: "4", title: "Payment", description: "Add payment" },
      { id: "5", title: "Review", description: "Review details" },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-10)",
        }}
      >
        <div style={{ maxWidth: "375px" }}>
          <p
            style={{
              marginBottom: "var(--spacing-4)",
              color: "var(--text-tertiary)",
              fontSize: "var(--font-size-12)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Default (compressed on mobile)
          </p>
          <Stepper
            steps={steps}
            currentStep={step1}
            clickable
            onStepClick={(index) => setStep1(index)}
          />
        </div>

        <div style={{ maxWidth: "375px" }}>
          <p
            style={{
              marginBottom: "var(--spacing-4)",
              color: "var(--text-tertiary)",
              fontSize: "var(--font-size-12)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Scrollable (labels visible, swipe to see more)
          </p>
          <Stepper
            steps={steps}
            currentStep={step2}
            scrollable
            clickable
            onStepClick={(index) => setStep2(index)}
          />
        </div>
      </div>
    );
  },
};

/**
 * States Overview - Shows all status states in a clean presentation
 */
export const StatesOverview: Story = {
  render: () => {
    const statesSteps = [
      { id: "1", title: "Completed", description: "This step is done" },
      { id: "2", title: "Current", description: "You are here" },
      { id: "3", title: "Upcoming", description: "Not started yet" },
    ];

    const errorSteps = [
      { id: "1", title: "Account" },
      { id: "2", title: "Verification", error: true },
      { id: "3", title: "Complete" },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--spacing-10)",
        }}
      >
        <div>
          <p
            style={{
              marginBottom: "var(--spacing-4)",
              color: "var(--text-tertiary)",
              fontSize: "var(--font-size-12)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Standard States
          </p>
          <Stepper steps={statesSteps} currentStep={1} />
        </div>
        <div>
          <p
            style={{
              marginBottom: "var(--spacing-4)",
              color: "var(--text-tertiary)",
              fontSize: "var(--font-size-12)",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            With Error State
          </p>
          <Stepper steps={errorSteps} currentStep={1} />
        </div>
      </div>
    );
  },
};
