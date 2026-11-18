export const stripPrivateFields = ({ incomingLike, ...profile }) => profile;
export function getFeed(profiles, swipes) {
  const seen = new Set(swipes.map((swipe) => swipe.profileId));
  return profiles.filter((profile) => !seen.has(profile.id)).map(stripPrivateFields);
}
export function recordSwipe({ profiles, db, profileId, direction, now = new Date().toISOString() }) {
  if (!profiles.some((profile) => profile.id === profileId)) return { status: 404, body: { error: 'Profile not found' } };
  if (!['like', 'pass'].includes(direction)) return { status: 400, body: { error: 'direction must be like or pass' } };
  if (db.swipes.some((swipe) => swipe.profileId === profileId)) return { status: 409, body: { error: 'This profile has already been swiped on' } };
  db.swipes.push({ profileId, direction, createdAt: now });
  const profile = profiles.find((item) => item.id === profileId);
  const matched = direction === 'like' && profile.incomingLike;
  if (matched && !db.matches.includes(profileId)) db.matches.push(profileId);
  return { status: 200, body: { ok: true, matched: Boolean(matched), match: matched ? stripPrivateFields(profile) : null } };
}
export function getMutualMatches(profiles, db) {
  return db.matches.map((id) => profiles.find((profile) => profile.id === id)).filter(Boolean).map(stripPrivateFields);
}
