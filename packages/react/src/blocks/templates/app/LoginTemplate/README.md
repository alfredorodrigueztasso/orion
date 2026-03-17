# LoginTemplate (Template)

Clean authentication form for login functionality. Features email and password inputs with password visibility toggle, remember me checkbox, and optional sign up and forgot password links.

## When to Use

| Scenario | Use LoginTemplate |
|----------|------------------|
| Login page | ✅ Yes - complete auth form |
| Authentication flow | ✅ Yes - with remember me option |
| Gated application access | ✅ Yes - standalone login interface |
| Account signup page | ✅ Yes - can link to signup flow |
| Password reset flow | ✅ Yes - forgot password link |

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | "Sign in" | Form heading |
| subtitle | string | "Welcome back" | Optional subheading |
| logo | ReactNode | — | Logo/branding element |
| onSubmit | (email: string, password: string, rememberMe: boolean) => void | — | Form submission callback |
| isLoading | boolean | false | Loading state during auth |
| error | string | — | Error message display |
| successMessage | string | — | Success confirmation message |
| onSignupClick | () => void | — | Signup link callback |
| onForgotPasswordClick | () => void | — | Forgot password callback |
| className | string | — | Custom CSS class |

## Key Features

- **Email field** — With validation placeholder
- **Password field** — Hidden by default with show/hide toggle
- **Show password toggle** — Eye icon to reveal password
- **Remember me checkbox** — Persist login state
- **Forgot password link** — Password recovery option
- **Sign up link** — Redirect to registration
- **Error and success messages** — User feedback
- **Loading state** — Disabled inputs during submission
- **Logo section** — Optional branding
- **Form validation** — Submit disabled until filled

## Usage Example

```tsx
import { LoginTemplate } from "@orion-ds/react";

<LoginTemplate
  title="Sign in to Your Account"
  subtitle="Welcome back"
  logo={<Logo />}
  onSubmit={(email, password, rememberMe) => {
    console.log("Login:", { email, password, rememberMe });
    // Handle authentication
  }}
  onSignupClick={() => navigate("/signup")}
  onForgotPasswordClick={() => navigate("/forgot-password")}
  error={loginError}
  isLoading={isAuthenticating}
/>
```

## Component Composition

Built with:
- `Card` — Form container and layout
- `Button` — Submit action and links
- `Field` — Email input with validation
- Lucide Icons — Eye and EyeOff for password toggle
- HTML form elements — Input fields and checkboxes

## Accessibility

- All inputs have associated labels
- Password toggle has aria-label
- Form uses semantic HTML
- Submit button disabled until valid
- Error messages are announced
- Links are keyboard accessible
- Autocomplete hints for email/password

## Token Usage

- `--surface-base` — Card background
- `--surface-layer` — Form input backgrounds
- `--text-primary` — Labels and titles
- `--text-secondary` — Subtitle text
- `--interactive-primary` — Sign in button
- `--interactive-primary-text` — Button text
- `--border-subtle` — Input borders
- `--status-error` — Error message color
- `--status-success` — Success message color
- `--spacing-4` — Form field spacing
- `--radius-control` — Input field radius
