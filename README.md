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

## Part A — Product thinking

The current Coy product is a double-blind way for people who already know each other to discover mutual interest. A user adds a crush by phone number or email; the other person receives an anonymous heads-up, and identities are revealed only when both add each other. Coy deliberately avoids public profiles, photos, swiping and in-app chat. The assignment's Discover experience is therefore best treated as a clearly separate discovery surface, not a replacement for Coy's private crush list.

### Feature idea 1: Mutual-match icebreaker handoff
**What:** After a mutual match, offer a small set of optional, editable conversation starters alongside the existing contact handoff. Examples could be light prompts based on shared interests, or a simple “say hello” template. Keep the actual conversation outside Coy, consistent with its no-chat positioning.

**Why it is required:** A match resolves the uncertainty but can still leave both people unsure how to start. A low-pressure prompt reduces that awkward first step without exposing unmatched likes, adding a chat inbox, or changing the double-blind rule. Prompts should be optional and shown only after a mutual match.

### Feature idea 2: Discovery privacy and safety controls
**What:** Because Discover introduces browsable profiles and swiping, add a dedicated control panel for pausing discovery, hiding a profile, blocking/reporting a user, and controlling which profile fields are visible. Make age eligibility and reporting easy to find.

**Why it is required:** Coy's original model is intentionally limited to people a user already knows, with no public profiles. A swipe-based surface changes the threat model: it can introduce unwanted attention, impersonation, harassment, and unwanted visibility. Clear controls give users agency and help preserve trust while keeping Discover separate from the anonymous crush-matching experience.

### Product observation and scope note
The official Coy public product description says it is 18+ and centres on double-blind matching: a person is not told who added them unless they add that person too. It also describes limited anonymous notifications, opt-out controls, and no profile browsing or chat. This implementation follows the assignment's explicit Discover requirements while keeping incoming likes private and making the Home tab a placeholder.

**Research links:**
[Coy — How it works](https://getcoy.com/)
[Coy — How Coy works](https://getcoy.com/blog/how-coy-works)
[Coy — Is Coy safe?](https://getcoy.com/blog/is-coy-safe)

**Hands-on app walkthrough still required:** The assignment specifically asks the candidate to complete phone OTP login, add a crush, verify email, inspect the invite link, and view the extra-slots screen without purchasing. Those account-specific steps require the candidate's own phone/email and OTP. They have not been represented as completed in this submission; complete them in your own Coy account and add any observations that differ from the public product information above.
