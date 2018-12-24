export type TaskId = string;

export type TaskContent = string;

export class Task {
  id: TaskId = undefined;
  content: TaskContent = undefined;
  constructor({ id, content }: { id?: TaskId; content: TaskContent }) {
    this.id = id || Math.random().toString(36).substring(2, 15);
    this.content = content;
  }
}

export type Tasks = Task[];
