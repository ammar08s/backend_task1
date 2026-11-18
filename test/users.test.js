import test from 'node:test';
import assert from 'node:assert/strict';
import * as users from '../src/modules/users.js';

test('creates users with distinct IDs and supports listing and lookup', () => {
  const first = users.createUser({ name: ' Ada ', email: ' ada@example.com ' });
  const second = users.createUser({ name: 'Grace', email: 'grace@example.com' });

  assert.deepEqual(first, { id: first.id, name: 'Ada', email: 'ada@example.com' });
  assert.ok(Number.isInteger(first.id));
  assert.notEqual(first.id, second.id);
  assert.deepEqual(users.getUserById(first.id), first);
  assert.ok(users.getUsers().some((user) => user.id === second.id));
  assert.equal(users.getUserById(-1), null);
});

test('rejects users with missing or invalid names and emails', () => {
  assert.throws(() => users.createUser(), /name/i);
  assert.throws(() => users.createUser({ name: ' ', email: 'ada@example.com' }), /name/i);
  assert.throws(() => users.createUser({ name: 'Ada' }), /email/i);
  assert.throws(() => users.createUser({ name: 'Ada', email: 42 }), /email/i);
});

test('returned users cannot be used to mutate stored data', () => {
  const user = users.createUser({ name: 'Ada', email: 'ada@example.com' });
  const id = user.id;
  user.name = 'Changed';
  users.getUserById(id).name = 'Changed';
  const list = users.getUsers();
  list.find((item) => item.id === id).email = 'changed@example.com';
  list.length = 0;

  assert.deepEqual(users.getUserById(id), { id, name: 'Ada', email: 'ada@example.com' });
});
