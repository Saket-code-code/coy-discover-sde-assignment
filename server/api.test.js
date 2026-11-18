import test from 'node:test';
import assert from 'node:assert/strict';
import { profiles } from './seed.js';
import { getFeed, recordSwipe, getMutualMatches } from './domain.js';
const freshDb = () => ({ swipes: [], matches: [] });

test('seed contains at least 30 complete mock profiles', () => {
  assert.ok(profiles.length >= 30);
  for (const p of profiles) assert.ok(p.name && p.age && p.bio && p.city && p.interests.length && p.photo);
});
test('feed never exposes incoming-like state and excludes swiped profiles', () => {
  const feed = getFeed(profiles, [{ profileId: 'p1', direction: 'pass' }]);
  assert.equal(feed.some(p => p.id === 'p1'), false);
  assert.equal(feed.some(p => Object.hasOwn(p, 'incomingLike')), false);
});
test('a like creates a match only when the other profile has liked back', () => {
  const db = freshDb();
  const mutual = recordSwipe({ profiles, db, profileId: 'p2', direction: 'like' });
  const oneSided = recordSwipe({ profiles, db, profileId: 'p1', direction: 'like' });
  assert.equal(mutual.body.matched, true);
  assert.equal(oneSided.body.matched, false);
  assert.deepEqual(db.matches, ['p2']);
  assert.equal(Object.hasOwn(mutual.body.match, 'incomingLike'), false);
});
test('duplicate swipes and invalid directions are rejected', () => {
  const db = freshDb();
  recordSwipe({ profiles, db, profileId: 'p1', direction: 'pass' });
  assert.equal(recordSwipe({ profiles, db, profileId: 'p1', direction: 'like' }).status, 409);
  assert.equal(recordSwipe({ profiles, db, profileId: 'p3', direction: 'maybe' }).status, 400);
});
test('matches endpoint data contains only mutual matches', () => {
  const db = { swipes: [], matches: ['p2'] };
  const result = getMutualMatches(profiles, db);
  assert.deepEqual(result.map(p => p.id), ['p2']);
  assert.equal(Object.hasOwn(result[0], 'incomingLike'), false);
});
