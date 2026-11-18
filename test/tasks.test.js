import test from 'node:test';
import assert from 'node:assert/strict';
import * as tasks from '../src/modules/tasks.js';

test('creates a task that can be listed and found by ID', () => {
  const task = tasks.createTask({ title: ' Learn ESM ', description: 'Practice imports' });

  assert.deepEqual(task, {
    id: task.id,
    title: 'Learn ESM',
    description: 'Practice imports',
    completed: false,
  });
  assert.ok(Number.isInteger(task.id));
  assert.deepEqual(tasks.getTaskById(task.id), task);
  assert.ok(tasks.getTasks().some((item) => item.id === task.id));
});

test('updates task details and marks a task complete while preserving its ID', () => {
  const task = tasks.createTask({ title: 'First draft' });
  assert.equal(task.description, '');

  const updated = tasks.updateTask(task.id, {
    id: 999,
    title: ' Final draft ',
    description: 'Ready',
    completed: true,
  });

  assert.deepEqual(updated, {
    id: task.id,
    title: 'Final draft',
    description: 'Ready',
    completed: true,
  });
  assert.deepEqual(tasks.getTaskById(task.id), updated);
});

test('deletes a task without reusing its ID', () => {
  const task = tasks.createTask({ title: 'Remove me' });

  assert.equal(tasks.deleteTask(task.id), true);
  assert.equal(tasks.getTaskById(task.id), null);
  assert.equal(tasks.deleteTask(task.id), false);
  assert.equal(tasks.updateTask(task.id, { completed: true }), null);
  assert.ok(tasks.createTask({ title: 'Next task' }).id > task.id);
});

test('rejects invalid task input without partially changing a task', () => {
  for (const input of [undefined, {}, { title: ' ' }, { title: 42 }]) {
    assert.throws(() => tasks.createTask(input), /title/i);
  }
  assert.throws(() => tasks.createTask({ title: 'Valid', description: 42 }), /description/i);
  const task = tasks.createTask({ title: 'Original' });

  assert.throws(() => tasks.updateTask(task.id, { title: 'Changed', completed: 'yes' }), /completed/i);
  assert.throws(() => tasks.updateTask(task.id, { title: '' }), /title/i);
  assert.throws(() => tasks.updateTask(task.id, { description: null }), /description/i);
  assert.deepEqual(tasks.getTaskById(task.id), task);
});

test('returned tasks cannot be used to mutate stored data', () => {
  const task = tasks.createTask({ title: 'Original' });
  const id = task.id;
  task.title = 'Changed outside module';
  tasks.getTaskById(id).title = 'Changed through lookup';
  const list = tasks.getTasks();
  list.find((item) => item.id === id).completed = true;
  list.length = 0;

  assert.equal(tasks.getTaskById(id).title, 'Original');
  assert.equal(tasks.getTaskById(id).completed, false);
  assert.ok(tasks.getTasks().length > 0);
});
