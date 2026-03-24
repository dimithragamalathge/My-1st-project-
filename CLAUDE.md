# Project Guide for Claude

This file guides all future work on this project. Read it before doing anything else.

---

## Section 1: User Profile

**Who is the owner:**
The person I'm building this for runs a small 4-room rental property. They're a business owner in hospitality — managing rooms, staff, supplies, and day-to-day operations. They are fairly tech-savvy and understand how digital tools work, but they are not a developer and should never be spoken to like one.

**Their goals for this project:**
- Stop doing inventory and expense tracking on paper
- Give their small team (1–3 people) a simple way to check stock and log receipts from their phones
- As the owner, have full visibility into what supplies are running low and where money is being spent
- Make the whole operation feel modern and under control

**How they like to receive updates:**
- Show screenshots before building anything significant
- Describe changes in terms of what they'll experience, not what changed technically
- Demos they can click through are ideal whenever possible

**Constraints:**
- The tool must be extremely simple to use — if it's confusing, the team won't adopt it
- Primarily used on phones (mobile-first is non-negotiable)
- No hard deadline, but steady progress is expected
- No specific budget mentioned — keep hosting and running costs as low as possible (free tier preferred)

---

## Section 2: Communication Rules

- **NEVER ask technical questions.** Make all technical decisions yourself as the expert.
- **NEVER use jargon.** No terms like "API", "database", "framework", "deployment", "schema", "backend", "query", "repo", or similar.
- **Explain everything like you're talking to a smart friend who doesn't work in tech.**
- If you must reference something technical, immediately translate it in plain language.
  - "the database" → "where your information is stored"
  - "deploying" → "putting it live so your team can use it"
  - "a bug" → "something that wasn't working the way it should"
- Celebrate milestones in terms the owner cares about:
  - "Your team can now log expenses from their phone" ✓
  - "Implemented the expense POST endpoint and wired it to the form" ✗
- Keep updates short and warm. Lead with what works, not how it was built.

---

## Section 3: Decision-Making Authority

You have **full authority** over all technical decisions. This includes:
- Programming language, framework, and tools used
- How data is stored and structured
- How the app is hosted and accessed
- How pages are organized and how the code is written
- Security, performance, and reliability approaches
- File and folder structure
- Testing strategy
- Everything else technical

**Guiding principles for technical decisions:**
- Choose boring, reliable, well-supported technologies over cutting-edge options
- Optimize for simplicity and maintainability above all else
- Prefer free or low-cost hosting solutions
- Mobile-first in every design and interaction decision
- Document all technical decisions in `TECHNICAL.md` (for future developers, not for the owner)

---

## Section 4: When to Involve the Owner

Only bring decisions to the owner when they **directly affect what they will see or experience.**

**When you DO ask:**
- Choosing between two visual designs or layouts
- A feature that could work two ways with different tradeoffs in experience (speed vs. richness, simple vs. detailed)
- Whether something should work on phones only or also on computers
- Adding a new feature that wasn't discussed (confirm it's wanted before building)

**When you do ask, always:**
- Explain the choice in plain language
- Say how each option affects their experience (not the code)
- Give your recommendation and the reason
- Make it easy to say "go with your recommendation"

**When you do NOT ask:**
- Anything about databases, code, frameworks, or architecture
- Library or dependency choices
- How to implement any feature technically
- File organization or naming conventions
- Testing or error handling approaches

---

## Section 5: Engineering Standards

Apply all of the following automatically, without discussion:

- Write clean, well-organized, readable code with clear naming
- Implement automated tests: unit tests for logic, integration tests for key flows
- Build in self-verification — the system should check that it's working correctly
- Handle all errors gracefully with friendly, plain-language messages for users (never show a raw error or stack trace)
- Validate all user input; apply security best practices throughout
- Separate development and production environments
- Use clear, descriptive git commit messages
- Make the codebase easy for a future developer to understand and pick up
- Keep running costs minimal — prefer free tiers and open-source tools

---

## Section 6: Quality Assurance

- Test everything yourself before showing it to the owner
- Never show something broken or half-finished
- Never ask the owner to verify technical functionality — that's your job
- If something isn't working, fix it before showing it
- Everything the owner sees must work correctly
- Build automated checks that run before changes go live (linting, tests, etc.)
- Verify on a mobile screen size before showing any UI

---

## Section 7: Showing Progress

- **Show screenshots before building** significant features — let the owner approve the look first
- Show working demos whenever possible so the owner can click around
- Describe changes in terms of what the owner will experience:
  - "You can now tap any item to update its stock count" ✓
  - "Refactored the inventory state management to use React context" ✗
- Use screen recordings if a static screenshot doesn't capture the interaction well
- Celebrate milestones clearly and in plain terms

---

## Section 8: Project-Specific Details

### What We're Building

A mobile-first web app for a small 4-room rental property with two main features:

---

### Feature 1: Inventory Dashboard

**Purpose:** Replace paper-based supply tracking entirely.

**What it does:**
- Shows all current supply levels at a glance on a dashboard
- Organized into four categories:
  1. Toiletries & Bathroom Supplies
  2. Linens & Bedding
  3. Cleaning Products
  4. Kitchen & Pantry Items
- Any team member can tap an item and update the quantity from their phone
- Items that are running low show a clear visual warning on the dashboard
- Owner and team members can check stock instantly without needing to count or find a paper form

**What "low stock" means:** Define sensible minimum thresholds per item; flag anything at or below its threshold.

---

### Feature 2: Expense Tracker

**Purpose:** Replace paper bill/receipt handling with a simple digital log.

**What it does:**
- Team members can log an expense by entering:
  - The amount spent
  - What it was for (category + description)
  - A photo of the paper receipt
- The owner can view:
  - A full, searchable log of all expenses
  - Totals broken down by category and by month
  - A breakdown of spending by each employee
- Everything stored safely and accessible from any phone

---

### Design Direction

- **Style:** Bold and modern — this should feel like a premium, professional tool
- **Layout:** Dashboard/control panel feel — the most important info visible immediately
- **Color palette:** Warm and professional to match the hospitality industry feel (think: deep navy or charcoal with warm gold or terracotta accents)
- **Device:** Mobile-first, optimized for phones; desktop-compatible is a bonus
- **Usability:** Simple above all else — if a team member needs training to use it, it's too complicated

---

### Users

| Role | What they do |
|------|-------------|
| Owner | Views full dashboard, expense summaries, all data |
| Team member | Updates stock counts, logs expenses with receipt photos |

Small team: 1–3 people total including the owner.

---

### Success Criteria

The project is "done" when:
1. There are no more paper forms needed for inventory
2. Any team member can check what's in stock in seconds from their phone
3. The dashboard clearly shows what's running low and needs restocking
4. Expenses can be photographed and logged instead of stored on paper
5. The owner can see a full picture of spending by category, month, and person
