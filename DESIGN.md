---
name: Verdant Modern
colors:
  surface: '#f5fcee'
  surface-dim: '#d5dccf'
  surface-bright: '#f5fcee'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff6e8'
  surface-container: '#e9f0e3'
  surface-container-high: '#e4eadd'
  surface-container-highest: '#dee5d7'
  on-surface: '#171d15'
  on-surface-variant: '#3f4a3b'
  inverse-surface: '#2c3229'
  inverse-on-surface: '#ecf3e5'
  outline: '#6e7b69'
  outline-variant: '#becab7'
  surface-tint: '#006e11'
  primary: '#006b11'
  on-primary: '#ffffff'
  primary-container: '#008818'
  on-primary-container: '#f8fff0'
  inverse-primary: '#6dde65'
  secondary: '#3b6936'
  on-secondary: '#ffffff'
  secondary-container: '#b9edad'
  on-secondary-container: '#3f6d3a'
  tertiary: '#aa2464'
  on-tertiary: '#ffffff'
  tertiary-container: '#ca3f7d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89fc7e'
  primary-fixed-dim: '#6dde65'
  on-primary-fixed: '#002202'
  on-primary-fixed-variant: '#00530a'
  secondary-fixed: '#bcf0b0'
  secondary-fixed-dim: '#a1d496'
  on-secondary-fixed: '#002202'
  on-secondary-fixed-variant: '#235020'
  tertiary-fixed: '#ffd9e3'
  tertiary-fixed-dim: '#ffb0ca'
  on-tertiary-fixed: '#3e001f'
  on-tertiary-fixed-variant: '#8d024e'
  background: '#f5fcee'
  on-background: '#171d15'
  surface-variant: '#dee5d7'
typography:
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
---

# Verdant Modern Design System

## Brand & Style

Verdant Modern is a sophisticated, growth-oriented design system that prioritizes clarity, vitality, and professional
efficiency. Moving away from high-energy neons, this iteration embraces a deeper, more grounded forest palette to evoke
feelings of sustainability, stability, and premium digital craft.

The style is **Modern / Corporate**, blending the reliability of a professional interface with the focused energy of
high-fidelity colors. It utilizes generous whitespace, rounded corners, and a balanced typographic scale to create a
welcoming environment for users.

## Colors

The palette is rooted in a rich, saturated "Fidelity" green, providing a more organic and established tech aesthetic.

- **Primary (#058a1a):** A deep, confident green used for primary actions and brand identity.
- **Secondary (#53824c):** A muted, sage-like green used for supporting UI elements and balanced emphasis.
- **Tertiary (#cf4381):** A vibrant berry-magenta accent used for highlights, calls-to-attention, or breaking the
  monochromatic flow.
- **Neutral (#72796e):** A balanced gray-green tint that provides a natural, low-strain background for text and UI
  containers.

The color mode is set to **Light**, ensuring a high-brightness, clean layout.

## Typography

We have transitioned to **Inter** for all typographic levels. Inter provides exceptional legibility on digital screens
and a neutral, modern tone that complements the rounded UI.

- **Headlines:** Set with a bold weight and tight tracking to command attention.
- **Body:** Optimized for readability with a standard 1.5 line-height.
- **Labels:** Medium-weight font used for buttons, navigation, and micro-copy to ensure clarity at small scales.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy, allowing components to breathe and adapt to various screen sizes. We use
a base-4 spacing rhythm to maintain mathematical consistency across margins, padding, and gutters.

- **Margins:** 24px for mobile, 32px for desktop.
- **Gutters:** 16px to maintain clear separation between content blocks.

## Elevation & Depth

Elevation is conveyed through **Tonal Layers** and soft, ambient shadows. Rather than harsh black shadows, we use
low-opacity shadows tinted with the neutral sage-gray color to create a natural sense of depth.

- **Surface Levels:** Lower surfaces use the neutral background, while elevated cards use surface-bright tones with a
  soft shadow.
- **Interaction:** Elements subtly lift on hover to provide tactile feedback.

## Shapes

The design system utilizes a **Rounded** (Level 2) language. This softening of the interface aligns with the fresh,
organic brand personality while maintaining professional structure.

- **Standard Components:** 0.5rem (8px) corner radius.
- **Large Containers/Cards:** 1rem (16px) corner radius.
- **Interactive Elements:** Fully rounded (pill-shaped) for small chips or 8px for standard buttons.

## Components

Components are designed to look approachable and professional.

- **Buttons:** Feature the primary deep green background with white text, using 8px rounded corners.
- **Inputs:** Utilize a subtle neutral border that thickens and turns primary green on focus.
- **Cards:** Light background surfaces with a 16px corner radius and a soft ambient shadow.
- **Chips:** Highly rounded (pill-style) using the tertiary berry or secondary sage for status indicators.
- **Selection:** Checkboxes and radios use the primary green for the active state, reinforcing the brand's
  growth-centric color.