import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const todoFile = path.join(__dirname, 'todos.json');

export interface Todo {
  done: boolean;
  todo: string;
}

class TodoAPI {
  private todos: Todo[] = [];

  constructor() {
    this.todos = JSON.parse(fs.readFileSync(todoFile, {encoding: 'utf-8'}));
  }

  add(todo: string, done?: boolean) {
    done = done || false;
    const newTodo: Todo = {done, todo};
    this.todos.push(newTodo);
    this.saveTodos();
  }

  remove(index: number): Todo | boolean {
    if (this.todos.length <= index) {
      return false;
    }
    if (this.todos[index]) {
      const returnTodo: Todo = this.todos[index];
      this.todos.splice(index, 1);
      this.saveTodos();
      return returnTodo;
    }
    return false;
  }

  list() {
    return this.todos;
  }

  get(index: number): Todo {
    return this.todos[index];
  }

  done(index: number) {
    this.todos[index].done = true;
    this.saveTodos();
  }

  undone(index: number) {
    this.todos[index].done = false;
    this.saveTodos();
  }

  private saveTodos() {
    // make folder for the first run
    if (!fs.existsSync(path.dirname(todoFile))) {
      fs.mkdirSync(path.dirname(todoFile));
    }
    const data = JSON.stringify(this.todos);
    fs.writeFileSync(todoFile, data, {encoding: 'utf-8'});
  }
}

const api = new TodoAPI();
export default api;
