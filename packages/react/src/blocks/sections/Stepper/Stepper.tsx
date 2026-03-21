"use client";

import React, { useState } from "react";
import type { StepperProps } from "./Stepper.types";
import styles from "./Stepper.module.css";

export const Stepper = React.forwardRef<HTMLElement, StepperProps>(
  (
    {
      steps,
      activeStep: activeStepProp = 0,
      orientation = "horizontal",
      onStepChange,
      showNavigation = true,
      className,
    },
    ref,
  ) => {
    const [activeStep, setActiveStep] = useState(activeStepProp);

    const handleStepChange = (index: number) => {
      setActiveStep(index);
      onStepChange?.(index);
    };

    const isVertical = orientation === "vertical";
    const isFirst = activeStep === 0;
    const isLast = activeStep === steps.length - 1;

    return (
      <section ref={ref} className={`${styles.section} ${className || ""}`}>
        <div
          className={isVertical ? styles.stepsVertical : styles.stepsHorizontal}
        >
          {steps.map((step, index) => {
            const isActive = index === activeStep;
            const isCompleted = index < activeStep;

            return (
              <React.Fragment key={step.id}>
                <div
                  className={`${styles.step} ${
                    isVertical ? styles.stepVertical : ""
                  }`}
                >
                  <div
                    className={`${styles.stepIndicator} ${
                      isActive ? styles.stepIndicatorActive : ""
                    } ${isCompleted ? styles.stepIndicatorCompleted : ""}`}
                  >
                    {isCompleted ? "\u2713" : index + 1}
                  </div>
                  <div className={styles.stepContent}>
                    <p
                      className={`${styles.stepLabel} ${
                        !isActive && !isCompleted
                          ? styles.stepLabelInactive
                          : ""
                      }`}
                    >
                      {step.label}
                    </p>
                    {step.description && (
                      <p className={styles.stepDescription}>
                        {step.description}
                      </p>
                    )}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`${styles.connector} ${
                      isCompleted ? styles.connectorCompleted : ""
                    } ${isVertical ? styles.connectorVertical : ""}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {showNavigation && (
          <div className={styles.navigation}>
            <button
              className={styles.navButton}
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={isFirst}
              type="button"
            >
              Previous
            </button>
            <button
              className={`${styles.navButton} ${
                !isLast ? styles.navButtonPrimary : ""
              }`}
              onClick={() => handleStepChange(activeStep + 1)}
              disabled={isLast}
              type="button"
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        )}
      </section>
    );
  },
);

Stepper.displayName = "Stepper";
