import { createUser, getUsers } from './src/modules/users.js';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from './src/modules/tasks.js';

createUser({ name: 'Ada', email: 'ada@example.com' });
console.log('Users:', getUsers());

const task = createTask({ title: 'Learn ESM', description: 'Practice imports and exports' });
console.log('Created task:', task);
console.log('All tasks:', getTasks());
console.log('Task by ID:', getTaskById(task.id));
console.log('Updated task:', updateTask(task.id, { completed: true }));
console.log('Deleted task:', deleteTask(task.id));
console.log('Remaining tasks:', getTasks());
