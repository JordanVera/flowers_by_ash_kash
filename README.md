# Fiore — independent florist template

A configurable Next.js 16 App Router project with TypeScript, Tailwind CSS 4, shadcn/Radix dialog components, Framer Motion, and responsive Next Image photography.

## Setup

Use Node 20.9+.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Production build and start:

```bash
npm run build
npm run start
```

Deploy to any Node host that supports Next.js, including Vercel.

## Personalize

Edit `src/siteConfig.ts` for business name, location, phone, address, hours, service ZIP codes, delivery fee, website URL, and ecommerce flag. Set `hasEcommerce: false` to remove shopping controls and redirect shopping routes to gallery/contact. Edit `src/lib/content.ts` for products and stories; theme tokens and responsive styles are in `src/app/globals.css`. Replace the editorial story, testimonials, and brand wordmark in `src/components/florist/` with approved business content. Set `demo: false` only after replacing sample details to enable indexing and local-business schema. This template intentionally starts noindex.

Reusable components: Header, Footer, ContactCTA, ProductCard, Catalog, Gallery/lightbox, ContactForm, CartProvider, Cart, Admin, Home. Routes: `/`, `/shop`, `/gallery`, `/about`, `/contact`, `/stories`, `/stories/[slug]`, `/cart`, `/order-confirmation`, `/admin`.

## Email inquiries

Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` (verified sender), and `CONTACT_TO_EMAIL` on the deployment platform. The contact endpoint validates inputs, includes a spam honeypot and same-origin checks, and sends a plain-text email with reply-to. Missing configuration returns an honest unavailable state, never a simulated success. Before public launch add provider/edge rate limiting or a CAPTCHA appropriate for your traffic; this starter does not promise durable spam throttling.

## Ecommerce

Set `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_SITE_URL` (trusted full origin). Use Stripe test keys first. Checkout prices and ZIP eligibility are validated server-side; card details remain on Stripe-hosted Checkout. Checkout includes local delivery and card/delivery notes. Final delivery address must be verified by the studio against the chosen service ZIP before fulfilling. Taxes and delivery scheduling are business-specific and must be configured before accepting live orders. Stripe is the durable source of payment and order records; no local database is required. For automated fulfillment, add a signature-verified Stripe webhook and idempotent processing; no automatic fulfillment is included here.

Set a long random `ADMIN_ACCESS_KEY` (at least 32 characters) to access `/admin`. The key remains in component memory and is sent as a bearer header. Admin loads the most recent 100 paid Stripe Checkout sessions and stores fulfillment status in session metadata. Add provider rate limiting, staff identity, and pagination for a larger operation. Keep all secret keys server-only; never prefix secrets with `NEXT_PUBLIC_`. Do not commit `.env` files.

## Gallery and optional integrations

An `instagram-feed` mount point is present on `/gallery` for a future approved feed provider. The footer links to Instagram; replace it with the business profile. The map currently shows the Portland service area. SMS, subscriptions, uploads, and dark mode are not enabled.

## Photography & sample content

Photos are reference/demo content from third-party pages. Reuse rights are not verified. Replace with your own or licensed photos before public commercial launch. Sources:

- hero.jpg / bouquet-2.jpg: https://www.ayaflowersla.com/products/no-019-rosy-dream
- bouquet-1.jpg: https://www.gracerosefarm.com/products/purity
- bouquet-3.jpg: https://www.guernseyflowersbypost.co.uk/products/orange-tulip-flowers
- bouquet-4.jpg: https://www.rosaprima.com/catalog/aurora-gardens
- studio.jpg: https://www.kocker.com.br/produto/avental-sebastian-caqui.html

Names, address, testimonials, studio story, products, and prices are illustrative. Next Image uses responsive sizes and the standard Next.js optimizer. Image dimensions are reserved to limit layout shift.

## Accessibility and verification

Semantic navigation, skip link, labeled forms, keyboard-operable controls, focus indicators, Radix lightbox focus management, reduced-motion support, and responsive breakpoints are included. Run `npx tsc --noEmit` and `npm run build`. Exercise filtering, lightbox/Escape, cart quantity/removal, eligible/ineligible ZIPs, missing-key responses, Stripe test payment, and email delivery. A Lighthouse 90+ score and full WCAG AA conformance require auditing the final branded site and real integrations; they are targets, not certified results.
