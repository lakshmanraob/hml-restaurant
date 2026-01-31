# Typography System

## Overview
The HML Restaurant typography system uses modern, clean sans-serif fonts that are highly readable and convey professionalism while maintaining warmth and approachability.

## Font Families

### Headings: Poppins
**Font**: 'Poppins', sans-serif
**Characteristics**: Geometric, modern, friendly
**Usage**: All headings (H1-H6), hero text, section titles

```css
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Body: Inter
**Font**: 'Inter', sans-serif
**Characteristics**: Highly readable, optimized for screens
**Usage**: Body text, descriptions, labels, UI elements

```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

### Monospace: JetBrains Mono (Optional)
**Font**: 'JetBrains Mono', monospace
**Usage**: Code snippets, technical content, order numbers

```css
font-family: 'JetBrains Mono', 'Courier New', monospace;
```

## Type Scale

### Desktop Scale
| Element | Size | Weight | Line Height | Letter Spacing | Usage |
|---------|------|--------|-------------|----------------|-------|
| Display | 4.5rem (72px) | 800 | 1.1 | -0.02em | Hero headlines |
| H1 | 3.75rem (60px) | 700 | 1.15 | -0.015em | Page titles |
| H2 | 3rem (48px) | 700 | 1.2 | -0.01em | Section titles |
| H3 | 2.25rem (36px) | 600 | 1.25 | normal | Subsection titles |
| H4 | 1.875rem (30px) | 600 | 1.3 | normal | Card titles |
| H5 | 1.5rem (24px) | 600 | 1.35 | normal | Component titles |
| H6 | 1.25rem (20px) | 600 | 1.4 | normal | Small headings |
| Lead | 1.25rem (20px) | 400 | 1.6 | normal | Intro text |
| Body Large | 1.125rem (18px) | 400 | 1.6 | normal | Highlighted body |
| Body | 1rem (16px) | 400 | 1.5 | normal | Default body |
| Body Small | 0.875rem (14px) | 400 | 1.5 | normal | Secondary text |
| Caption | 0.75rem (12px) | 400 | 1.4 | 0.025em | Labels, captions |

### Mobile Scale (< 768px)
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| Display | 3rem (48px) | 800 | 1.15 | -0.015em |
| H1 | 2.5rem (40px) | 700 | 1.2 | -0.01em |
| H2 | 2rem (32px) | 700 | 1.25 | normal |
| H3 | 1.75rem (28px) | 600 | 1.3 | normal |
| H4 | 1.5rem (24px) | 600 | 1.35 | normal |
| H5 | 1.25rem (20px) | 600 | 1.4 | normal |
| H6 | 1.125rem (18px) | 600 | 1.4 | normal |

## Typography Styles

### Heading Styles

```tsx
// H1 - Page Title
className="font-heading text-5xl md:text-6xl font-bold leading-tight tracking-tight text-neutral-900"

// H2 - Section Title
className="font-heading text-3xl md:text-5xl font-bold leading-tight text-neutral-900"

// H3 - Subsection Title
className="font-heading text-2xl md:text-4xl font-semibold leading-snug text-neutral-800"

// H4 - Card Title
className="font-heading text-xl md:text-3xl font-semibold leading-snug text-neutral-800"

// H5 - Component Title
className="font-heading text-lg md:text-2xl font-semibold leading-normal text-neutral-800"

// H6 - Small Heading
className="font-heading text-base md:text-xl font-semibold leading-normal text-neutral-700"
```

### Body Styles

```tsx
// Lead Text
className="font-body text-lg md:text-xl font-normal leading-relaxed text-neutral-700"

// Body Large
className="font-body text-base md:text-lg font-normal leading-relaxed text-neutral-600"

// Body Default
className="font-body text-base font-normal leading-normal text-neutral-600"

// Body Small
className="font-body text-sm font-normal leading-normal text-neutral-500"

// Caption
className="font-body text-xs font-normal leading-snug tracking-wide text-neutral-500 uppercase"
```

### Special Styles

```tsx
// Price Display
className="font-heading text-2xl md:text-3xl font-bold text-neutral-900"

// Badge Text
className="font-body text-xs md:text-sm font-semibold tracking-wide uppercase"

// Button Text
className="font-body text-sm md:text-base font-semibold tracking-wide"

// Link Text
className="font-body text-base font-medium text-primary-600 hover:text-primary-700 underline-offset-4"
```

## Usage Guidelines

### Hierarchy
1. Use only one H1 per page
2. Don't skip heading levels (H1 → H2 → H3, not H1 → H3)
3. Maintain consistent hierarchy throughout the application
4. Use semantic HTML tags (`<h1>`, `<h2>`, etc.) for accessibility

### Readability
- **Optimal Line Length**: 50-75 characters (about 600px max-width for body text)
- **Line Height**: 1.5 for body, 1.2-1.3 for headings
- **Paragraph Spacing**: 1.5em between paragraphs
- **Alignment**: Left-aligned for LTR languages (never justify)

### Color Contrast
- Headings: `text-neutral-900` or `text-neutral-800`
- Body text: `text-neutral-700` or `text-neutral-600`
- Secondary text: `text-neutral-500` or `text-neutral-400`
- Ensure minimum 4.5:1 contrast ratio for body text
- Ensure minimum 3:1 contrast ratio for large text (18px+)

### Responsive Behavior
- Use responsive font sizes with `md:` and `lg:` prefixes
- Reduce font sizes by 20-30% on mobile
- Maintain readability at all breakpoints
- Adjust line height for smaller screens

## Component-Specific Typography

### Menu Item Card
- **Dish Name**: H4 (1.875rem, semibold)
- **Description**: Body Small (0.875rem)
- **Price**: 1.5rem, bold
- **Category Tag**: Caption (0.75rem, uppercase)

### Hero Section
- **Main Headline**: Display (4.5rem on desktop, 3rem on mobile)
- **Subheadline**: Lead (1.25rem)
- **CTA Text**: Body (1rem, semibold)

### Navigation
- **Nav Links**: Body (1rem, medium)
- **Dropdown Items**: Body Small (0.875rem)
- **Mobile Menu**: Body Large (1.125rem)

### Footer
- **Section Headings**: H6 (1.25rem, semibold)
- **Links**: Body Small (0.875rem)
- **Copyright**: Caption (0.75rem)

## Implementation Examples

### Tailwind CSS Classes

```tsx
// Create reusable text components
export const TextStyles = {
  h1: "font-heading text-5xl md:text-6xl font-bold leading-tight tracking-tight text-neutral-900",
  h2: "font-heading text-3xl md:text-5xl font-bold leading-tight text-neutral-900",
  h3: "font-heading text-2xl md:text-4xl font-semibold leading-snug text-neutral-800",
  h4: "font-heading text-xl md:text-3xl font-semibold leading-snug text-neutral-800",
  body: "font-body text-base font-normal leading-normal text-neutral-600",
  bodyLarge: "font-body text-base md:text-lg leading-relaxed text-neutral-600",
  bodySmall: "font-body text-sm leading-normal text-neutral-500",
  label: "font-body text-sm font-medium text-neutral-700",
  caption: "font-body text-xs leading-snug tracking-wide text-neutral-500",
};
```

### React Components

```tsx
export function Heading({ level = 1, children, className = "" }) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const styles = TextStyles[`h${level}` as keyof typeof TextStyles];

  return <Tag className={`${styles} ${className}`}>{children}</Tag>;
}

export function Text({ variant = "body", children, className = "" }) {
  const styles = TextStyles[variant as keyof typeof TextStyles];

  return <p className={`${styles} ${className}`}>{children}</p>;
}
```

## Accessibility Considerations

1. **Semantic HTML**: Always use proper heading tags
2. **Focus States**: Ensure text links have visible focus indicators
3. **Screen Readers**: Use `sr-only` class for screen reader-only text
4. **ARIA Labels**: Add aria-labels for icon-only buttons
5. **Language**: Set proper lang attribute on HTML tag
6. **Font Sizing**: Allow users to resize text up to 200%

## Performance

1. **Font Loading**: Use `font-display: swap` to prevent FOIT
2. **Subset Fonts**: Only load required character sets and weights
3. **Preload**: Preload critical fonts in `<head>`
4. **Variable Fonts**: Consider using variable fonts for better performance

```html
<link rel="preload" href="/fonts/poppins.woff2" as="font" type="font/woff2" crossorigin>
```
