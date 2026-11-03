---
name: lovable-designer
description: Create and sync beautiful, charismatic, and adorable UI components using the Lovable MCP server and Framer Motion micro-interactions. Trigger when polishing UI aesthetics, generating lovable widgets, or syncing design tokens with Lovable.
---

# 🌸 Lovable Designer — Charismatic & Adorable UI Engineering

A lightweight recipe card for designing lovable, high-converting, charismatic interfaces combining **Lovable MCP (`https://mcp.lovable.dev`)**, **Framer Motion**, and **Tailwind CSS**.

---

## 🎯 When to Use This Skill
- Creating charming, adorable micro-interactions (wax seal stamps, playful reaction pills, gentle floating badges).
- Syncing or generating UI components through the Lovable MCP server.
- Adding joyful spring physics, tactile button feedback, and radiant gold shimmer effects to modern luxury websites.

---

## 🛠️ Lovable MCP Server Architecture

The workspace connects directly to Lovable via Streamable HTTP:
- **Endpoint**: `https://mcp.lovable.dev`
- **Configuration**: Defined in `.agents/mcp_config.json`
- **Auth**: Automated browser OAuth prompt on first tool call.

---

## 🎨 Adorable & Charismatic UI Principles

1. **Delightful Tactile Feedback**:
   - Buttons should respond with gentle spring bounces (`whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}`).
   - Interactive stamps and seals use elastic overshoot physics.
2. **Whimsical Yet Prestigious Badges**:
   - Soft pastel glassmorphism with subtle borders (`border-[#C5A059]/40`).
   - Floating micro-bob animations (`@keyframes float-gentle`) for signature features.
3. **Cohesive Heritage Tokens**:
   - Regal Gold (`#D4AF37`, `#C5A059`), Emerald Depths (`#0E241B`, `#091913`), and Warm Parchment (`#FAF8F5`, `#DFCEB2`).
4. **Preserve Integrity**:
   - Never remove or compromise existing form handlers, webhooks, or responsive constraints.