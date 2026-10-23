---
name: Tor-Li Booking System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3e4850'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6e7881'
  outline-variant: '#bdc8d1'
  surface-tint: '#00658d'
  primary: '#00658d'
  on-primary: '#ffffff'
  primary-container: '#00aeef'
  on-primary-container: '#003e58'
  inverse-primary: '#82cfff'
  secondary: '#4648d4'
  on-secondary: '#ffffff'
  secondary-container: '#6063ee'
  on-secondary-container: '#fffbff'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#10b981'
  on-tertiary-container: '#00422b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c6e7ff'
  primary-fixed-dim: '#82cfff'
  on-primary-fixed: '#001e2d'
  on-primary-fixed-variant: '#004c6b'
  secondary-fixed: '#e1e0ff'
  secondary-fixed-dim: '#c0c1ff'
  on-secondary-fixed: '#07006c'
  on-secondary-fixed-variant: '#2f2ebe'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Rubik
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Rubik
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Rubik
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Rubik
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Rubik
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Rubik
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Rubik
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Rubik
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Rubik
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Rubik
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Rubik
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 1rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system powers a modern consumer mobile booking experience tailored natively for Hebrew speakers. Inspired by agile, delightfully tactile on-demand consumer applications like Wolt, the interface delivers frictionless appointment scheduling across beauty, healthcare, personal care, and professional services.

The design ethos balances consumer playfulness with operational efficiency:
- **Tone:** Optimistic, responsive, dependable, and delightfully intuitive.
- **Visual Style:** Modern Soft-Consumer UI—marked by clean surface layering, pill-shaped chips and badges, saturated primary buttons, generous tap targets, and ambient depth.
- **RTL-Native Priority:** Complete right-to-left layout architecture where temporal progressions (timelines, calendar pagers, step wizards), icon orientations, and directional gestures naturally align with the right-to-left Hebrew reading path.

## Colors

The palette establishes an energetic, reliable visual anchor:
- **Primary Accent (`#00AEEF`):** An electric Mediterranean cyan-blue driving key visual triggers: primary CTAs, active calendar dates, and primary status indicators.
- **Secondary Accent (`#6366F1`):** A warm modern indigo-violet for category highlights, loyalty tiers, and distinct service groupings.
- **Tertiary Accent (`#10B981`):** A crisp emerald green communicating instant confirmation, open booking slots, and active availability.
- **Neutrals (`#64748B` Slate Family):** Slate tones offer soft, glare-free legibility. Background canvases sit on crisp tinted white (`#F8FAFC`), elevated cards rest on pure white (`#FFFFFF`), with subtle hairline borders (`#E2E8F0`) providing crisp card boundaries.

## Typography

The design system standardizes on **Rubik** across all typographic hierarchies. Rubik delivers geometric warmth with soft rounded stroke terminals, offering exceptional optical balance and legibility in Hebrew alongside Latin numbers and symbols (such as ₪).

Guidelines:
- **Bi-directional Flow:** Numerical values, currency signs, and times (e.g., `14:30`, `₪120`) preserve logical order while embedded seamlessly inside right-to-left sentence structures.
- **Weight Contrast:** Headlines leverage weights `600` and `700` to anchor scanning patterns, while body copy maintains weight `400` with open line heights (`1.4`–`1.5`) to prevent Hebrew vowel marks and ascenders/descenders from crowding.
- **Letter Spacing:** Keep tracking neutral (`0px` or slightly negative `-0.01em` on large headlines); avoid wide tracking which disrupts Hebrew character cohesion.

## Layout & Spacing

Layouts adhere to an 8px spatial grid with mobile-first viewport constraints:
- **Canvas Margins:** Mobile edges retain a strict `16px` outer margin (`margin-mobile`), ensuring full accessibility on one-handed devices.
- **Horizontal Scrollers:** Horizontal carousels (category pills, top stylists, upcoming days) use negative right margins to cleanly bleed into the screen edge while padding the initial rightmost card by `16px`.
- **Vertical Rhythm:** Service lists and modular cards maintain consistent `12px` to `16px` vertical gaps (`space-md` to `space-lg`).
- **Touch Targets:** All clickable interactive elements (time slots, stepper controls, navigation triggers) require an absolute minimum hit-target size of `44x44px`.

## Elevation & Depth

Visual hierarchy uses clean multi-level surfaces rather than heavy dark shadows:
- **Level 0 (Canvas):** Background foundation in cool tint `#F8FAFC`.
- **Level 1 (Cards & Tiles):** White surface `#FFFFFF` elevated via a delicate ambient shadow: `box-shadow: 0 4px 20px -2px rgba(15, 23, 42, 0.06), 0 0 1px rgba(15, 23, 42, 0.08)`.
- **Level 2 (Active Elements & Modals):** Selected date pills, bottom sheets, and floating reservation summaries use `box-shadow: 0 12px 32px -4px rgba(0, 174, 239, 0.18), 0 2px 8px -2px rgba(15, 23, 42, 0.08)`.
- **Glass / Sticky Navigation:** Floating bottom navigation and top sticky headers leverage backdrop blur (`backdrop-filter: blur(16px); background: rgba(255, 255, 255, 0.88)`), creating a seamless content pass-through effect.

## Shapes

The design system embraces high roundedness (Level 3 - Pill/Super-elliptical) to evoke the soft, approachable feel of modern consumer delivery and booking services:
- **Cards & Sheets:** Base cards use `rounded-2xl` (16px) or `rounded-3xl` (24px) for prominent hero banners and bottom action sheets.
- **Buttons & Chips:** Interactive chips, filter pills, search bars, and primary CTAs use fully rounded pill geometry (`rounded-full` / 9999px radius).
- **Time Slots & Badges:** Calendar slot blocks use roundedness between 12px and 16px to feel friendly, clickable, and finger-friendly.

## Components

### Action Buttons
- **Primary CTA:** Full-width pill (`height: 52px`), vibrant cyan gradient/fill (`#00AEEF`), high-contrast white bold text, and a soft cyan glow shadow. On active press, subtle scale-down (`transform: scale(0.98)`).
- **Secondary CTA:** Light tinted cyan-gray surface (`#E0F2FE`), cyan text (`#0284C7`), without borders.

### Date & Calendar Slots
- **Horizontal Date Scroller:** Segmented daily cards showing Day of Week (Hebrew, e.g., "א׳", "ב׳"), date numeral, and dot indicator for availability.
- **Selected State:** Solid cyan fill with inverted white typography and subtle elevation.
- **Time Slot Chips:** Compact pill badges (e.g., `10:30`, `11:00`) arranged in a 3- or 4-column responsive grid; unavailable slots display in muted gray (`#CBD5E1`) with strikethrough.

### Service & Provider Cards
- **Structure:** White card (`rounded-2xl`), subtle hairline border (`#F1F5F9`), featuring provider thumbnail/avatar on the right, title and service details in the center, and price/duration indicator on the left (RTL configuration).
- **Meta Chips:** Compact badges displaying ratings (★ 4.9), distance, or duration ("30 דק׳") styled with soft tinted neutral backgrounds.

### Floating Bottom Navigation
- **Dock Pattern:** Detached pill dock elevated above bottom screen boundary with integrated home, search, appointments ("תורים"), and profile tabs. Active states highlighted with electric cyan icons and micro-dot indicators.

### Inputs & Search
- **Search Bar:** Pill-shaped text input with magnifying glass aligned strictly to the right edge and clear button on the left edge. Light gray surface fill (`#F1F5F9`) transitioning to white with cyan border on focus.