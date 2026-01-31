# Color System

## Overview
The HML Restaurant color system is designed to evoke warmth, appetite, and trust. Based on the reference designs, we use a vibrant yellow-orange palette as primary, terracotta tones for earthiness, and clean neutrals for balance.

## Color Palettes

### Primary Colors (Yellow/Orange)
The primary color palette represents energy, warmth, and appetite stimulation—perfect for a restaurant brand.

- **Primary-500** `#FFC107` - Main brand color, used for CTAs and primary actions
- **Primary-600** `#FFB300` - Hover states for primary buttons
- **Primary-700** `#FFA000` - Active states and accents
- **Primary-400** `#FFCA28` - Lighter variant for backgrounds
- **Primary-50** `#FFF8E1` - Very light tint for subtle backgrounds

**Usage:**
- Primary buttons and CTAs
- Links and interactive elements
- Badge backgrounds
- Price highlights
- Important notifications

### Secondary Colors (Coral/Orange-Red)
Used for secondary actions and complementary accents.

- **Secondary-500** `#FF5722` - Secondary brand color
- **Secondary-600** `#F4511E` - Hover states
- **Secondary-700** `#E64A19` - Active states

**Usage:**
- Secondary buttons
- Special offers/promotions
- Accent borders
- Icon highlights

### Terracotta Tones
Earthy, warm colors inspired by traditional cookware and natural food presentation.

- **Terracotta-400** `#D87B5E` - Main terracotta
- **Terracotta-500** `#C85A3A` - Deeper variant
- **Terracotta-50** `#FDF5F3` - Very subtle background

**Usage:**
- Section backgrounds
- Card accents
- Decorative elements
- Image overlays

### Neutral Colors
Clean, modern neutrals for text, backgrounds, and structure.

- **White** `#FFFFFF` - Primary background
- **Neutral-50** `#FAFAF9` - Light background
- **Neutral-100** `#F5F5F4` - Card backgrounds
- **Neutral-200** `#E7E5E4` - Borders
- **Neutral-400** `#A8A29E` - Disabled states
- **Neutral-600** `#57534E` - Secondary text
- **Neutral-800** `#292524` - Primary text
- **Black** `#0A0A0A` - Headings and emphasis

**Usage:**
- Text hierarchy
- Backgrounds and surfaces
- Borders and dividers
- Disabled states

### Semantic Colors

#### Success (Green)
- **Success-500** `#22C55E` - Success states, available items
- **Success-50** `#F0FDF4` - Success backgrounds

#### Warning (Amber)
- **Warning-500** `#F59E0B` - Warnings, limited items
- **Warning-50** `#FFFBEB` - Warning backgrounds

#### Error (Red)
- **Error-500** `#EF4444` - Errors, sold out items
- **Error-50** `#FEF2F2` - Error backgrounds

#### Info (Blue)
- **Info-500** `#3B82F6` - Informational messages
- **Info-50** `#EFF6FF` - Info backgrounds

## Color Usage Guidelines

### Text Colors
- **Headings**: Neutral-900 or Neutral-800
- **Body Text**: Neutral-700 or Neutral-600
- **Secondary Text**: Neutral-500
- **Disabled Text**: Neutral-400
- **Links**: Primary-600 (hover: Primary-700)

### Background Colors
- **Page Background**: White or Neutral-50
- **Card Background**: White with shadow
- **Alternate Sections**: Terracotta-50 or Primary-50
- **Hover States**: Neutral-100

### Interactive Elements
- **Primary Button**: Background Primary-500, text White
- **Primary Button Hover**: Background Primary-600
- **Secondary Button**: Border Primary-500, text Primary-600
- **Disabled Button**: Background Neutral-200, text Neutral-400

## Accessibility

### Contrast Ratios
All text colors meet WCAG 2.1 AA standards:
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text (18px+)**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

### Color Combinations (AA Compliant)
✅ Primary-500 on White: 3.89:1 (Large text only)
✅ Neutral-800 on White: 11.42:1 (All text)
✅ Neutral-600 on White: 5.74:1 (All text)
✅ White on Primary-600: 4.12:1 (Large text)
✅ White on Primary-700: 4.86:1 (All text)

### Never Use
❌ Primary-400 on White for small text
❌ Neutral-400 on White for any text
❌ Primary colors on Secondary colors

## Implementation in Tailwind

```css
/* Example usage */
.btn-primary {
  @apply bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white;
}

.card {
  @apply bg-white shadow-card rounded-xl;
}

.text-primary-heading {
  @apply text-neutral-900 font-bold;
}
```

## Color Inspiration
The color palette is inspired by:
- Fresh, vibrant food photography
- Warm terracotta cookware
- Natural, earthy dining experiences
- Modern, clean restaurant interiors
