---
name: premium-web-enhancement
description: Elevate websites into premium, distinctive, modern digital experiences using established open-source repositories (Tailwind, shadcn/ui, React Bits, Magic UI, Motion, Lucide, Three.js, R3F). Trigger when polishing UI, adding subtle depth, micro-interactions, or refining visual hierarchy without breaking existing features.
---

# 💎 Premium Website Enhancement — Established Open-Source Repositories

A battle-tested recipe card for transforming standard websites into charismatic, world-class, high-converting digital flagships using premier open-source components and animations.

---

## 🎯 When to Use This Skill
- Elevating a site from basic or utilitarian to high-ticket luxury/agency grade.
- Adding subtle micro-interactions, ambient gradients, interactive spotlight cards, or smooth transitions.
- Implementing 3D surface visualizers, interactive shader swatches, or dynamic container payload tools.
- Modernizing typography, glassmorphism surfaces, and cohesive design tokens.
- Whenever prompted with `/premium-web-enhancement` or requests to utilize curated open-source UI libraries.

---

## 🏛️ Curated Open-Source Repository Registry

| Repository | Canonical URL | Best For in Architectural & SaaS Sites |
|---|---|---|
| **Tailwind CSS** | [tailwindlabs/tailwindcss](https://github.com/tailwindlabs/tailwindcss) | Rapid utility styling, custom theme tokens (`--gold`, `--navy-deep`), responsive grids. |
| **shadcn/ui** | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | Accessible, headless primitives (dialogs, tabs, popovers, tooltips, dropdowns) with custom styling. |
| **React Bits** | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | Curated interactive React micro-components, spotlight borders, text pressure, and magnetic buttons. |
| **Magic UI** | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | Bento grids, shimmer buttons, animated gradient borders, marquee logos, and dock menus. |
| **Motion** | [motiondivision/motion](https://github.com/motiondivision/motion) | Smooth page transitions, spring animations, scroll-triggered reveals, layout animations. |
| **Lucide Icons** | [lucide-icons/lucide](https://github.com/lucide-icons/lucide) | Clean, consistent, lightweight SVG iconography across navigation, badges, and action bars. |
| **Three.js** | [mrdoob/three.js](https://github.com/mrdoob/three.js) | WebGL shaders, camera controls, physical material lighting (PBR), and 3D room simulations. |
| **React Three Fiber** | [pmndrs/react-three-fiber](https://github.com/pmndrs/react-three-fiber) | Declarative Three.js in React components with suspension, reactive state, and canvas controls. |

---

## 🛡️ Non-Negotiable Implementation Principles

1. **Inspect Before Modifying**:
   - Inspect existing packages, bundler (Vite/Next.js), React version, and styling configuration first.
   - Never rebuild the project or replace working frameworks merely to apply an aesthetic change.
2. **Selective Component Picking**:
   - Do NOT install entire heavy component libraries when a single clean utility or component satisfies the requirement.
   - Inline component code (shadcn/React Bits pattern) rather than bloating `node_modules` with transitive dependencies.
3. **Preserve Working Business Logic**:
   - Keep all existing routes, navigation tabs, RFQ inquiry forms, WhatsApp generators, and calculators 100% operational.
   - Never alter operational tools (e.g., container freight simulators) without explicit instruction.
4. **Performance & Accessibility First**:
   - Always honor `prefers-reduced-motion` using media queries or Motion's `useReducedMotion()`.
   - Prevent layout shifts (CLS) by giving images and 3D canvases explicit aspect ratios.
   - Use high-contrast color pairings meeting WCAG 2.1 AA standards.
5. **No Synthetic / Fake Data**:
   - Never inject fabricated client reviews, fake certifications, or placeholder buttons that lead nowhere.

---

## 🚀 Step-by-Step Enhancement Workflow

### Step 1: Environment & Dependency Audit
- Check `package.json` for installed UI tools (e.g., `motion`, `lucide-react`, `three`).
- Identify components needing visual elevation (Hero, Bento Matrix, Product Cards, CTA Banners).

### Step 2: Design Token & Typography Grounding
- Establish CSS variables for primary, secondary, and accent colors (e.g., architectural gold `#D4AF37`, deep navy `#090D16`).
- Preload distinctive typography (e.g., neo-grotesque `PP Neue Montreal` or `Plus Jakarta Sans`) to replace generic system fonts.

### Step 3: Polish Cards with Subtle Depth (React Bits / Magic UI Style)
- Add gentle hover-elevations, border glows (`border-white/10` to `border-[#D4AF37]/50`), and glassmorphism backdrops (`backdrop-blur-md`).
- Ensure full-bleed product photographs have clean, unencumbered viewing areas with corner pill badges.

### Step 4: Motion & Micro-Interactions (Motion division)
- Add subtle fade-in reveals (`initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}`).
- Implement smooth interactive hovers for action buttons (`whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}`).

### Step 5: Verification & Console Audit
- Verify the local development server hot-reloads cleanly with 0 runtime errors.
- Test across mobile, tablet, and desktop viewports.
- Confirm all interactive buttons (visualizer switches, quote modals, calculators) trigger their expected flows.
