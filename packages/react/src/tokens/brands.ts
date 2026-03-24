/**
 * Orion Design System - Brand Configuration
 *
 * Auto-generated from brands.json.
 * DO NOT EDIT MANUALLY - Run 'npm run build:tokens' to regenerate.
 */

import type { Brand, BrandConfig } from './types';

export const brands: Record<Brand, BrandConfig> = {
  "orion": {
    "name": "Orion",
    "description": "Default brand - Orion Blue, professional rounded corners",
    "accent": {
      "primary": "{color.brand.orion.500}",
      "light": "{color.brand.orion.100}",
      "dark": "{color.brand.orion.900}"
    },
    "typography": {
      "primary": "Libre Baskerville",
      "secondary": "Inter",
      "mono": "JetBrains Mono"
    },
    "geometry": {
      "radiusControl": "{radius.md}",
      "buttonStyle": "pill"
    },
    "semantic": {
      "light": {
        "interactivePrimary": "{color.brand.orion.500}",
        "interactivePrimaryHover": "{color.brand.orion.700}",
        "interactivePrimaryText": "{color.neutral.0}"
      },
      "dark": {
        "interactivePrimary": "{color.brand.orion.500}",
        "interactivePrimaryHover": "{color.brand.orion.400}",
        "interactivePrimaryText": "{color.neutral.0}"
      }
    },
    "usage": {
      "html": "<html data-theme=\"dark\">",
      "css": "/* No additional CSS needed - default */",
      "attribute": null
    }
  },
  "deepblue": {
    "name": "Deepblue",
    "description": "Deepblue brand - Deep Blue with Work Sans typography",
    "accent": {
      "primary": "{color.brand.deepblue.500}",
      "light": "{color.brand.deepblue.100}",
      "dark": "{color.brand.deepblue.800}"
    },
    "typography": {
      "primary": "Work Sans",
      "secondary": "Work Sans",
      "mono": "JetBrains Mono"
    },
    "geometry": {
      "radiusControl": "{radius.md}",
      "buttonStyle": "rounded"
    },
    "semantic": {
      "light": {
        "interactivePrimary": "{color.brand.deepblue.500}",
        "interactivePrimaryHover": "{color.brand.deepblue.700}",
        "interactivePrimaryText": "{color.neutral.0}"
      },
      "dark": {
        "interactivePrimary": "{color.brand.deepblue.500}",
        "interactivePrimaryHover": "{color.brand.deepblue.400}",
        "interactivePrimaryText": "{color.neutral.900}"
      }
    },
    "usage": {
      "html": "<html data-theme=\"dark\" data-brand=\"deepblue\">",
      "css": "/* Included in theme.css via [data-brand=\"deepblue\"] */",
      "attribute": "deepblue"
    }
  },
  "red": {
    "name": "Red",
    "description": "Red brand - Red with Poppins typography and pill buttons",
    "accent": {
      "primary": "{color.brand.red.500}",
      "light": "{color.brand.red.100}",
      "dark": "{color.brand.red.900}"
    },
    "typography": {
      "primary": "Poppins",
      "secondary": "Inter",
      "mono": "JetBrains Mono"
    },
    "geometry": {
      "radiusControl": "var(--radius-lg)",
      "buttonStyle": "pill"
    },
    "semantic": {
      "light": {
        "interactivePrimary": "{color.brand.red.500}",
        "interactivePrimaryHover": "{color.brand.red.600}",
        "interactivePrimaryText": "{color.neutral.0}"
      },
      "dark": {
        "interactivePrimary": "{color.brand.red.500}",
        "interactivePrimaryHover": "{color.brand.red.400}",
        "interactivePrimaryText": "{color.neutral.0}"
      }
    },
    "usage": {
      "html": "<html data-theme=\"dark\" data-brand=\"red\">",
      "css": "/* Included in theme.css via [data-brand=\"red\"] */",
      "attribute": "red"
    }
  },
  "orange": {
    "name": "Orange",
    "description": "Orange brand - Red-Orange with pill buttons",
    "accent": {
      "primary": "{color.brand.orange.500}",
      "light": "{color.brand.orange.100}",
      "dark": "{color.brand.orange.900}"
    },
    "typography": {
      "primary": "DM Sans",
      "secondary": "Inter",
      "mono": "JetBrains Mono"
    },
    "geometry": {
      "radiusControl": "{radius.full}",
      "buttonStyle": "pill"
    },
    "semantic": {
      "light": {
        "interactivePrimary": "{color.brand.orange.500}",
        "interactivePrimaryHover": "{color.brand.orange.700}",
        "interactivePrimaryText": "{color.neutral.0}"
      },
      "dark": {
        "interactivePrimary": "{color.brand.orange.500}",
        "interactivePrimaryHover": "{color.brand.orange.400}",
        "interactivePrimaryText": "{color.neutral.0}"
      }
    },
    "usage": {
      "html": "<html data-theme=\"dark\" data-brand=\"orange\">",
      "css": "/* Included in theme.css via [data-brand=\"orange\"] */",
      "attribute": "orange"
    }
  },
  "lemon": {
    "name": "Lemon",
    "description": "Lemon brand - Bright lime green with Anton typography and highly rounded design",
    "accent": {
      "primary": "{color.brand.lemon.600}",
      "light": "{color.brand.lemon.100}",
      "dark": "{color.brand.lemon.900}"
    },
    "typography": {
      "primary": "Anton",
      "secondary": "Work Sans",
      "mono": "JetBrains Mono"
    },
    "geometry": {
      "radiusControl": "{radius.lg}",
      "buttonStyle": "pill"
    },
    "semantic": {
      "light": {
        "interactivePrimary": "{color.brand.lemon.700}",
        "interactivePrimaryHover": "{color.brand.lemon.800}",
        "interactivePrimaryText": "{color.neutral.0}"
      },
      "dark": {
        "interactivePrimary": "{color.brand.lemon.500}",
        "interactivePrimaryHover": "{color.brand.lemon.600}",
        "interactivePrimaryText": "{color.neutral.900}"
      }
    },
    "usage": {
      "html": "<html data-theme=\"dark\" data-brand=\"lemon\">",
      "css": "/* Included in theme.css via [data-brand=\"lemon\"] */",
      "attribute": "lemon"
    }
  }
} as const;

export const defaultBrand: Brand = 'orion';
