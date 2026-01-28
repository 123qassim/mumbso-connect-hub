# MUMBSO Color System - Developer Implementation Guide

## Quick Start

The MUMBSO website now features a comprehensive, WCAG AA-compliant color system that automatically adapts to light and dark modes.

### Key Features

✅ **Automatic Theme Switching** - Users can toggle between light and dark modes  
✅ **WCAG AA Compliant** - All text meets accessibility contrast requirements  
✅ **No Hardcoded Colors** - Everything uses CSS variables for consistency  
✅ **Smooth Transitions** - Theme changes animate smoothly  
✅ **Dark Mode Ready** - All components fully support dark mode  

---

## Using the Color System

### 1. Text Colors

Use semantic text color classes instead of arbitrary color values:

```jsx
// ✅ DO: Use semantic colors
<p className="text-text-primary">Main content</p>
<p className="text-text-secondary">Secondary information</p>
<p className="text-text-tertiary">Tertiary details</p>
<p className="text-text-disabled">Disabled text</p>

// ❌ DON'T: Use arbitrary Tailwind colors
<p className="text-white">Wrong - invisible in light mode</p>
<p className="text-gray-600">Wrong - not theme-aware</p>
<p className="text-blue-500">Wrong - breaks accessibility</p>
```

### 2. Background Colors

Use theme-aware background classes:

```jsx
// ✅ DO: Use theme-aware backgrounds
<div className="bg-background text-foreground">Page background</div>
<div className="bg-card text-card-foreground">Card content</div>
<div className="bg-muted">Muted background</div>
<div className="bg-primary text-primary-foreground">Primary action</div>

// ❌ DON'T: Use hardcoded colors
<div className="bg-white">Won't work in dark mode</div>
<div className="bg-blue-500">Not brand-consistent</div>
<div className="bg-gray-100">Breaks accessibility</div>
```

### 3. Border Colors

Always use the border variable:

```jsx
// ✅ DO: Use theme border color
<div className="border border-border">Bordered element</div>
<input className="border border-input-border" />

// ❌ DON'T: Use hardcoded borders
<div className="border border-gray-300">Not theme-aware</div>
<input className="border border-blue-200" />
```

### 4. Button Styling

Use Button component with variant props:

```jsx
import { Button } from "@/components/ui/button";

// ✅ DO: Use component variants
<Button variant="default">Default Button</Button>
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="destructive">Delete Action</Button>
<Button variant="link">Link Button</Button>

// ❌ DON'T: Override with custom colors
<Button style={{background: '#2D9B8E'}}>Custom color</Button>
```

### 5. Form Elements

Use semantic form color classes:

```jsx
// ✅ DO: Use form colors
<input 
  className="bg-input text-input-foreground border border-input-border"
  placeholder="Enter text..."
/>
<textarea 
  className="bg-input text-input-foreground border border-input-border"
/>
<select className="bg-input text-input-foreground border border-input-border">
  <option>Select option</option>
</select>

// ❌ DON'T: Mix hardcoded and theme colors
<input className="bg-white border-gray-300" />
```

### 6. Link Styling

Links automatically inherit theme colors:

```jsx
import { Link } from "react-router-dom";

// ✅ DO: Links inherit theme colors automatically
<Link to="/page">Link text</Link>
<a href="#section">Anchor link</a>

// ❌ DON'T: Override link colors
<Link to="/page" className="text-blue-500">Link</Link>
```

### 7. Card Components

Use card colors for consistent styling:

```jsx
import { Card, CardContent } from "@/components/ui/card";

// ✅ DO: Use Card component
<Card>
  <CardContent className="p-6">
    Card content with theme-aware colors
  </CardContent>
</Card>

// Manual card styling
<div className="bg-card text-card-foreground border border-border p-6 rounded-lg">
  Custom card
</div>

// ❌ DON'T: Hardcode card styling
<div className="bg-white text-gray-900 border border-gray-300">
  Wrong colors
</div>
```

### 8. Semantic Colors (Success, Warning, Error, Info)

```jsx
// ✅ DO: Use semantic colors for messages
<div className="bg-success-light text-text-primary border border-success">
  Success message
</div>
<div className="bg-warning-light text-text-primary border border-warning">
  Warning message
</div>
<div className="bg-error-light text-text-primary border border-error">
  Error message
</div>
<div className="bg-info-light text-text-primary border border-info">
  Info message
</div>

// ❌ DON'T: Use arbitrary colors
<div className="bg-green-100 text-green-900">Success</div>
<div className="bg-yellow-100 text-yellow-900">Warning</div>
```

### 9. Navigation and Headers

```jsx
// ✅ DO: Use card colors for headers
<header className="bg-card text-card-foreground border-b border-border">
  <nav>
    <Link className="text-text-secondary hover:text-text-primary">Menu</Link>
    <Link className="text-text-secondary hover:text-text-primary">Item</Link>
  </nav>
</header>

// ❌ DON'T: Hardcode header colors
<header className="bg-white text-gray-900 border-b border-gray-200">
  <nav>
    <Link className="text-gray-600 hover:text-gray-900">Menu</Link>
  </nav>
</header>
```

### 10. Hover and Focus States

```jsx
// ✅ DO: Let components handle states automatically
<Button className="hover:shadow-lg">Button</Button>
<a className="hover:text-primary/80">Link</a>
<Card className="hover:shadow-md transition-all">Card</Card>

// Input focus ring (automatic)
<input className="focus-visible:ring-2 focus-visible:ring-ring" />

// ❌ DON'T: Hardcode hover states
<Button className="hover:bg-blue-600">Custom hover</Button>
```

---

## Available Color Classes

### Text Colors
```
text-text-primary      // Main text (100% opacity)
text-text-secondary    // Secondary info (65% opacity)
text-text-tertiary     // Tertiary details (50% opacity)
text-text-disabled     // Disabled text (30% opacity)
text-text-inverse      // Inverse text for dark backgrounds
```

### Background Colors
```
bg-background          // Page background
bg-background-secondary // Secondary background
bg-card               // Card backgrounds
bg-primary            // Primary color
bg-secondary          // Secondary color
bg-accent             // Accent color
bg-muted              // Muted background
bg-success            // Success background
bg-warning            // Warning background
bg-error              // Error background
bg-info               // Info background
```

### Border and Input Colors
```
border-border         // Border color
border-input-border   // Input border
bg-input              // Input background
text-input-foreground // Input text
```

### Primary Brand Colors
```
text-primary                    // Primary text
bg-primary                      // Primary background
text-primary-foreground         // Text on primary bg
bg-primary-light               // Light primary
bg-primary-lighter             // Lighter primary
```

### Secondary Brand Colors
```
text-secondary                  // Secondary text
bg-secondary                    // Secondary background
text-secondary-foreground       // Text on secondary bg
bg-secondary-light             // Light secondary
bg-secondary-lighter           // Lighter secondary
```

### Accent Colors
```
text-accent                     // Accent text
bg-accent                       // Accent background
text-accent-foreground          // Text on accent
bg-accent-light                // Light accent
```

### Semantic Colors
```
bg-success / bg-success-light
bg-warning / bg-warning-light
bg-error / bg-error-light
bg-info / bg-info-light
```

---

## Gradients

Pre-defined gradients that adjust for light/dark mode:

```jsx
// ✅ DO: Use theme gradients
<div className="bg-gradient-hero">Hero section</div>
<div className="bg-gradient-accent">Accent section</div>
<div className="bg-gradient-subtle">Subtle background</div>

// ❌ DON'T: Create hardcoded gradients
<div className="bg-gradient-to-r from-blue-500 to-purple-600">Wrong</div>
```

---

## Shadow System

Shadows automatically adjust for light/dark mode:

```jsx
// ✅ DO: Use predefined shadows
<div className="shadow-sm">Small shadow</div>
<div className="shadow-md">Medium shadow</div>
<div className="shadow-lg">Large shadow</div>
<div className="shadow-card">Card shadow</div>
<div className="shadow-glow">Glow shadow</div>

// ❌ DON'T: Hardcode shadows
<div style={{boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>Wrong</div>
```

---

## Dark Mode Testing

### Manual Testing

1. **Light Mode**: Everything should be clearly readable with dark text on light backgrounds
2. **Dark Mode**: Click the theme toggle (moon/sun icon) in the header
3. **Verify**: All text should be clearly readable with light text on dark backgrounds
4. **Transitions**: Colors should smoothly animate when switching modes

### Pages to Test
- Home page
- About page
- Programs page
- Research page
- Events page
- Members page
- Contact page
- All other pages

### Elements to Verify
- ✅ Headings are visible
- ✅ Body text is readable
- ✅ Links are distinguishable
- ✅ Buttons have proper contrast
- ✅ Card borders are visible
- ✅ Form inputs are clear
- ✅ Focus rings are visible
- ✅ Hover states show properly

---

## CSS Variables Reference

All colors are defined as CSS variables in `src/index.css`:

### Light Mode Variables
```css
:root {
  /* Light Mode Colors */
  --background: 0 0% 100%;
  --foreground: 210 15% 15%;
  --primary: 174 62% 45%;
  --secondary: 210 85% 48%;
  --accent: 142 76% 36%;
  --text-primary: 210 15% 15%;
  --text-secondary: 210 15% 45%;
  /* ... more variables ... */
}
```

### Dark Mode Variables
```css
.dark {
  /* Dark Mode Colors */
  --background: 210 20% 10%;
  --foreground: 0 0% 98%;
  --primary: 174 62% 55%;
  --secondary: 210 85% 58%;
  --accent: 142 76% 50%;
  --text-primary: 0 0% 98%;
  --text-secondary: 0 0% 80%;
  /* ... more variables ... */
}
```

---

## Common Patterns

### Feature Section with Gradient
```jsx
<section className="py-20 bg-gradient-subtle">
  <div className="container">
    <h2 className="text-3xl font-bold text-text-primary mb-4">Title</h2>
    <p className="text-text-secondary mb-8">Description</p>
  </div>
</section>
```

### Card Grid
```jsx
<div className="grid grid-cols-3 gap-6">
  {items.map(item => (
    <Card key={item.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {item.title}
        </h3>
        <p className="text-text-secondary">{item.description}</p>
      </CardContent>
    </Card>
  ))}
</div>
```

### Form Section
```jsx
<form className="space-y-4">
  <div>
    <label className="text-sm font-medium text-text-primary">
      Email
    </label>
    <input
      type="email"
      className="w-full bg-input text-input-foreground border border-input-border rounded p-2 focus-visible:ring-2 focus-visible:ring-ring"
    />
  </div>
  <Button type="submit" variant="primary">
    Submit
  </Button>
</form>
```

### Alert Message
```jsx
<div className="bg-error-light border-l-4 border-error text-text-primary p-4 rounded">
  <h3 className="font-bold text-text-primary mb-1">Error</h3>
  <p className="text-text-secondary">Something went wrong. Please try again.</p>
</div>
```

---

## Accessibility Checklist

When adding new components, ensure:

- [ ] Text color uses semantic variables (text-primary, text-secondary, etc.)
- [ ] Background uses theme colors (bg-card, bg-background, etc.)
- [ ] Contrast ratio is 4.5:1 or higher
- [ ] Focus states are visible
- [ ] Hover states are clear
- [ ] Color is not the only indicator
- [ ] Links are distinguishable from regular text
- [ ] Form labels are associated with inputs
- [ ] Error messages are clear
- [ ] Disabled states are obvious

---

## Troubleshooting

### Text is invisible in light mode
**Problem**: Using `text-white` directly  
**Solution**: Use `text-text-primary` or `text-card-foreground` instead

### Text is invisible in dark mode
**Problem**: Using `text-gray-900` or similar dark colors  
**Solution**: Use `text-text-primary` which adjusts for dark mode

### Colors don't transition smoothly
**Problem**: Missing transition class  
**Solution**: Add `transition-colors` to element

### Button doesn't look right in dark mode
**Problem**: Using custom inline styles  
**Solution**: Use `variant` prop on Button component instead

### Border not visible in dark mode
**Problem**: Using `border-gray-300` directly  
**Solution**: Use `border-border` which adjusts for theme

### Form input hard to see
**Problem**: Using `bg-white` directly  
**Solution**: Use `bg-input` which works in both modes

---

## Resources

- **COLOR_SYSTEM.md** - Complete color palette documentation
- **VERIFICATION_REPORT.md** - Testing and verification results
- **tailwind.config.ts** - Tailwind color configuration
- **src/index.css** - CSS variables definitions
- **WCAG 2.1**: https://www.w3.org/WAI/WCAG21/quickref/
- **Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

## Questions?

For implementation questions or issues:
1. Review the COLOR_SYSTEM.md documentation
2. Check the VERIFICATION_REPORT.md for test results
3. Look for similar patterns in existing components
4. Refer to WCAG 2.1 guidelines for accessibility

**Happy coding! 🎨**
