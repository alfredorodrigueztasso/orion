"use client";

/**
 * LoginTemplate
 *
 * Clean and accessible authentication form for login functionality.
 * Includes email/password inputs with optional remember me and sign up links.
 *
 * @example
 * ```tsx
 * <LoginTemplate
 *   title="Sign in"
 *   onSubmit={handleLogin}
 *   onSignupClick={handleSignup}
 * />
 * ```
 */

import { forwardRef, useState, useCallback } from "react";
import { Card, Button, Field } from "@orion-ds/react";
import { Eye, EyeOff } from "lucide-react";
import type { LoginTemplateProps } from "./LoginTemplate.types";
import styles from "./LoginTemplate.module.css";

export const LoginTemplate = forwardRef<HTMLDivElement, LoginTemplateProps>(
  (
    {
      title = "Sign in",
      subtitle = "Welcome back",
      logo,
      onSubmit,
      isLoading = false,
      error,
      successMessage,
      onSignupClick,
      onForgotPasswordClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit?.(email, password, rememberMe);
      },
      [email, password, rememberMe, onSubmit],
    );

    const isDisabled = !email.trim() || !password.trim() || isLoading;

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...rest}
      >
        <Card className={styles.card}>
          <Card.Body className={styles.body}>
            {/* Logo */}
            {logo && <div className={styles.logo}>{logo}</div>}

            {/* Header */}
            <div className={styles.header}>
              <h1 className={styles.title}>{title}</h1>
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>

            {/* Messages */}
            {error && <div className={styles.error}>{error}</div>}
            {successMessage && (
              <div className={styles.success}>{successMessage}</div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <Field
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <div className={styles.passwordLabel}>
                  <label className={styles.label}>Password</label>
                  <button
                    type="button"
                    className={styles.showPasswordButton}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.input}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                  required
                />
              </div>

              <div className={styles.optionsRow}>
                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  className={styles.link}
                  onClick={onForgotPasswordClick}
                  disabled={isLoading}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                disabled={isDisabled}
              >
                Sign in
              </Button>
            </form>

            {/* Sign up link */}
            {onSignupClick && (
              <p className={styles.signupText}>
                Don't have an account?{" "}
                <button
                  type="button"
                  className={styles.link}
                  onClick={onSignupClick}
                  disabled={isLoading}
                >
                  Sign up
                </button>
              </p>
            )}
          </Card.Body>
        </Card>
      </div>
    );
  },
);

LoginTemplate.displayName = "LoginTemplate";
export default LoginTemplate;
