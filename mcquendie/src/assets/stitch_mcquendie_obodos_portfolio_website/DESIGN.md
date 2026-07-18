---
name: Terra Obsidian
colors:
  surface: '#1d1108'
  surface-dim: '#1d1108'
  surface-bright: '#46362c'
  surface-container-lowest: '#170b05'
  surface-container-low: '#261910'
  surface-container: '#2a1d14'
  surface-container-high: '#36271d'
  surface-container-highest: '#413127'
  on-surface: '#f8ddcf'
  on-surface-variant: '#d6c3b4'
  inverse-surface: '#f8ddcf'
  inverse-on-surface: '#3d2d23'
  outline: '#9e8e80'
  outline-variant: '#514439'
  surface-tint: '#fdb970'
  primary: '#fdb970'
  on-primary: '#492900'
  primary-container: '#c08441'
  on-primary-container: '#402300'
  inverse-primary: '#865313'
  secondary: '#feb874'
  on-secondary: '#4a2800'
  secondary-container: '#6d3d02'
  on-secondary-container: '#eeaa68'
  tertiary: '#e6c09a'
  on-tertiary: '#432c11'
  tertiary-container: '#ac8b68'
  on-tertiary-container: '#3b250b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#fdb970'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#683c00'
  secondary-fixed: '#ffdcbf'
  secondary-fixed-dim: '#feb874'
  on-secondary-fixed: '#2d1600'
  on-secondary-fixed-variant: '#6a3b00'
  tertiary-fixed: '#ffdcbb'
  tertiary-fixed-dim: '#e6c09a'
  on-tertiary-fixed: '#2b1701'
  on-tertiary-fixed-variant: '#5c4225'
  background: '#1d1108'
  on-background: '#f8ddcf'
  surface-variant: '#413127'
typography:
  display-lg:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.05em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  mono-label:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap-desktop: 120px
  section-gap-mobile: 64px
---

## Brand & Style

The design system is crafted for a premium developer portfolio that balances technical precision with an organic, human warmth. The aesthetic—described as "coffee-meets-Linear"—moves away from the cold, neon-blue tropes of technology and instead embraces a sophisticated dark-mode palette rooted in earth tones.

The style is **Minimalist Modern** with a focus on **Glassmorphism**. It utilizes depth through translucent layers, subtle warm-toned glows, and blurred background gradients to create a sense of three-dimensional space. The target audience is high-end clients and recruiters looking for a developer who possesses both technical rigor and an eye for refined, high-quality aesthetics. The emotional response is one of calm, reliability, and "quiet luxury."

## Colors

The palette is strictly warm, revolving around deep browns and metallic accents. There are no blues or greens present.

- **Background (Base):** `#2b1d14` (Deep Brown) serves as the canvas for the entire UI.
- **Primary (Caramel):** `#a9702f` is used for primary actions, active states, and key highlights.
- **Secondary (Copper):** `#c98a4b` is utilized for secondary interactive elements and decorative gradients.
- **Tertiary (Warm Sand):** `#d9b48f` is used for high-contrast text on dark backgrounds and subtle borders.
- **Muted (Deep Bronze):** `#5c3a21` provides depth for card backgrounds and container strokes.

Background depth is achieved using "Copper Blobs"—soft, radial gradients of `#a9702f` at 10-15% opacity, blurred significantly (100px+) and placed behind content sections.

## Typography

This design system uses a high-contrast typographic pairing. **Space Grotesk** is used for all headlines and display text, emphasizing its geometric and technical nature. Headlines should use generous letter-spacing (tracking) when in uppercase to enhance the premium feel.

**Inter** is the workhorse for body copy and labels. It provides maximum legibility against dark backgrounds. For body text, a slightly increased line height (1.6) is preferred to ensure a comfortable reading rhythm and to support the "generous whitespace" philosophy.

## Layout & Spacing

The layout follows a **Fixed Grid** model on desktop, centered with a maximum width of 1200px. It utilizes a 12-column system. 

The rhythm is defined by a 8px base unit. Section vertical spacing is intentionally large (120px) to allow the "blobs" and glassmorphism effects enough room to breathe without cluttering the content. 

**Breakpoints:**
- **Desktop (1024px+):** 12 columns, 24px gutters, 120px section gaps.
- **Tablet (768px - 1023px):** 8 columns, 20px gutters, 80px section gaps.
- **Mobile (Up to 767px):** 4 columns, 16px gutters, 64px section gaps.

## Elevation & Depth

Elevation is not communicated through standard black shadows, but through **Tonal Layering** and **Backdrop Blurs**.

1.  **Level 0 (Base):** The deep brown `#2b1d14` background.
2.  **Level 1 (Cards/Surface):** A semi-transparent fill using `#5c3a21` at 40% opacity with a `24px` backdrop blur. It features a 1px border using `#d9b48f` at 10% opacity.
3.  **Level 2 (Hover/Active):** When a card is hovered, the border opacity increases to 30%, and a subtle inner glow (box-shadow: inset 0 0 20px rgba(169, 112, 47, 0.1)) is applied.
4.  **Overlays (Navigation):** The sticky navigation bar uses a higher blur (40px) and a slightly lighter tint to appear visually "closer" to the user.

## Shapes

The design system employs a **Rounded** aesthetic. Base components like cards and input fields use an 8px (`0.5rem`) radius. Large containers or featured project cards use a 16px (`1rem`) radius. Buttons and skill chips use a pill-shaped radius (full round) to provide a soft, approachable contrast to the geometric typography.

## Components

- **Sticky Navigation:** A top-fixed, narrow bar. Background: `#2b1d14` at 70% opacity with `32px` backdrop-blur. 1px bottom border in `#5c3a21`.
- **Buttons:** 
    - *Primary:* Solid `#a9702f` fill with `#2b1d14` text. Pill-shaped.
    - *Secondary:* Ghost style with a 1.5px border of `#c98a4b` and matching text.
- **Project Cards:** Uses the Level 1 elevation. Images should have a subtle greyscale filter that shifts to full color on hover.
- **Skill Chips:** Small, pill-shaped tags. Background: `#5c3a21` at 50% opacity; Text: `#d9b48f`; Font: `mono-label`.
- **Input Fields:** Darker than the base background (`#1f150e`). 1px border that glows with the copper accent color on focus.
- **Glow Accents:** Soft, non-interactive radial gradients used behind featured elements to guide the eye without adding structural weight.