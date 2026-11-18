const tasks = [];
let nextId = 1;

function validateTask({ title, description, completed }) {
  if (typeof title !== 'string' || !title.trim()) {
    throw new TypeError('Task title must be a non-empty string.');
  }
  if (typeof description !== 'string') {
    throw new TypeError('Task description must be a string.');
  }
  if (typeof completed !== 'boolean') {
    throw new TypeError('Task completed must be a boolean.');
  }
}

export function createTask({ title, description = '' } = {}) {
  validateTask({ title, description, completed: false });

  const task = { id: nextId++, title: title.trim(), description, completed: false };
  tasks.push(task);
  return { ...task };
}

export function getTasks() {
  return tasks.map((task) => ({ ...task }));
}

export function getTaskById(id) {
  const task = tasks.find((task) => task.id === id);
  return task ? { ...task } : null;
}

export function updateTask(id, changes = {}) {
  const task = tasks.find((task) => task.id === id);
  if (!task) return null;

  // Only these fields can change; IDs and unknown fields are ignored.
  const updated = {
    id: task.id,
    title: changes.title === undefined ? task.title : changes.title,
    description: changes.description === undefined ? task.description : changes.description,
    completed: changes.completed === undefined ? task.completed : changes.completed,
  };
  validateTask(updated);
  updated.title = updated.title.trim();
  Object.assign(task, updated);
  return { ...task };
}

export function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return false;

  tasks.splice(index, 1);
  return true;
}
