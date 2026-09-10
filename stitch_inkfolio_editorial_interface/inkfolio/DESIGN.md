---
name: InkFolio
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#3f4945'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#707975'
  outline-variant: '#bfc9c4'
  surface-tint: '#29695b'
  primary: '#00342b'
  on-primary: '#ffffff'
  primary-container: '#004d40'
  on-primary-container: '#7ebdac'
  inverse-primary: '#94d3c1'
  secondary: '#a83900'
  on-secondary: '#ffffff'
  secondary-container: '#fc6018'
  on-secondary-container: '#531800'
  tertiary: '#4e2013'
  on-tertiary: '#ffffff'
  tertiary-container: '#693527'
  on-tertiary-container: '#e89f8c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#afefdd'
  primary-fixed-dim: '#94d3c1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#065043'
  secondary-fixed: '#ffdbcf'
  secondary-fixed-dim: '#ffb59a'
  on-secondary-fixed: '#380d00'
  on-secondary-fixed-variant: '#802a00'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a1'
  on-tertiary-fixed: '#370e04'
  on-tertiary-fixed-variant: '#6d382a'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
  background-primary: '#FFFFFF'
  background-secondary: '#FAFAFA'
  text-muted: '#6B6B6B'
  divider: '#E6E6E6'
typography:
  display-lg:
    fontFamily: Merriweather
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 60px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Merriweather
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Merriweather
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
  headline-sm:
    fontFamily: Merriweather
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  body-lg:
    fontFamily: Merriweather
    fontSize: 20px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Merriweather
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  ui-label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: 0.01em
  ui-label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  ui-label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1200px
  reading-width: 720px
  gutter: 24px
  margin-mobile: 20px
  stack-xl: 80px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style

This design system is built for high-quality reading experiences and editorial excellence. It prioritizes the written word through a "content-first" philosophy, where the interface retreats into the background to allow the narrative to take center stage. 

The aesthetic is rooted in **Minimalism** with a strong **Editorial** influence. It draws inspiration from traditional print journalism while utilizing modern digital affordances like fluid layouts and subtle interaction cues. The goal is to evoke a sense of focused calm, intellectual curiosity, and timelessness. The UI feels invisible yet intentional, using generous whitespace and a restricted color palette to signal premium quality and clarity.

## Colors

The palette is strictly functional, designed to maximize legibility and minimize eye strain. 

- **Primary Backgrounds:** White (#FFFFFF) is used for the main reading canvas to provide maximum contrast. Off-white (#FAFAFA) is utilized for secondary panels, sidebars, or meta-information sections to create subtle depth without borders.
- **Typography:** The near-black (#1A1A1A) ensures high readability for long-form text while appearing softer and more organic than pure black. 
- **Accents:** Deep Green (#004D40) serves as the primary action color for buttons and high-priority links, signaling growth and stability. A muted orange can be used sparingly for "New" tags or specific highlights.
- **Dividers:** Use very thin, light gray lines (#E6E6E6) only when necessary to separate distinct content streams.

## Typography

Typography is the cornerstone of this design system. We use a dual-font approach to distinguish between storytelling and navigation.

- **The Serif Stack (Merriweather):** Used for all narrative elements, including titles, subtitles, and body copy. It is optimized for long-form reading with generous line heights and open counters.
- **The Sans-Serif Stack (Inter):** Used for the "scaffolding" of the site—navigation menus, buttons, labels, metadata, and tooltips. This creates a clear functional distinction: Serif is for reading, Sans is for doing.
- **Scaling:** Headings scale down significantly on mobile to maintain vertical rhythm. Body text remains large (minimum 18px) to ensure accessibility across all devices.

## Layout & Spacing

The layout is governed by the "Golden Thread" principle: the primary content column should never exceed a width that compromises readability (optimally 720px).

- **Grid Model:** A fluid 12-column grid is used for discovery pages and index views. For article pages, a centered single-column layout is preferred.
- **Breathing Room:** Use aggressive vertical spacing (`stack-xl`) between major sections to prevent visual clutter. 
- **Responsive Behavior:** 
  - **Desktop:** Wide margins with optional "outset" elements (images or quotes) that break the 720px container.
  - **Tablet:** 12-column grid collapses to 8 columns; margins reduce to 32px.
  - **Mobile:** Single column with 20px side margins. Navigation typically hides into a simplified top bar or bottom sheet.

## Elevation & Depth

This design system avoids heavy shadows and physical metaphors. Depth is communicated through:

- **Tonal Layering:** Using the Off-white (#FAFAFA) surface to sit "behind" the primary White (#FFFFFF) content cards or headers.
- **Subtle Dividers:** 1px solid lines (#E6E6E6) create horizontal breaks in content streams without adding visual weight.
- **Ghost Effects:** Buttons and interactive cards use low-contrast outlines or subtle background shifts on hover rather than lifting off the page with shadows.
- **Focus:** When a modal or overlay is active, the background is dimmed with a light transparency rather than a heavy blur to maintain the clean, sharp editorial look.

## Shapes

The shape language is primarily **Soft (Level 1)**. 

- **UI Elements:** Buttons, input fields, and tags use a minimal 0.25rem (4px) radius. This provides a modern touch without feeling "bubbly" or overly casual.
- **Avatars:** To contrast with the structured, rectangular nature of the grid and text blocks, user avatars are always circular (fully rounded).
- **Media:** Images and video embeds should remain sharp (0px radius) to mimic the look of printed photography in a magazine.

## Components

- **Buttons:** Primary buttons are solid Deep Green (#004D40) with white text. Secondary buttons are "Ghost" style with a thin border and #1A1A1A text. Use Inter for button labels.
- **Input Fields:** Minimalist design with only a bottom border that thickens or changes color on focus. No heavy boxes.
- **Chips/Tags:** Used for categories. Light gray background (#F2F2F2) with small-caps or bold Inter text.
- **Lists:** Content lists use generous vertical padding and thin horizontal dividers. Headlines in lists should use the Serif font.
- **Cards:** Eschew borders and shadows; use whitespace and typography to define the boundaries of a card.
- **Icons:** Use thin-line (2px or 1.5px stroke) icons. Icons should always be accompanied by labels or have extremely clear universal meanings.
- **Progress Indicators:** A thin line at the very top of the viewport to indicate reading progress in long articles.