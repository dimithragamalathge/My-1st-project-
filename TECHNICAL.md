# Technical Reference

This document is for developers working on this project. It is NOT for the product owner.
See `CLAUDE.md` for communication guidelines and project context.

---

## Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Frontend | Next.js (App Router) + React | Battle-tested, excellent mobile performance, SSR/SSG support, Vercel-native |
| Styling | Tailwind CSS | Utility-first, fast to iterate, consistent design system |
| Database | SQLite via Prisma ORM | Zero-cost, zero-ops, perfect for small team; easy to migrate to PostgreSQL later |
| Auth | NextAuth.js (Credentials provider) | Simple username+PIN auth for 1-3 users; no OAuth complexity needed |
| Image storage | Local filesystem (dev) / Vercel Blob or Cloudflare R2 (prod) | Free tier sufficient for receipt photos at this scale |
| Hosting | Vercel | Free tier, zero-config Next.js deployment, excellent mobile CDN |

---

## Architecture Overview

```
/app
  /dashboard        → Inventory overview (main landing page)
  /inventory        → Manage items and stock levels
  /expenses         → Log and view expenses
  /api              → Next.js API routes
    /inventory/     → CRUD for inventory items and stock updates
    /expenses/      → CRUD for expenses, receipt upload
    /auth/          → NextAuth endpoints
/components         → Shared UI components
/lib                → Prisma client, utility functions, auth config
/prisma             → Schema and migrations
/public             → Static assets
```

---

## Data Model

### User
```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  role      Role      @default(STAFF)   // OWNER | STAFF
  pin       String                       // hashed
  expenses  Expense[]
  createdAt DateTime  @default(now())
}
```

### InventoryItem
```prisma
model InventoryItem {
  id           String   @id @default(cuid())
  name         String
  category     Category // TOILETRIES | LINENS | CLEANING | KITCHEN
  quantity     Int      @default(0)
  minThreshold Int      @default(1)     // below this = low stock warning
  unit         String?                  // e.g. "rolls", "sets", "bottles"
  updatedAt    DateTime @updatedAt
}
```

### Expense
```prisma
model Expense {
  id          String   @id @default(cuid())
  amount      Float
  description String
  category    String
  receiptUrl  String?                   // path or URL to uploaded receipt image
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
}
```

---

## Key Design Decisions

**Why SQLite instead of PostgreSQL/Supabase?**
For 1-3 concurrent users with modest write frequency, SQLite is more than sufficient.
Zero configuration, zero cost, single-file backup. Can be migrated to PostgreSQL with
a single Prisma datasource change if the business scales.

**Why PIN-based auth instead of passwords/OAuth?**
The team is 1-3 people who know each other. A simple 4-6 digit PIN is faster to use
on mobile and eliminates password management friction. PINs are bcrypt-hashed.

**Why Vercel Blob for receipt images?**
Free tier allows 1GB storage and 1GB/month bandwidth — more than sufficient for
receipt photos at this scale. Images are stored with a unique key derived from expense ID.

**Why Next.js App Router?**
Server components reduce JS bundle size (critical for mobile). Built-in API routes
eliminate a separate backend service. Vercel deployment is zero-config.

---

## Mobile-First Guidelines

- All layouts use `flex-col` by default, `md:flex-row` for larger screens
- Touch targets minimum 44×44px (Tailwind: `min-h-11 min-w-11`)
- No hover-only interactions — everything must work with tap
- Camera/file input for receipt photos must use `capture="environment"` on mobile
- Test on 375px width (iPhone SE) as minimum supported viewport

---

## Color Palette

```
Primary:    #1B2A4A  (deep navy)
Accent:     #C8902A  (warm gold)
Warning:    #D97706  (amber — low stock alerts)
Danger:     #DC2626  (red — critical low)
Background: #F9F7F4  (warm off-white)
Surface:    #FFFFFF
Text:       #1A1A2E
Muted:      #6B7280
```

---

## Development Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in: NEXTAUTH_SECRET, DATABASE_URL, BLOB_READ_WRITE_TOKEN

# Initialize database
npx prisma migrate dev

# Run dev server
npm run dev
```

---

## Testing Strategy

- **Unit tests**: Vitest for utility functions (threshold logic, category helpers)
- **Integration tests**: Supertest against API routes for inventory and expense CRUD
- **E2E tests**: Playwright for critical flows (login, update stock, log expense)
- Run `npm test` before any commit; CI runs tests automatically on push

---

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | SQLite file path (dev) or PostgreSQL URL (prod) |
| `NEXTAUTH_SECRET` | Random secret for session signing |
| `NEXTAUTH_URL` | App URL (e.g. https://yourapp.vercel.app) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for receipt image uploads |

---

## Future Considerations

- If team grows beyond ~10 users: migrate to PostgreSQL (Supabase free tier)
- If email alerts are requested: add Resend integration (free tier, simple API)
- If multi-property support is needed: add `Property` model and scope all data
- If offline support is required: consider PWA + service worker approach
