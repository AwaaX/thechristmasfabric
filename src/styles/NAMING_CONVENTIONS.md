# CSS Naming Conventions

This document outlines the CSS naming standards used in the project to maintain consistency and improve maintainability.

## Overview

The project uses a combination of Tailwind CSS utilities and custom SCSS for styling. Where custom CSS is used, we follow a component-based naming approach.

## Class Naming Patterns

### 1. Component-Based Classes
Components should use clear, descriptive names that indicate their purpose:

```scss
.breadcrumb-block { }       // Component container
.breadcrumb-main { }        // Component section
.breadcrumb-item { }        // Component item
```

**Why:** Makes it immediately clear which component owns the styles.

### 2. Utility Classes
Utility classes should describe the CSS property or behavior:

```scss
.no-scrollbar { }           // Hides scrollbar
.underline-gap { }          // Adds underline offset
.show-header { }            // Shows header with animation
```

**Why:** Utilities are reusable across components and should be self-documenting.

### 3. State Classes
State modifiers should use the `.is-` or `.has-` prefix:

```scss
.is-active { }              // Active state
.is-loading { }             // Loading state
.has-error { }              // Error state
.open { }                   // Open state (legacy)
```

**Why:** Clearly indicates this is a state modifier, not a structural element.

### 4. Animation Classes
Animation classes should indicate motion or timing:

```scss
.show-header { }            // Animated show
.slidedown { }              // Keyframe animation
.animate-progress-bar { }   // Progress animation
```

**Why:** Makes it clear the class controls animation behavior.

## Class Prefix Standards

### Current Prefixes in Use

#### ✅ Recommended
- `.tag-action-*` - Tooltip and action indicators
- `.text-*` - Typography utilities
- `.bg-*` - Background utilities
- `.product-*` - Product-related components
- `.breadcrumb-*` - Navigation breadcrumbs
- `.countdown-*` - Countdown timer
- `.clock-*` - Clock display

#### ⚠️ Legacy (To Be Standardized)
- `.swh-btn` - Button styling (consider renaming to `.btn` or `.button`)
- `.tag-action-swh` - Tooltip action (consider renaming to `.tag-action-tooltip`)
- `.tag-action-ctrl` - Control container (consider renaming to `.tag-action-container`)
- `.christmas-*` - Theme-specific styles (keep as-is for feature isolation)

## Layout Structure

Classes follow a hierarchy that mirrors component nesting:

```scss
.component-block { }        // Root container
  .component-main { }       // Main section
    .component-item { }     // Individual item
      .component-text { }   // Text element
```

**Example:**
```scss
.product-item { }           // Product card
  .product-main { }         // Product content
    .product-img { }        // Product image
    .product-name { }       // Product title
```

## Media Query Organization

Organize media queries at the component level for easier maintenance:

```scss
.component {
  // Mobile-first styles
  
  @media (min-width: 768px) {
    // Tablet styles
  }
  
  @media (min-width: 1024px) {
    // Desktop styles
  }
}
```

## Tailwind Integration

When using Tailwind CSS:
- Use Tailwind classes directly in components (preferred)
- Only create custom SCSS for complex, reusable patterns
- Use `@layer` directive to extend Tailwind layers when needed
- Avoid duplicating Tailwind functionality with custom CSS

## Variables and Colors

Use CSS custom properties (variables) defined in the root:

```scss
color: var(--green);        // Theme green
color: var(--secondary2);   // Secondary text color
color: var(--white);        // White background
```

**Common Variables:**
- `--green` - Primary accent color
- `--secondary2` - Secondary text color
- `--white` - White color
- `--black` - Black color

## Refactoring Opportunities

### Candidates for Renaming
1. `.swh-btn` → `.button` or `.btn-primary`
2. `.tag-action-swh` → `.tooltip` or `.tag-action-tooltip`
3. `.tag-action-ctrl` → `.tooltip-trigger` or `.tag-action-trigger`

### Candidates for Consolidation
1. Multiple button styles could use a unified button component
2. Toast/alert styles could be consolidated into a single alert component

## Best Practices

✅ **DO:**
- Use kebab-case for class names
- Be specific and descriptive
- Keep selector nesting to 3 levels maximum
- Use semantic names that describe purpose
- Group related styles together

❌ **DON'T:**
- Use IDs for styling (use only for JS targets)
- Create overly specific selectors
- Use generic names like `.container`, `.content`, `.wrapper`
- Mix naming conventions in the same file
- Create single-use classes

## Future Considerations

As the codebase grows, consider:
1. Moving more styles to Tailwind utility classes
2. Creating a design system/component library
3. Implementing CSS Modules for better scoping
4. Using BEM (Block Element Modifier) for complex components
5. Standardizing legacy prefixes (`.swh-*`, `.tag-action-swh`)

## References

- [Tailwind CSS Documentation](https://tailwindcss.com)
- [BEM Naming Methodology](http://getbem.com/naming/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
