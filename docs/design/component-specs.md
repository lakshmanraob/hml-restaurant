# Component Specifications

## Overview
This document defines the specifications for all UI components in the HML Restaurant application, based on the reference designs and design system tokens.

---

## 1. Button Component

### Variants

#### Primary Button
**Purpose**: Main call-to-action buttons (Order Now, Add to Cart, Reserve Table)

**Specifications:**
- **Background**: `primary-500` (#FFC107)
- **Text**: White, 14px/16px, semibold, uppercase
- **Padding**: 12px 24px (mobile), 14px 32px (desktop)
- **Border Radius**: 8px (rounded-lg)
- **Height**: 44px (mobile), 48px (desktop)
- **Min Width**: 120px
- **Shadow**: `shadow-md`
- **Transition**: all 200ms ease

**States:**
- **Hover**: `primary-600`, `shadow-lg`, scale(1.02)
- **Active**: `primary-700`, `shadow-sm`, scale(0.98)
- **Disabled**: `neutral-200`, `text-neutral-400`, cursor-not-allowed
- **Loading**: Spinner icon, disabled state

```tsx
<button className="bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 uppercase tracking-wide disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed">
  Order Now
</button>
```

#### Secondary Button
**Purpose**: Secondary actions (View Menu, Learn More)

**Specifications:**
- **Background**: Transparent or White
- **Text**: `primary-600`, 14px/16px, semibold
- **Border**: 2px solid `primary-500`
- **Padding**: 12px 24px (mobile), 14px 32px (desktop)
- **Border Radius**: 8px

**States:**
- **Hover**: `primary-50` background, `primary-700` text
- **Active**: `primary-100` background

```tsx
<button className="bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100 font-semibold text-sm md:text-base px-6 md:px-8 py-3 rounded-lg transition-all duration-200 uppercase tracking-wide">
  View Menu
</button>
```

#### Icon Button
**Purpose**: Icon-only actions (Favorite, Share, Close)

**Specifications:**
- **Size**: 40px × 40px (mobile), 44px × 44px (desktop)
- **Icon Size**: 20px × 20px
- **Background**: Transparent or `neutral-100`
- **Border Radius**: 8px or full (rounded-full)
- **Padding**: Equal on all sides

```tsx
<button className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors duration-200">
  <HeartIcon className="w-5 h-5 text-neutral-600" />
</button>
```

---

## 2. Card Component

### Menu Item Card
**Purpose**: Display menu items with image, details, and actions

**Specifications:**
- **Width**: Full width (mobile), 280-320px (desktop grid)
- **Background**: White
- **Border Radius**: 16px (rounded-2xl)
- **Shadow**: `shadow-card`, hover: `shadow-hover`
- **Padding**: 0 (image bleeds to edge), 16px for content area
- **Transition**: shadow 200ms ease, transform 200ms ease

**Structure:**
```
┌─────────────────────────┐
│                         │
│     [Food Image]        │  ← 280px × 240px, object-cover
│                         │
├─────────────────────────┤
│  Category Badge         │  ← 8px from top of content
│  ★★★★★ (4.5)           │  ← 8px margin top
│                         │
│  Dish Name              │  ← H4, 16px margin top
│  Short description...   │  ← Body Small, 8px margin top
│                         │
│  $35.00    [Add Cart]   │  ← Flex justify-between, 16px margin top
└─────────────────────────┘
```

**Component Code:**
```tsx
<div className="bg-white rounded-2xl shadow-card hover:shadow-hover transition-all duration-200 overflow-hidden group cursor-pointer">
  {/* Image Container */}
  <div className="relative h-60 overflow-hidden">
    <img
      src={dishImage}
      alt={dishName}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
    />
    <button className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-50 transition-colors">
      <HeartIcon className="w-5 h-5" />
    </button>
  </div>

  {/* Content Container */}
  <div className="p-4 md:p-6">
    {/* Category Badge */}
    <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-wide">
      {category}
    </span>

    {/* Rating */}
    <div className="flex items-center gap-2 mt-2">
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <StarIcon key={i} className="w-4 h-4 text-primary-500 fill-current" />
        ))}
      </div>
      <span className="text-sm text-neutral-600">(4.5)</span>
    </div>

    {/* Dish Name */}
    <h4 className="font-heading text-xl font-semibold text-neutral-900 mt-3">
      {dishName}
    </h4>

    {/* Description */}
    <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
      {description}
    </p>

    {/* Price & CTA */}
    <div className="flex items-center justify-between mt-4">
      <span className="text-2xl font-bold text-neutral-900">${price}</span>
      <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
        Add to Cart
      </button>
    </div>
  </div>
</div>
```

### Service Feature Card
**Purpose**: Display restaurant services/features (Delivery, Quality, etc.)

**Specifications:**
- **Width**: Full width (mobile), equal columns in grid (desktop)
- **Background**: White or `terracotta-50`
- **Border Radius**: 12px (rounded-xl)
- **Padding**: 24px
- **Text Align**: Center or Left
- **Icon**: 48px × 48px, `primary-500` or `terracotta-400`

```tsx
<div className="bg-terracotta-50 rounded-xl p-6 text-center">
  <div className="w-12 h-12 mx-auto bg-primary-500 rounded-full flex items-center justify-center">
    <TruckIcon className="w-6 h-6 text-white" />
  </div>
  <h5 className="font-heading text-lg font-semibold text-neutral-900 mt-4">
    Fast Delivery
  </h5>
  <p className="text-sm text-neutral-600 mt-2">
    We deliver your food within 30 minutes
  </p>
</div>
```

---

## 3. Navigation Component

### Desktop Navigation
**Specifications:**
- **Height**: 80px
- **Background**: White with `shadow-sm` or transparent with backdrop-blur
- **Padding**: 0 24px (mobile), 0 48px (desktop)
- **Logo**: Height 40px
- **Nav Links**: 16px, medium weight, `neutral-700`, 24px spacing
- **Sticky**: Top position when scrolling

```tsx
<nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="flex items-center justify-between h-20">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src="/logo.svg" alt="HML Restaurant" className="h-10" />
      </div>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        <a href="#home" className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors">
          Home
        </a>
        <a href="#menu" className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors">
          Menu
        </a>
        <a href="#about" className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors">
          About
        </a>
        <a href="#contact" className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors">
          Contact
        </a>
      </div>

      {/* CTA Button */}
      <button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
        Order Now
      </button>
    </div>
  </div>
</nav>
```

### Mobile Navigation
**Specifications:**
- **Menu Icon**: Hamburger, 24px × 24px
- **Drawer**: Full screen or slide from right
- **Background**: White
- **Links**: 18px, stacked vertically, 16px spacing

---

## 4. Hero Section

### Full-Width Hero
**Specifications:**
- **Height**: 600px (mobile), 700px (desktop)
- **Background**: `terracotta-50` or image with overlay
- **Layout**: 60/40 split (text/image on desktop), stacked on mobile
- **Padding**: 24px (mobile), 48px (desktop)

**Structure:**
```
┌─────────────────────────────────────┐
│                                     │
│  We Serve The                       │  ← Display heading
│  Test You Love                      │
│                                     │
│  Lorem ipsum dolor sit...          │  ← Lead text
│                                     │
│  [Order Now] [View Menu]           │  ← Button group
│                                     │
│  ⭐⭐⭐⭐⭐ 5.0 (1000+ reviews)      │  ← Social proof
│                                     │
└─────────────────────────────────────┘
```

```tsx
<section className="relative bg-gradient-to-br from-terracotta-50 to-primary-50 py-12 md:py-20">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      {/* Content */}
      <div>
        <h1 className="font-heading text-5xl md:text-7xl font-bold text-neutral-900 leading-tight">
          We Serve The <span className="text-primary-600">Test</span> You Love
        </h1>
        <p className="text-lg md:text-xl text-neutral-600 mt-6 leading-relaxed">
          Experience the finest dining with our carefully crafted menu featuring fresh, locally-sourced ingredients.
        </p>
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3.5 rounded-lg font-semibold text-base transition-colors">
            Order Now
          </button>
          <button className="bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3.5 rounded-lg font-semibold text-base transition-colors">
            View Menu
          </button>
        </div>
        <div className="flex items-center gap-3 mt-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-primary-500 fill-current" />
            ))}
          </div>
          <span className="text-neutral-700 font-medium">5.0 (1000+ reviews)</span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative">
        <img
          src="/hero-dish.png"
          alt="Delicious food"
          className="w-full h-auto rounded-3xl shadow-2xl"
        />
      </div>
    </div>
  </div>
</section>
```

---

## 5. Input Components

### Text Input
**Specifications:**
- **Height**: 44px (mobile), 48px (desktop)
- **Padding**: 12px 16px
- **Border**: 1px solid `neutral-300`
- **Border Radius**: 8px
- **Font**: 16px (body)
- **Background**: White

**States:**
- **Focus**: Border `primary-500`, ring-2 ring-`primary-200`
- **Error**: Border `error-500`, ring-2 ring-`error-200`
- **Disabled**: Background `neutral-100`, text `neutral-400`

```tsx
<div className="space-y-2">
  <label className="block text-sm font-medium text-neutral-700">
    Email Address
  </label>
  <input
    type="email"
    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-all"
    placeholder="you@example.com"
  />
</div>
```

### Select Dropdown
**Specifications:**
- **Height**: 44px (mobile), 48px (desktop)
- **Arrow Icon**: Right aligned, 16px × 16px
- Same styling as Text Input

```tsx
<select className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-200 focus:border-primary-500 appearance-none bg-white">
  <option>Select a category</option>
  <option>Appetizers</option>
  <option>Main Course</option>
  <option>Desserts</option>
</select>
```

---

## 6. Badge Component

### Category Badge
**Specifications:**
- **Padding**: 6px 12px
- **Border Radius**: 9999px (rounded-full)
- **Font**: 12px, semibold, uppercase, tracking-wide
- **Background**: `primary-50` or `terracotta-50`
- **Text**: `primary-700` or `terracotta-700`

```tsx
<span className="inline-block px-3 py-1.5 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full uppercase tracking-wide">
  Popular
</span>
```

### Status Badge
**Purpose**: Show availability, special offers

```tsx
{/* Available */}
<span className="inline-block px-3 py-1 bg-success-50 text-success-700 text-xs font-semibold rounded-full">
  Available
</span>

{/* Sold Out */}
<span className="inline-block px-3 py-1 bg-error-50 text-error-700 text-xs font-semibold rounded-full">
  Sold Out
</span>

{/* Limited */}
<span className="inline-block px-3 py-1 bg-warning-50 text-warning-700 text-xs font-semibold rounded-full">
  Limited
</span>
```

---

## 7. Rating Component

### Star Rating
**Specifications:**
- **Star Size**: 16px (small), 20px (medium), 24px (large)
- **Color**: `primary-500` (filled), `neutral-300` (empty)
- **Spacing**: 2px between stars
- **Display**: Inline with count

```tsx
<div className="flex items-center gap-2">
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-primary-500 fill-current' : 'text-neutral-300'
        }`}
      />
    ))}
  </div>
  <span className="text-sm font-medium text-neutral-600">
    {rating.toFixed(1)} ({reviewCount})
  </span>
</div>
```

---

## 8. Footer Component

**Specifications:**
- **Background**: `neutral-900`
- **Text**: `neutral-400` (body), `neutral-100` (headings)
- **Padding**: 48px vertical (mobile), 64px vertical (desktop)
- **Layout**: Stacked (mobile), 4-column grid (desktop)

```tsx
<footer className="bg-neutral-900 text-neutral-400 py-12 md:py-16">
  <div className="max-w-7xl mx-auto px-6 lg:px-12">
    <div className="grid md:grid-cols-4 gap-8">
      {/* Company Info */}
      <div>
        <img src="/logo-white.svg" alt="HML Restaurant" className="h-10 mb-4" />
        <p className="text-sm leading-relaxed">
          Experience the finest dining with quality ingredients and excellent service.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h6 className="text-neutral-100 font-semibold mb-4">Quick Links</h6>
        <ul className="space-y-2">
          <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Home</a></li>
          <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Menu</a></li>
          <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">About Us</a></li>
          <li><a href="#" className="text-sm hover:text-primary-400 transition-colors">Contact</a></li>
        </ul>
      </div>

      {/* Opening Hours */}
      <div>
        <h6 className="text-neutral-100 font-semibold mb-4">Opening Hours</h6>
        <ul className="space-y-2 text-sm">
          <li>Mon - Fri: 9:00 AM - 10:00 PM</li>
          <li>Sat - Sun: 10:00 AM - 11:00 PM</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h6 className="text-neutral-100 font-semibold mb-4">Contact Us</h6>
        <ul className="space-y-2 text-sm">
          <li>123 Restaurant St.</li>
          <li>Phone: (555) 123-4567</li>
          <li>Email: info@hml.com</li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm">
      <p>&copy; 2024 HML Restaurant. All rights reserved.</p>
    </div>
  </div>
</footer>
```

---

## 9. Modal/Dialog Component

**Specifications:**
- **Overlay**: `bg-black/50` backdrop-blur-sm
- **Container**: White, max-width 500px, centered
- **Border Radius**: 16px
- **Padding**: 24px
- **Shadow**: `shadow-2xl`

```tsx
<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
    {/* Header */}
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-bold text-neutral-900">Reserve Table</h3>
      <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-100">
        <XIcon className="w-5 h-5" />
      </button>
    </div>

    {/* Content */}
    <div className="space-y-4">
      {/* Modal content */}
    </div>

    {/* Actions */}
    <div className="flex gap-3 mt-6">
      <button className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 rounded-lg font-semibold transition-colors">
        Cancel
      </button>
      <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors">
        Confirm
      </button>
    </div>
  </div>
</div>
```

---

## Responsive Breakpoints

All components should be responsive using these breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1023px
- **Desktop**: ≥ 1024px

Use Tailwind's responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up
- `xl:` - 1280px and up
- `2xl:` - 1536px and up
