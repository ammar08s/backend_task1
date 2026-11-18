# In-memory task manager

A Node.js project using ESM (`"type": "module"`) with separate Tasks and Users modules. No external packages are required.

## Run

Use Node.js 18.11 or newer.

```sh
npm start
npm run dev
npm test
npm run test:watch
```

`npm start` runs an example that creates a user and creates, lists, finds, updates, and deletes a task.

`npm run dev` reruns the example when source files change. `npm test` runs the test suite once; `npm run test:watch` reruns tests when files change. Watch commands stay active until you press Ctrl+C.

`.gitignore` excludes dependencies, local environment files, logs, coverage output, and operating system files. `.env.example` can still be committed as a configuration template.

## Structure

```text
index.js                 Runnable example
src/modules/tasks.js     Task operations and private in-memory task array
src/modules/users.js     User operations and private in-memory user array
test/                    Tests using Node.js's built-in test runner
```

## Task operations

```js
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from './src/modules/tasks.js';

const task = createTask({ title: 'Study Node.js', description: 'Practice modules' });
getTasks();
getTaskById(task.id);
updateTask(task.id, { title: 'Study ESM', completed: true });
deleteTask(task.id);
```

Each task has a numeric `id`, a required non-empty `title`, a `description` (default `''`), and `completed` (default `false`). Updates accept any subset of title, description, and completed. IDs are generated automatically and cannot be changed. Invalid field values throw `TypeError`. Looking up or updating a missing task returns `null`; deleting one returns `false`.

## User operations

```js
import { createUser, getUsers, getUserById } from './src/modules/users.js';

const user = createUser({ name: 'Ada', email: 'ada@example.com' });
getUsers();
getUserById(user.id);
```

Names and emails must be non-empty strings. Looking up a missing user returns `null`.

Both modules return copies of stored records. All data is stored only in memory and is lost when the process exits. The example runs in the terminal; this project does not start an HTTP server.
