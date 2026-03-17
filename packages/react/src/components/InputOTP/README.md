# InputOTP

A one-time password input with individual character slots, supporting numeric and alphanumeric modes.

## When to Use

| Scenario                        | Use InputOTP                           |
| ------------------------------- | -------------------------------------- |
| Two-factor authentication codes | ✅ Yes - designed for OTP entry        |
| Verification codes (SMS, email) | ✅ Yes - auto-advances between slots   |
| PIN entry                       | ✅ Yes - use type="numeric"            |
| General text input              | ❌ No - use Field instead              |
| Password input                  | ❌ No - use Field with type="password" |

## Props Reference

### InputOTP (Root)

| Prop         | Type                        | Default   | Description                    |
| ------------ | --------------------------- | --------- | ------------------------------ |
| maxLength    | number                      | —         | Number of OTP slots            |
| value        | string                      | —         | Controlled value               |
| defaultValue | string                      | —         | Default value (uncontrolled)   |
| onChange     | (value: string) => void     | —         | Value change callback          |
| onComplete   | (value: string) => void     | —         | Callback when all slots filled |
| type         | 'numeric' \| 'alphanumeric' | 'numeric' | Input type                     |
| size         | 'sm' \| 'md' \| 'lg'        | 'md'      | Slot size                      |
| disabled     | boolean                     | —         | Disable the input              |
| autoFocus    | boolean                     | —         | Auto-focus on mount            |

### InputOTP.Group

Groups slots visually. Accepts `children` (InputOTP.Slot elements).

### InputOTP.Slot

| Prop  | Type   | Default | Description          |
| ----- | ------ | ------- | -------------------- |
| index | number | —       | Slot index (0-based) |

### InputOTP.Separator

Visual separator between groups of slots.

## Examples

### Basic 6-Digit OTP

```tsx
import { InputOTP } from "@orion-ds/react";

<InputOTP maxLength={6} onComplete={handleVerify}>
  <InputOTP.Group>
    <InputOTP.Slot index={0} />
    <InputOTP.Slot index={1} />
    <InputOTP.Slot index={2} />
  </InputOTP.Group>
  <InputOTP.Separator />
  <InputOTP.Group>
    <InputOTP.Slot index={3} />
    <InputOTP.Slot index={4} />
    <InputOTP.Slot index={5} />
  </InputOTP.Group>
</InputOTP>;
```

### Alphanumeric with Controlled Value

```tsx
const [otp, setOtp] = useState("");

<InputOTP
  maxLength={4}
  type="alphanumeric"
  value={otp}
  onChange={setOtp}
  onComplete={(val) => console.log("Complete:", val)}
  size="lg"
>
  <InputOTP.Group>
    <InputOTP.Slot index={0} />
    <InputOTP.Slot index={1} />
    <InputOTP.Slot index={2} />
    <InputOTP.Slot index={3} />
  </InputOTP.Group>
</InputOTP>;
```

## Accessibility

- Each slot is focusable and keyboard navigable
- Arrow keys move between slots
- Backspace moves to previous slot
- Paste support fills all slots at once
- Screen reader announces slot position

## Token Usage

- `--surface-base` — Slot background
- `--border-subtle` — Slot border
- `--interactive-primary` — Active slot border
- `--text-primary` — Input text
- `--font-mono` — Monospace font for digits
- `--radius-control` — Slot border radius
- `--spacing-2` — Gap between slots
