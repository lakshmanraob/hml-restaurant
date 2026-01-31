# HML Restaurant Design System

Welcome to the HML Restaurant Design System documentation. This comprehensive guide will help designers and developers build consistent, accessible, and beautiful user interfaces for the restaurant web application.

## 📚 Documentation Structure

### Core Documentation

1. **[Style Guide](./style-guide.md)** - Complete design system overview
   - Brand identity and principles
   - Visual language guidelines
   - Layout systems
   - Animation and interaction patterns
   - Accessibility standards
   - Best practices and workflows

2. **[Color System](./color-system.md)** - Comprehensive color palette
   - Primary, secondary, and terracotta colors
   - Neutral grays for text and UI
   - Semantic colors (success, warning, error, info)
   - Usage guidelines and accessibility
   - Tailwind CSS implementation

3. **[Typography](./typography.md)** - Complete typography system
   - Font families (Poppins, Inter)
   - Type scale and sizes
   - Font weights and styles
   - Line heights and spacing
   - Responsive typography
   - Component-specific typography

4. **[Component Specifications](./component-specs.md)** - Detailed component specs
   - Buttons (Primary, Secondary, Icon)
   - Cards (Menu Item, Service Feature)
   - Navigation (Desktop, Mobile)
   - Forms and inputs
   - Badges, ratings, modals
   - Complete implementation code

5. **[Design Tokens](./design-tokens.json)** - Machine-readable design tokens
   - All colors, typography, spacing values
   - Border radius, shadows, transitions
   - Breakpoints and z-index scales
   - Use for design tools and code generation

## 🎨 Design Reference

### Reference Designs
Located in `/docs/designs/references/`:
- `1.png` - Homepage layouts and popular dishes section
- `2.png` - Menu item cards and reservation section
- `3.png` - Food photography style reference

These reference images guided the design system creation and showcase the desired visual style.

## 🚀 Quick Start

### For Designers

1. **Review the Style Guide**: Start with [style-guide.md](./style-guide.md) to understand brand identity and design principles
2. **Study Color & Typography**: Familiarize yourself with the [color system](./color-system.md) and [typography](./typography.md)
3. **Explore Components**: Review [component specs](./component-specs.md) for detailed component requirements
4. **Use Design Tokens**: Import [design-tokens.json](./design-tokens.json) into Figma or your design tool

### For Developers

1. **Install Dependencies**: Ensure Tailwind CSS is configured (already done in this project)
2. **Import Fonts**: Fonts are auto-imported in `app/globals.css`
3. **Use Tailwind Classes**: All design tokens are available as Tailwind utilities
4. **Reference Components**: See component specs for ready-to-use code examples
5. **Follow Accessibility**: Ensure WCAG 2.1 AA compliance per style guide

### Quick Implementation Example

```tsx
// Example: Menu Item Card Component
import Image from 'next/image';

export function MenuItemCard({ dish }) {
  return (
    <div className="card overflow-hidden">
      <div className="relative h-60">
        <Image
          src={dish.image}
          alt={dish.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-semibold rounded-full uppercase">
          {dish.category}
        </span>
        <h4 className="font-heading text-xl font-semibold text-neutral-900 mt-3">
          {dish.name}
        </h4>
        <p className="text-sm text-neutral-600 mt-2 line-clamp-2">
          {dish.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-neutral-900">
            ${dish.price}
          </span>
          <button className="btn btn-primary px-4 py-2 rounded-lg text-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
```

## 🎯 Design Principles

1. **Clarity First** - Clear hierarchy guides users naturally
2. **Consistency Everywhere** - Unified patterns across all pages
3. **Mobile-First** - Designed for mobile, enhanced for desktop
4. **Performance Matters** - Fast, optimized, efficient
5. **Accessibility by Default** - WCAG 2.1 AA compliant

## 🌈 Color Palette Overview

### Primary Colors
- **Primary-500**: `#FFC107` - Main brand color (CTAs, links)
- **Primary-600**: `#FFB300` - Hover states
- **Primary-700**: `#FFA000` - Active states

### Terracotta
- **Terracotta-400**: `#D87B5E` - Earthy accents
- **Terracotta-50**: `#FDF5F3` - Subtle backgrounds

### Neutrals
- **Neutral-900**: `#1C1917` - Headings
- **Neutral-600**: `#57534E` - Body text
- **White**: `#FFFFFF` - Backgrounds

## 📐 Typography Scale

### Headings (Poppins)
- Display: 72px (4.5rem)
- H1: 60px (3.75rem)
- H2: 48px (3rem)
- H3: 36px (2.25rem)
- H4: 30px (1.875rem)

### Body (Inter)
- Body Large: 18px (1.125rem)
- Body: 16px (1rem)
- Body Small: 14px (0.875rem)
- Caption: 12px (0.75rem)

## 🧩 Key Components

### Cards
- Menu Item Card
- Service Feature Card

### Buttons
- Primary Button (Yellow CTA)
- Secondary Button (Outlined)
- Icon Button

### Navigation
- Desktop Nav (Sticky header)
- Mobile Nav (Drawer)

### Forms
- Text Input
- Select Dropdown
- Textarea

### UI Elements
- Badges & Tags
- Star Ratings
- Modals & Dialogs

## ♿ Accessibility

All components meet **WCAG 2.1 AA** standards:
- ✅ Minimum 4.5:1 contrast for text
- ✅ Keyboard navigation support
- ✅ Screen reader friendly
- ✅ 44px minimum touch targets
- ✅ Reduced motion support

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

## 🛠️ Tech Stack Integration

This design system is built for:
- **Next.js 15** (App Router)
- **TypeScript** (Type-safe components)
- **Tailwind CSS** (Utility-first styling)
- **React 19** (Modern React patterns)

All design tokens are configured in:
- [tailwind.config.ts](../../tailwind.config.ts)
- [app/globals.css](../../app/globals.css)

## 📖 Additional Resources

### Internal
- Project README: [../../README.md](../../README.md)
- Components folder: `../../components/`
- App folder: `../../app/`

### External
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [Poppins Font](https://fonts.google.com/specimen/Poppins)
- [Inter Font](https://fonts.google.com/specimen/Inter)

## 🤝 Contributing

When contributing to the design system:

1. **Propose Changes**: Document your proposal with rationale
2. **Follow Principles**: Align with existing design principles
3. **Update Documentation**: Keep docs in sync with changes
4. **Test Thoroughly**: Ensure accessibility and responsiveness
5. **Get Review**: Have changes reviewed before implementation

## 📝 Version History

- **v1.0.0** (2024-01-31) - Initial design system release
  - Established color palette based on references
  - Defined typography system
  - Created component specifications
  - Documented accessibility guidelines
  - Configured Tailwind with design tokens

## 📞 Support

For questions or issues with the design system:
- Review documentation thoroughly first
- Check [component-specs.md](./component-specs.md) for implementation examples
- Refer to [style-guide.md](./style-guide.md) for design decisions
- Ensure Tailwind config matches design tokens

---

**Maintained by**: HML Restaurant Design Team
**Last Updated**: 2024-01-31
**Status**: ✅ Active and ready for use
