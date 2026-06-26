# Claude Development Guide

## Key Resources

### LLM Development Reference
- **`docs/llms.txt`** — Comprehensive reference documentation for development. Always consult this file for context, patterns, and implementation guidance.

## Required Skills

### Ecommerce Storefront Best Practices
When working on ANY ecommerce storefront features, ALWAYS load the `ecommerce-storefront:storefront-best-practices` skill.

**When to use:** Checkout pages, cart, payment flows, product pages, product listings, navigation, homepage, or ANY page/component in a storefront.

**Examples of work that requires this skill:**
- Adding checkout functionality
- Implementing cart management
- Integrating Medusa backend
- Building product pages and listings
- Designing navigation and filters
- Any ecommerce feature development

This skill is framework-agnostic (Next.js, SvelteKit, TanStack Start, React, Vue) and provides patterns, decision frameworks, and backend integration guidance.

## Project Context

This is a **Next.js + Medusa v2 storefront** project. 

### Current Architecture
- **Frontend:** Next.js 15.3.9 with App Router, TypeScript, Tailwind CSS
- **Backend:** Medusa v2 (hosted at https://medusav2-production.up.railway.app)
- **Internationalization:** next-intl for multi-language support
- **Search:** Meilisearch with instant search
- **Payment:** Stripe integration
- **Performance:** Next.js Turbopack, Vercel Speed Insights

### Known Constraints
- Next.js data cache has a 2MB limit per request
- Product listings should use lean queries to avoid exceeding cache limits
- Images should be lazy-loaded where possible

## Development Workflow

1. **Read the llms.txt reference** before starting any implementation
2. **Use ecommerce-storefront skill** for any storefront feature work
3. **Check existing patterns** in the codebase before creating new ones
4. **Test in mobile browsers** (the project supports mobile access at `http://<laptop-ip>:8000`)
