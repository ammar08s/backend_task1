const users = [];
let nextId = 1;

export function createUser({ name, email } = {}) {
  if (typeof name !== 'string' || !name.trim()) {
    throw new TypeError('User name must be a non-empty string.');
  }
  if (typeof email !== 'string' || !email.trim()) {
    throw new TypeError('User email must be a non-empty string.');
  }

  const user = { id: nextId++, name: name.trim(), email: email.trim() };
  users.push(user);
  return { ...user };
}

export function getUsers() {
  return users.map((user) => ({ ...user }));
}

export function getUserById(id) {
  const user = users.find((user) => user.id === id);
  return user ? { ...user } : null;
}
