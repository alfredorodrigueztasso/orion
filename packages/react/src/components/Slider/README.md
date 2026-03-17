# Slider

Range input for selecting numeric values.

## Props

| Prop            | Type                      | Default      | Description           |
| --------------- | ------------------------- | ------------ | --------------------- |
| `value`         | `number`                  | **required** | Current value         |
| `onChange`      | `(value: number) => void` | **required** | Value change callback |
| `min`           | `number`                  | `0`          | Minimum value         |
| `max`           | `number`                  | `100`        | Maximum value         |
| `step`          | `number`                  | `1`          | Step increment        |
| `size`          | `'sm' \| 'md' \| 'lg'`    | `'md'`       | Size variant          |
| `disabled`      | `boolean`                 | `false`      | Disabled state        |
| `showValue`     | `boolean`                 | `false`      | Show value tooltip    |
| `formatValue`   | `(value) => string`       | -            | Value format function |
| `showLabels`    | `boolean`                 | `false`      | Show min/max labels   |
| `showTicks`     | `boolean`                 | `false`      | Show tick marks       |
| `tickValues`    | `number[]`                | -            | Custom tick positions |
| `label`         | `string`                  | -            | Accessibility label   |
| `onChangeStart` | `() => void`              | -            | Drag start callback   |
| `onChangeEnd`   | `(value) => void`         | -            | Drag end callback     |

## Usage

### Basic

```tsx
import { Slider } from "@orion/react";
import { useState } from "react";

function Example() {
  const [value, setValue] = useState(50);

  return <Slider value={value} onChange={setValue} />;
}
```

### With Range

```tsx
<Slider value={value} onChange={setValue} min={0} max={200} />
```

### With Step

```tsx
// Step by 10
<Slider value={value} onChange={setValue} step={10} />

// Step by 0.1
<Slider value={value} onChange={setValue} min={0} max={1} step={0.1} />
```

### Show Value

```tsx
<Slider value={value} onChange={setValue} showValue />
```

### Custom Value Format

```tsx
// Percentage
<Slider
  value={value}
  onChange={setValue}
  showValue
  formatValue={(v) => `${v}%`}
/>

// Currency
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={1000}
  showValue
  formatValue={(v) => `$${v}`}
/>

// Temperature
<Slider
  value={value}
  onChange={setValue}
  min={60}
  max={90}
  showValue
  formatValue={(v) => `${v}°F`}
/>
```

### With Labels

```tsx
<Slider value={value} onChange={setValue} min={0} max={100} showLabels />
// Shows "0" and "100" at ends
```

### With Ticks

```tsx
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  step={25}
  showTicks
/>

// Custom tick positions
<Slider
  value={value}
  onChange={setValue}
  min={0}
  max={100}
  showTicks
  tickValues={[0, 25, 50, 75, 100]}
/>
```

### Sizes

```tsx
<Slider size="sm" value={value} onChange={setValue} />
<Slider size="md" value={value} onChange={setValue} />
<Slider size="lg" value={value} onChange={setValue} />
```

### Disabled

```tsx
<Slider value={50} onChange={() => {}} disabled />
```

### With Callbacks

```tsx
<Slider
  value={value}
  onChange={setValue}
  onChangeStart={() => console.log("Started dragging")}
  onChangeEnd={(finalValue) => {
    console.log("Finished at:", finalValue);
    saveToAPI(finalValue);
  }}
/>
```

### Volume Control

```tsx
import { Volume2, VolumeX } from "lucide-react";

function VolumeControl() {
  const [volume, setVolume] = useState(50);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <VolumeX size={20} />
      <Slider
        value={volume}
        onChange={setVolume}
        label="Volume"
        style={{ width: 150 }}
      />
      <Volume2 size={20} />
    </div>
  );
}
```

### Price Range Filter

```tsx
function PriceFilter() {
  const [price, setPrice] = useState(100);

  return (
    <div>
      <label>Max Price</label>
      <Slider
        value={price}
        onChange={setPrice}
        min={0}
        max={500}
        step={10}
        showValue
        formatValue={(v) => `$${v}`}
        showLabels
      />
    </div>
  );
}
```

## Tokens Used

- `--surface-subtle` - Track background
- `--interactive-primary` - Filled track, thumb
- `--interactive-primary-hover` - Thumb hover
- `--text-secondary` - Labels, value text
- `--border-subtle` - Tick marks
- `--spacing-2` - Label spacing

## Accessibility

- Uses native `<input type="range">`
- `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- `aria-label` or associated `<label>`
- Keyboard: Arrow keys adjust value
- Focus visible styles included
