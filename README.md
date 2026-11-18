# Coy Discover — SDE Intern Assignment

A standalone, mobile-first Discover experience built with React + Vite and Node.js + Express. The Home tab is intentionally a placeholder; Discover contains the swipe flow and Matches contains mutual matches.

## Features
- 32 seeded mock profiles with name, age, photo, bio, city and interests.
- Swipe right / Like and left / Pass using touch or pointer drag; desktop buttons are also available.
- Profiles are removed from the feed after any swipe and remain removed after reload.
- A match is created only when the current user likes a seeded profile that has already liked them.
- Matches view lists mutual matches only.
- Incoming-like flags are never returned by `GET /api/feed` or `GET /api/matches`.
- JSON persistence in `data/db.json`.

## Run locally
Requires Node.js 18+.

```bash
npm install
npm run dev
```

Frontend: http://localhost:5173  
API: http://localhost:4000

Build frontend: `npm run build`  
Run seed checks: `npm test`

## API
- `GET /api/feed` — returns profiles not yet swiped on. Private incoming-like state is stripped.
- `POST /api/swipe` — body `{ "profileId": "p2", "direction": "like" }` or `pass`; rejects invalid directions and duplicate swipes; returns `{ ok, matched, match }`.
- `GET /api/matches` — returns only mutual matches.
- `GET /api/health` — health check.

## Demo flow
Profiles with seeded incoming likes are IDs `p2`, `p5`, `p8`, `p11`, `p14`, `p17`, `p20`, `p23`, `p26`, and `p29`. Like any of these to trigger the match screen. Pass or like any other profile to see it disappear from the feed.

To reset demo data, stop the server and replace `data/db.json` with:

```json
{"swipes":[],"matches":[]}
```

## Privacy design notes
The browser never receives the `incomingLike` flag. Match eligibility is evaluated only in the API when a like is submitted. The feed endpoint filters all prior swipes on the server. A production implementation should additionally use authenticated user IDs, database transactions/unique constraints, rate limits, abuse reporting, consent and age gates, and secure contact matching; this assignment assumes one logged-in demo user as specified.

## Suggested deployment
Deploy the Node API and React static build separately (for example, Render + Vercel), configure the frontend API base URL for production, and use a durable database instead of the local JSON file. Do not deploy the demo JSON file with real user data.


## Part A — Product Exploration and Product Thinking

### 1. Hands-on Product Walkthrough

Completed the Coy onboarding and product exploration flow.

**Phone verification**
- Successfully registered using mobile OTP verification.

**Adding the first crush**
- Completed the first-crush setup.
- Explored the available options for adding a crush.

**Email verification**
- Successfully verified the registered email address through OTP verification.

**Invite link**
- Inspected the referral/invite link.
- Opening the invite link redirects a new visitor to the registration experience.
- This creates an onboarding entry point for new users.

**Extra slots and pricing**
- Reached the "Get more slots" purchase screen.
- The screen indicated that 3 of 3 slots were in use and that purchased extra slots are retained.
- Observed the following launch-offer pricing:

| Additional slots | Displayed price | Price per slot |
|---|---:|---:|
| 1 crush | ₹49 | ₹49 |
| 3 crushes | ₹129 | ₹43 |
| 5 crushes | ₹199 | ₹40 |

- Payment methods displayed: UPI, cards and wallets via Cashfree.
- Prices include GST.
- Observed a referral alternative: invite 3 friends; when they join and add a crush, the inviter receives one free slot.
- Referral progress displayed during exploration: 0 of 3 joined.
- No purchase was made.

### 2. Product Understanding

Coy is designed around double-blind crush matching. A user can add someone they are interested in, but the other person is not told who added them unless they independently add that person too.

The product focuses on private, mutual discovery rather than public profiles, browsing, swiping or in-app chat.

The Discover experience in this assignment should therefore be considered a separate discovery surface rather than a replacement for Coy's original private matching experience.

### 3. Feature Idea 1 — Mutual-match Icebreaker Handoff

**What:**
After a mutual match, offer a small set of optional, editable conversation starters. These could include prompts based on shared interests or a simple "say hello" template.

**Why:**
A match resolves uncertainty but can still leave both people unsure how to start a conversation. Optional prompts can reduce that awkward first step without introducing an in-app chat system or exposing unmatched likes.

### 4. Feature Idea 2 — Discovery Privacy and Safety Controls

**What:**
Introduce controls for pausing discovery, hiding profiles, blocking or reporting users, and controlling profile visibility.

**Why:**
A swipe-based discovery experience introduces different privacy and safety considerations from Coy's original private matching model. Clear controls can help users manage unwanted attention, impersonation and unwanted visibility while maintaining trust.

### 5. Additional Product Improvement — Clearer Slot and Referral Information

**Observation:**
The extra-slots screen provides multiple purchase bundles and a referral-based free-slot option.

**Suggestion:**
Explain the current slot allowance, the total capacity after each purchase, and the referral eligibility conditions more clearly. A simple progress indicator could also explain how many invited friends still need to join and add a crush.

### 6. Research References

- [Coy — How it works](https://getcoy.com/)
- [Coy — How Coy works](https://getcoy.com/blog/how-coy-works)
- [Coy — Is Coy safe?](https://getcoy.com/blog/is-coy-safe)
