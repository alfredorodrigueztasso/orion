"use client";

/**
 * Stepper Component
 *
 * A component to display progress through a multi-step process.
 *
 * @example
 * ```tsx
 * <Stepper
 *   steps={[
 *     { id: '1', title: 'Account', description: 'Create your account' },
 *     { id: '2', title: 'Profile', description: 'Set up your profile' },
 *     { id: '3', title: 'Complete', description: 'Review and finish' },
 *   ]}
 *   currentStep={1}
 * />
 * ```
 */

import { forwardRef, useCallback, useRef, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import type { StepperProps, StepProps, StepStatus } from "./Stepper.types";
import styles from "./Stepper.module.css";

/**
 * Individual Step Component
 */
const Step = ({
  step,
  index,
  status,
  size,
  showNumber,
  showCheckmark,
  clickable,
  onClick,
  labelPosition,
}: StepProps) => {
  const handleClick = useCallback(() => {
    if (clickable && !step.disabled && onClick) {
      onClick();
    }
  }, [clickable, step.disabled, onClick]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && clickable && !step.disabled) {
        e.preventDefault();
        onClick?.();
      }
    },
    [clickable, step.disabled, onClick],
  );

  const stepClasses = [
    styles.step,
    styles[status],
    styles[size],
    styles[`label-${labelPosition}`],
    clickable && !step.disabled && styles.clickable,
    step.disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(" ");

  const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

  const renderIndicator = () => {
    // Error state
    if (status === "error" || step.error) {
      return <AlertCircle size={iconSize} />;
    }

    // Custom icon
    if (step.icon) {
      return step.icon;
    }

    // Checkmark for completed
    if (status === "complete" && showCheckmark) {
      return <Check size={iconSize} />;
    }

    // Number
    if (showNumber) {
      return <span className={styles.number}>{index + 1}</span>;
    }

    return null;
  };

  return (
    <div
      className={stepClasses}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !step.disabled ? 0 : undefined}
      aria-current={status === "current" ? "step" : undefined}
      aria-disabled={step.disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.indicator}>{renderIndicator()}</div>

      <div className={styles.content}>
        <span className={styles.title}>
          {step.title}
          {step.optional && <span className={styles.optional}>(Optional)</span>}
        </span>
        {step.description && (
          <span className={styles.description}>{step.description}</span>
        )}
        {(step.error || status === "error") && step.errorMessage && (
          <span className={styles.errorMessage}>{step.errorMessage}</span>
        )}
      </div>
    </div>
  );
};

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep = 0,
      onStepClick,
      clickable = false,
      orientation = "horizontal",
      size = "md",
      showNumbers = true,
      showConnectors = true,
      showCheckmarks = true,
      labelPosition = "bottom",
      scrollable = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const listRef = useRef<HTMLOListElement>(null);

    // Auto-scroll to current step when scrollable is enabled
    useEffect(() => {
      if (scrollable && listRef.current) {
        const items = listRef.current.children;
        const currentItem = items[currentStep] as HTMLElement | undefined;
        if (currentItem) {
          currentItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }
    }, [currentStep, scrollable]);

    const getStepStatus = (index: number): StepStatus => {
      if (steps[index]?.error) return "error";
      if (index < currentStep) return "complete";
      if (index === currentStep) return "current";
      return "upcoming";
    };

    const handleStepClick = useCallback(
      (index: number) => {
        const step = steps[index];
        if (onStepClick && step && !step.disabled) {
          onStepClick(index, step);
        }
      },
      [onStepClick, steps],
    );

    const containerClasses = [
      styles.stepper,
      styles[orientation],
      styles[size],
      showConnectors && styles.withConnectors,
      scrollable && styles.scrollable,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="navigation"
        aria-label="Progress"
        {...rest}
      >
        <ol ref={listRef} className={styles.list}>
          {steps.map((step, index) => (
            <li key={step.id} className={styles.item}>
              <Step
                step={step}
                index={index}
                status={getStepStatus(index)}
                size={size}
                showNumber={showNumbers}
                showCheckmark={showCheckmarks}
                clickable={clickable}
                onClick={() => handleStepClick(index)}
                labelPosition={labelPosition}
              />
              {showConnectors && index < steps.length - 1 && (
                <div
                  className={`${styles.connector} ${index < currentStep ? styles.complete : ""}`}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
