# Unbound Compute Marketing Design System

<!-- impeccable:design-schema 1 -->

## Direction

Evidence Ledger. The marketing site feels like a serious research dossier: calm paper for explanation, dark evidence plates for code and returned output, and one signal color for the exact moment a trusted boundary fails. The page persuades by showing the mechanism in the first viewport.

## Surface mode

Persuade. A first-time visitor should understand what Unbound Compute does, see how Lachesis proves a finding, and reach either a real casefile or private access within seconds.

## Materials

- Warm uncoated paper for the marketing canvas.
- Ink and pencil-like rules for structure, never decorative grid wallpaper.
- Dark instrument panels for source code, commands, and returned evidence.
- Small stamped labels for record type, status, and source location.
- No generic glass cards, gradient text, neon glow, or fictional dashboard activity.

## Colors

```css
--paper: #f3efe7;
--paper-raised: #faf7f1;
--paper-deep: #e7dfd3;
--ink: #171715;
--ink-secondary: #5f5c55;
--ink-muted: #807b72;
--rule: #d5ccc0;
--rule-soft: rgba(23, 23, 21, 0.08);
--signal: #c65d43;
--signal-hover: #a94835;
--on-signal: #171715;
--verified: #55725e;
--observed: #6f7e81;
--attention: #a97939;
--evidence: #1b1d1b;
--evidence-raised: #242724;
--evidence-text: #f0ebe1;
--evidence-muted: #aaa69e;
--evidence-rule: rgba(240, 235, 225, 0.12);
```

Signal colors are semantic. Coral marks a crossed boundary or primary action. Sage marks verified or fixed. Steel marks neutral observation. Amber marks attention or uncertainty. Do not use coral as general decoration.

## Typography

- Display: Newsreader, large but controlled, with balanced line lengths and no sudden oversized copy.
- Body: IBM Plex Sans, readable at 16 to 19px with a 65 to 75ch measure.
- Evidence: JetBrains Mono only for commands, paths, line numbers, and returned output.
- Avoid all-caps body copy. Use small caps only for record labels.

## Layout

- Detached, compact navigation with a real mobile menu.
- Editorial split hero: thesis and action on the left, one real evidence plate on the right.
- Sections alternate between quiet explanation and dense proof.
- Use asymmetry deliberately. Avoid repeated equal three-column card grids.
- Section spacing ranges from 96px to 168px on desktop and 56px to 88px on mobile.
- Major evidence plates use an outer paper frame and one dark inner core. Do not nest generic cards.
- Mobile collapses every split into one readable column with no horizontal page overflow.

## First viewport contract

The visitor sees the product mechanism immediately:

1. “Your application has rules. Lachesis finds where they fail.”
2. A concise explanation of source understanding plus authorized research.
3. A real historical CVE trace link and private-access CTA.
4. A dark evidence plate showing a Lachesis query, returned result, and source line.

## Interaction and motion

- One authored motion: the evidence trace line advances from source to sink when the plate enters view.
- Use transform and opacity with a custom ease-out curve.
- Respect reduced motion by leaving the evidence fully visible and still.
- Buttons use clear hover, focus, active, disabled, and external-link states.
- No full-screen animated canvas or decorative background field.

## Content rules

- Show the mechanism before repeating the claim.
- Label historical CVE knowledge separately from what Lachesis established.
- Never invent customer names, benchmarks, production findings, or testimonials.
- Use “sample data” on the interactive console and “historical reconstruction” on the Casefiles link.

## Responsive rules

- Desktop composition begins at 900px.
- Tablet keeps the editorial split only when both columns retain readable measures.
- Below 760px, use one column, 20px side padding, 44px minimum touch targets, and no clipped oversized text.
- Navigation becomes an accessible overlay with `aria-expanded`, Escape support, and focus visibility.
