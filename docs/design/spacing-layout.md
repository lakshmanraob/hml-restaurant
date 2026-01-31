# Spacing & Layout Guide

## Overview
Consistent spacing creates visual harmony and improves usability. The HML Restaurant design system uses a 4px base unit system for all spacing decisions.

---

## Spacing Scale

### Base Unit System
All spacing values are multiples of **4px** for pixel-perfect alignment and consistency.

| Token | Value | Tailwind Class | Usage |
|-------|-------|----------------|-------|
| 0 | 0px | `p-0`, `m-0` | No spacing |
| 1 | 4px | `p-1`, `m-1` | Minimal spacing, icon gaps |
| 2 | 8px | `p-2`, `m-2` | Tight spacing, badges |
| 3 | 12px | `p-3`, `m-3` | Small spacing, button padding |
| 4 | 16px | `p-4`, `m-4` | Default spacing, card padding |
| 5 | 20px | `p-5`, `m-5` | Medium spacing |
| 6 | 24px | `p-6`, `m-6` | Large spacing, section padding |
| 8 | 32px | `p-8`, `m-8` | Extra large spacing |
| 10 | 40px | `p-10`, `m-10` | Section spacing |
| 12 | 48px | `p-12`, `m-12` | Large section spacing |
| 16 | 64px | `p-16`, `m-16` | Major section spacing |
| 20 | 80px | `p-20`, `m-20` | Hero section spacing |
| 24 | 96px | `p-24`, `m-24` | Large hero spacing |

---

## Layout System

### Container
The container is the foundation of page layouts, providing consistent max-width and horizontal padding.

```tsx
<div className="max-w-7xl mx-auto px-6 lg:px-12">
  {/* Content */}
</div>
```

**Specifications:**
- **Max Width**: 1280px (`max-w-7xl`)
- **Mobile Padding**: 24px (`px-6`)
- **Desktop Padding**: 48px (`lg:px-12`)
- **Centered**: `mx-auto`

### Grid System

#### Card Grids
Used for menu items, features, team members, etc.

```tsx
{/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

{/* 4 column grid for smaller cards */}
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
  {items.map(item => <SmallCard key={item.id} {...item} />)}
</div>
```

**Gap Sizes:**
- **Small Cards**: 16px mobile (`gap-4`), 24px desktop (`md:gap-6`)
- **Large Cards**: 24px all sizes (`gap-6`)
- **Feature Sections**: 32px (`gap-8`)

#### Two-Column Layouts
For content-image splits, form layouts.

```tsx
{/* 50/50 split on desktop, stacked on mobile */}
<div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
  <div>{/* Content */}</div>
  <div>{/* Image or form */}</div>
</div>

{/* 60/40 split */}
<div className="grid md:grid-cols-5 gap-8 lg:gap-12">
  <div className="md:col-span-3">{/* Main content */}</div>
  <div className="md:col-span-2">{/* Sidebar */}</div>
</div>
```

---

## Component Spacing

### Card Internal Spacing

#### Menu Item Card
```tsx
<div className="card overflow-hidden">
  {/* Image - no padding, bleeds to edges */}
  <div className="relative h-60">
    <img className="w-full h-full object-cover" />
  </div>

  {/* Content - 24px padding on desktop, 16px mobile */}
  <div className="p-4 md:p-6">
    {/* Badge - 8px margin bottom */}
    <span className="mb-2">Category</span>

    {/* Heading - 12px margin top */}
    <h4 className="mt-3">Dish Name</h4>

    {/* Description - 8px margin top */}
    <p className="mt-2">Description...</p>

    {/* Price/CTA - 16px margin top */}
    <div className="mt-4 flex justify-between">
      <span>$35.00</span>
      <button>Add to Cart</button>
    </div>
  </div>
</div>
```

**Pattern:**
- Content padding: 16-24px
- Element spacing: 8-12px between elements
- Action spacing: 16px before CTAs

### Button Spacing

```tsx
{/* Button internal padding */}
<button className="px-6 py-3 md:px-8 md:py-3.5">
  {/* Mobile: 24px horizontal, 12px vertical */}
  {/* Desktop: 32px horizontal, 14px vertical */}
</button>

{/* Button groups */}
<div className="flex gap-4">
  <button>Primary</button>
  <button>Secondary</button>
</div>
```

### Form Spacing

```tsx
<form className="space-y-6">
  {/* Each form group has 24px spacing */}
  <div className="space-y-2">
    <label>Email</label>
    <input className="px-4 py-3" />
    <p className="text-sm">Helper text</p>
  </div>

  <div className="space-y-2">
    <label>Password</label>
    <input className="px-4 py-3" />
  </div>

  <button className="w-full">Submit</button>
</form>
```

**Pattern:**
- Form group spacing: 24px (`space-y-6`)
- Label-input spacing: 8px (`space-y-2`)
- Input padding: 16px horizontal, 12px vertical
- Button top margin: 24px

---

## Section Spacing

### Vertical Section Spacing

```tsx
{/* Mobile: 48px vertical, Desktop: 80px vertical */}
<section className="py-12 md:py-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    {/* Section content */}
  </div>
</section>

{/* Larger sections (Hero, major features) */}
<section className="py-16 md:py-24">
  {/* Content */}
</section>

{/* Extra large sections */}
<section className="py-20 md:py-32">
  {/* Content */}
</section>
```

**Guidelines:**
- **Standard Section**: 48px mobile, 80px desktop
- **Large Section**: 64px mobile, 96px desktop
- **Hero Section**: 80px mobile, 128px desktop

### Section Inner Spacing

```tsx
<section className="py-12 md:py-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    {/* Section header - 48px margin bottom */}
    <div className="text-center mb-12">
      <h2>Section Title</h2>
      <p className="mt-4">Section description</p>
    </div>

    {/* Section content */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Cards */}
    </div>
  </div>
</section>
```

**Pattern:**
- Section header bottom margin: 48px (`mb-12`)
- Title-description spacing: 16px (`mt-4`)

---

## Navigation Spacing

### Desktop Navigation

```tsx
<nav className="h-20 px-6 lg:px-12">
  <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
    {/* Logo */}
    <div className="h-10">Logo</div>

    {/* Nav links - 32px gap */}
    <div className="flex gap-8">
      <a href="#">Link 1</a>
      <a href="#">Link 2</a>
      <a href="#">Link 3</a>
    </div>

    {/* CTA */}
    <button>Order Now</button>
  </div>
</nav>
```

**Specifications:**
- **Nav Height**: 80px (`h-20`)
- **Link Spacing**: 32px (`gap-8`)
- **Logo Height**: 40px (`h-10`)

### Mobile Navigation

```tsx
<nav className="h-16 px-4">
  <div className="flex items-center justify-between h-full">
    <div className="h-8">Logo</div>
    <button className="w-10 h-10">Menu</button>
  </div>
</nav>

{/* Mobile menu drawer */}
<div className="p-6">
  <div className="space-y-4">
    <a href="#" className="block py-3">Link 1</a>
    <a href="#" className="block py-3">Link 2</a>
    <a href="#" className="block py-3">Link 3</a>
  </div>
</div>
```

**Specifications:**
- **Mobile Nav Height**: 64px (`h-16`)
- **Menu Item Spacing**: 16px (`space-y-4`)
- **Menu Item Padding**: 12px vertical (`py-3`)

---

## Footer Spacing

```tsx
<footer className="bg-neutral-900 py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    {/* Footer columns - 32px gap */}
    <div className="grid md:grid-cols-4 gap-8">
      <div>
        <img className="h-10 mb-4" src="/logo.svg" />
        <p className="text-sm">Description</p>
      </div>
      {/* More columns */}
    </div>

    {/* Bottom bar - 48px top spacing */}
    <div className="border-t border-neutral-800 mt-12 pt-8 text-center">
      <p className="text-sm">&copy; 2024 HML Restaurant</p>
    </div>
  </div>
</footer>
```

**Pattern:**
- Footer padding: 48px mobile, 64px desktop
- Column gap: 32px
- Bottom bar top margin: 48px
- Bottom bar top padding: 32px

---

## Modal/Dialog Spacing

```tsx
<div className="fixed inset-0 flex items-center justify-center p-4">
  <div className="bg-white rounded-2xl p-6 max-w-md w-full">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3>Modal Title</h3>
      <button className="w-8 h-8">×</button>
    </div>

    {/* Content - 16px spacing between elements */}
    <div className="space-y-4">
      <p>Modal content...</p>
    </div>

    {/* Actions - 24px top margin */}
    <div className="flex gap-3 mt-6">
      <button className="flex-1">Cancel</button>
      <button className="flex-1">Confirm</button>
    </div>
  </div>
</div>
```

**Pattern:**
- Modal padding: 24px
- Content spacing: 16px
- Actions top margin: 24px
- Button gap: 12px

---

## Responsive Spacing Patterns

### Scale Down on Mobile

```tsx
{/* Large desktop spacing that scales down */}
<div className="space-y-8 md:space-y-12 lg:space-y-16">
  {/* Mobile: 32px, Tablet: 48px, Desktop: 64px */}
</div>

{/* Padding that scales */}
<div className="p-4 md:p-6 lg:p-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>
```

### Responsive Gaps

```tsx
{/* Grid gaps that scale */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
  {/* Mobile: 16px, Tablet: 24px, Desktop: 32px */}
</div>
```

---

## Common Spacing Patterns

### Hero Section
```tsx
<section className="py-12 md:py-20 lg:py-24">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Content & Image */}
    </div>
  </div>
</section>
```

### Content Section
```tsx
<section className="py-12 md:py-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-5xl font-bold">Title</h2>
      <p className="text-lg text-neutral-600 mt-4">Subtitle</p>
    </div>
    <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
      {/* Cards */}
    </div>
  </div>
</section>
```

### CTA Section
```tsx
<section className="bg-primary-50 py-16 md:py-24">
  <div className="max-w-3xl mx-auto text-center px-6">
    <h2 className="text-3xl md:text-5xl font-bold">Call to Action</h2>
    <p className="text-lg mt-4">Supporting text</p>
    <div className="flex flex-wrap justify-center gap-4 mt-8">
      <button>Primary CTA</button>
      <button>Secondary CTA</button>
    </div>
  </div>
</section>
```

---

## Best Practices

### Do's ✅
- Use the 4px base unit system consistently
- Maintain consistent spacing within component types
- Scale spacing appropriately for mobile
- Use Tailwind's spacing utilities (`p-`, `m-`, `gap-`, `space-`)
- Group related elements with tighter spacing
- Separate sections with generous spacing

### Don'ts ❌
- Don't use arbitrary spacing values (stick to the scale)
- Don't mix padding and margin inconsistently
- Don't create overly cramped layouts on mobile
- Don't ignore responsive spacing adjustments
- Don't use negative margins to fix spacing issues
- Don't over-complicate with too many spacing variations

---

## Spacing Quick Reference

| Use Case | Mobile | Desktop | Tailwind Classes |
|----------|--------|---------|------------------|
| Button padding | 12px/24px | 14px/32px | `px-6 py-3 md:px-8 md:py-3.5` |
| Card padding | 16px | 24px | `p-4 md:p-6` |
| Card gap | 24px | 24-32px | `gap-6 lg:gap-8` |
| Form spacing | 24px | 24px | `space-y-6` |
| Section padding | 48px | 80px | `py-12 md:py-20` |
| Section header margin | 48px | 48px | `mb-12` |
| Container padding | 24px | 48px | `px-6 lg:px-12` |
| Element spacing | 8-16px | 8-16px | `space-y-2` to `space-y-4` |

---

**Remember**: Consistent spacing creates visual rhythm and improves the overall user experience. When in doubt, refer to this guide and use the established spacing scale.
