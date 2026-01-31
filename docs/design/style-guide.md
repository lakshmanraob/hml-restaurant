# HML Restaurant - Complete Style Guide

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Design Principles](#design-principles)
3. [Visual Language](#visual-language)
4. [Design System Reference](#design-system-reference)
5. [Layout Guidelines](#layout-guidelines)
6. [Animation & Interaction](#animation--interaction)
7. [Accessibility Guidelines](#accessibility-guidelines)
8. [Best Practices](#best-practices)

---

## Brand Identity

### Brand Values
- **Fresh & Quality**: We prioritize fresh, high-quality ingredients
- **Warm & Welcoming**: Creating a comfortable, inviting atmosphere
- **Modern & Efficient**: Leveraging technology for seamless experiences
- **Community-Focused**: Building connections through food

### Brand Personality
- **Approachable**: Friendly, easy to understand
- **Vibrant**: Energetic, lively, appetizing
- **Reliable**: Consistent, trustworthy
- **Contemporary**: Modern, up-to-date

### Visual Mood
- Warm and inviting (terracotta tones, natural imagery)
- Clean and modern (spacious layouts, sans-serif typography)
- Appetizing (vibrant food photography, golden accents)
- Professional (structured grids, consistent spacing)

---

## Design Principles

### 1. Clarity First
- Clear visual hierarchy guides users naturally
- Important actions stand out (primary CTAs in yellow/orange)
- Straightforward navigation and labeling
- No unnecessary decorative elements

### 2. Consistency Everywhere
- Consistent spacing using 4px/8px grid
- Unified component patterns across pages
- Predictable interactions and behaviors
- Coherent color usage throughout

### 3. Mobile-First Approach
- Design for mobile, enhance for desktop
- Touch-friendly targets (minimum 44px)
- Readable text sizes (minimum 16px body)
- Responsive images and layouts

### 4. Performance Matters
- Optimize images (WebP format, lazy loading)
- Minimal animation overhead
- Fast-loading fonts
- Efficient code and assets

### 5. Accessibility by Default
- WCAG 2.1 AA compliance minimum
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast

---

## Visual Language

### Photography Style

#### Food Photography
- **Lighting**: Natural, overhead or 45-degree angle
- **Background**: Clean, minimal (white, terracotta, or wood)
- **Focus**: Sharp focus on food, shallow depth of field
- **Color**: Vibrant, natural, appetizing
- **Composition**: Rule of thirds, negative space
- **Resolution**: Minimum 1200px width for hero images

**Do's:**
✅ Natural lighting
✅ Fresh, appealing food presentation
✅ Clean, uncluttered backgrounds
✅ Consistent styling across dishes
✅ High-resolution images

**Don'ts:**
❌ Dark, moody photography
❌ Over-processed, artificial colors
❌ Cluttered compositions
❌ Inconsistent styling
❌ Low-resolution or pixelated images

#### Lifestyle Photography
- Show happy diners in natural settings
- Diverse representation of customers
- Candid, genuine moments
- Professional quality

### Iconography

**Style**: Outline icons (2px stroke weight)
**Size**: 20px, 24px, 32px (multiples of 4)
**Color**: Inherit from parent or `neutral-600`
**Library**: Heroicons or similar consistent set

**Examples:**
- Navigation: Home, Menu, User, Cart, Search
- Actions: Heart (favorite), Share, Plus, Minus, X (close)
- Status: Check, Alert, Info, Star (rating)
- Categories: Pizza, Burger, Salad, Drink icons

### Illustration Style

**When to Use**: Empty states, onboarding, error pages
**Style**: Simple, geometric, 2-3 colors max
**Tone**: Friendly, approachable, not overly playful
**Colors**: Use brand colors (primary, terracotta, neutrals)

---

## Design System Reference

### Color System
See [color-system.md](./color-system.md) for complete documentation.

**Quick Reference:**
- **Primary Actions**: `primary-500` (#FFC107)
- **Text**: `neutral-900` (headings), `neutral-600` (body)
- **Backgrounds**: `white`, `neutral-50`, `terracotta-50`
- **Borders**: `neutral-200`, `neutral-300`
- **Success**: `success-500` (#22C55E)
- **Error**: `error-500` (#EF4444)

### Typography
See [typography.md](./typography.md) for complete documentation.

**Quick Reference:**
- **Headings**: Poppins, bold/semibold
- **Body**: Inter, normal/medium
- **Sizes**: 16px base, scale up/down from there
- **Line Height**: 1.5 (body), 1.2-1.3 (headings)

### Components
See [component-specs.md](./component-specs.md) for complete documentation.

**Core Components:**
- Buttons (Primary, Secondary, Icon)
- Cards (Menu Item, Service Feature)
- Navigation (Desktop, Mobile)
- Forms (Input, Select, Textarea)
- Badges & Tags
- Modals & Dialogs

---

## Layout Guidelines

### Grid System

#### Container
- **Max Width**: 1280px (xl breakpoint)
- **Padding**: 24px (mobile), 48px (desktop)
- **Centered**: margin 0 auto

```tsx
<div className="max-w-7xl mx-auto px-6 lg:px-12">
  {/* Content */}
</div>
```

#### Columns
- **Mobile**: 1 column (full width)
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns for cards, 2 columns for content

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

### Spacing Scale

Based on 4px base unit:
- **xs**: 4px (1 unit)
- **sm**: 8px (2 units)
- **md**: 16px (4 units)
- **lg**: 24px (6 units)
- **xl**: 32px (8 units)
- **2xl**: 48px (12 units)
- **3xl**: 64px (16 units)

**Usage:**
- **Component Internal Padding**: 16-24px
- **Section Vertical Spacing**: 64-96px
- **Card Gap**: 24-32px
- **Element Margins**: 8-16px

### Page Layouts

#### Standard Page Structure
```
┌─────────────────────────────────┐
│         Navigation              │  ← 80px height, sticky
├─────────────────────────────────┤
│                                 │
│         Hero Section            │  ← 600-700px height
│                                 │
├─────────────────────────────────┤
│      Content Section 1          │  ← 80-120px padding vertical
├─────────────────────────────────┤
│      Content Section 2          │  ← 80-120px padding vertical
├─────────────────────────────────┤
│      Content Section 3          │  ← 80-120px padding vertical
├─────────────────────────────────┤
│           Footer                │  ← 64px padding vertical
└─────────────────────────────────┘
```

#### Menu Page Grid
```
┌─────────────────────────────────┐
│    Filters/Categories (Sidebar) │
│  ┌─────┬─────┬─────┬─────┐     │
│  │ 🍕  │ 🍕  │ 🍕  │ 🍕  │     │
│  └─────┴─────┴─────┴─────┘     │
│  ┌─────┬─────┬─────┬─────┐     │
│  │ 🍕  │ 🍕  │ 🍕  │ 🍕  │     │
│  └─────┴─────┴─────┴─────┘     │
└─────────────────────────────────┘
```

---

## Animation & Interaction

### Animation Principles
1. **Purpose-Driven**: Every animation should serve a purpose
2. **Subtle**: Don't distract from content
3. **Fast**: Keep animations under 300ms
4. **Natural**: Use easing for realistic motion

### Timing Functions

```css
/* Quick interactions */
transition: all 150ms ease-out;

/* Standard interactions */
transition: all 200ms ease-in-out;

/* Slower, deliberate motions */
transition: all 300ms ease-in-out;

/* Bouncy, playful */
transition: all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

### Common Animations

#### Hover States
```tsx
// Cards
className="hover:shadow-lg hover:-translate-y-1 transition-all duration-200"

// Buttons
className="hover:scale-105 active:scale-95 transition-transform duration-150"

// Images
className="hover:scale-110 transition-transform duration-300"

// Links
className="hover:text-primary-600 transition-colors duration-150"
```

#### Loading States
```tsx
// Spinner
<div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-200 border-t-primary-600"></div>

// Skeleton
<div className="animate-pulse bg-neutral-200 h-48 rounded-xl"></div>

// Shimmer effect
<div className="animate-shimmer bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200"></div>
```

#### Page Transitions
- Fade in content on load
- Slide in modals/drawers
- Smooth scroll to sections

### Micro-interactions

**Button Click:**
1. Scale down slightly (0.95) on mousedown
2. Return to normal on mouseup
3. Add haptic feedback on mobile

**Adding to Cart:**
1. Button shows loading spinner
2. Brief success state (checkmark)
3. Cart icon bounces/updates count
4. Toast notification appears

**Form Validation:**
1. Real-time validation on blur
2. Error states appear smoothly
3. Success checkmarks for valid fields
4. Helpful error messages

---

## Accessibility Guidelines

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal Text**: 4.5:1 minimum
- **Large Text (18px+)**: 3:1 minimum
- **UI Components**: 3:1 minimum
- **Graphics**: 3:1 minimum

#### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators required
- Logical tab order
- Skip links for main content

```tsx
// Focus styles
className="focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
```

#### Screen Readers
- Semantic HTML (nav, main, article, aside)
- Alt text for all images
- ARIA labels for icon buttons
- Form labels properly associated

```tsx
// Icon button with aria-label
<button aria-label="Add to favorites">
  <HeartIcon />
</button>

// Image with descriptive alt
<img src="pasta.jpg" alt="Creamy carbonara pasta with bacon and parmesan" />
```

#### Motion & Animation
- Respect `prefers-reduced-motion`
- Provide pause controls for auto-playing content
- Avoid flashing content

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Inclusive Design

- Minimum touch target: 44px × 44px
- Clear, simple language
- Multiple ways to complete tasks
- Flexible text sizing (up to 200%)
- High contrast mode support

---

## Best Practices

### Development

#### Component Organization
```
components/
├── ui/                    # Basic UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── Badge.tsx
├── layout/               # Layout components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── features/            # Feature-specific components
    ├── MenuItemCard.tsx
    ├── HeroSection.tsx
    └── ReservationForm.tsx
```

#### Naming Conventions
- **Components**: PascalCase (Button, MenuItemCard)
- **Files**: PascalCase.tsx
- **CSS Classes**: Tailwind utilities only
- **Props**: camelCase
- **Constants**: UPPER_SNAKE_CASE

#### Code Style
```tsx
// Good: Compose Tailwind classes
<button className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
  Click me
</button>

// Better: Extract to reusable component
const Button = ({ variant = 'primary', children, ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-colors";
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white",
    secondary: "bg-transparent border-2 border-primary-500 text-primary-600 hover:bg-primary-50",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
};
```

### Design Workflow

1. **Discovery**: Research, analyze references, define requirements
2. **Design Tokens**: Establish colors, typography, spacing
3. **Component Design**: Design individual components
4. **Prototype**: Create interactive prototypes
5. **Review**: Get feedback, iterate
6. **Documentation**: Document specifications
7. **Implementation**: Build components
8. **Testing**: Test across devices and browsers
9. **Iterate**: Refine based on usage

### Quality Checklist

Before launching any page/component:

**Visual Design**
- ✅ Follows design system tokens
- ✅ Consistent spacing and alignment
- ✅ Proper typography hierarchy
- ✅ Appropriate color usage
- ✅ High-quality images

**Responsive Design**
- ✅ Works on mobile (320px+)
- ✅ Works on tablet (768px+)
- ✅ Works on desktop (1024px+)
- ✅ No horizontal scroll
- ✅ Touch-friendly on mobile

**Accessibility**
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigable
- ✅ Screen reader friendly
- ✅ Sufficient contrast
- ✅ Semantic HTML

**Performance**
- ✅ Images optimized
- ✅ Fonts loaded efficiently
- ✅ No layout shift
- ✅ Fast load time (<3s)
- ✅ Smooth animations (60fps)

**Code Quality**
- ✅ Reusable components
- ✅ TypeScript types
- ✅ Clean, readable code
- ✅ Proper error handling
- ✅ No console errors

---

## Resources

### Design Files
- Reference Designs: `/docs/designs/references/`
- Design Tokens: `/docs/design/design-tokens.json`
- Component Specs: `/docs/design/component-specs.md`

### Implementation
- Tailwind Config: `/tailwind.config.ts`
- Global Styles: `/app/globals.css`
- Components: `/components/`

### External Resources
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Heroicons](https://heroicons.com/)
- [Google Fonts](https://fonts.google.com/)

---

## Version History

**v1.0.0** - Initial design system
- Established color palette
- Defined typography system
- Created component specifications
- Documented accessibility guidelines

---

## Feedback & Contributions

This is a living document. If you have suggestions or find inconsistencies, please:
1. Document the issue with screenshots
2. Propose a solution aligned with design principles
3. Submit for review

---

**Last Updated**: 2024-01-31
**Maintained By**: HML Restaurant Design Team
