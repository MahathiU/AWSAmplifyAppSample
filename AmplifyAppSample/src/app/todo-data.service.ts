import { Injectable } from '@angular/core';
import {Todo} from './todo';
import { API } from 'aws-amplify';


@Injectable({
  providedIn: 'root'
})
@Injectable()
export class TodoDataService {

  constructor() {
    this.getAllTodos();
  }

  // Placeholder for last id so we can simulate
  // automatic incrementing of ids
  lastId: number = 0;

  // Placeholder for todos
  todos: Todo[] = [];

  // Toggle todo complete
  asycn
  // Simulate POST /todos
  // tslint:disable-next-line:typedef
  async addTodo(todo: Todo) {
    console.log('Adding a todo');
    const data = {
      body: {
        item_name: todo.title,
        is_completed: todo.complete
      }
    };
    const todoData = await API.post('todosapi', '/todos', data);
    console.log(todoData);
  }

  // Simulate DELETE /todos/:id
  async deleteTodoById(id: string) {
    console.log('Deleting a todo');
    const data = {
      body: {
        item_name: id
      }
    };
    const todoData = await API.del('todosapi', '/todos', data);
    console.log(todoData);
  }

  // Simulate PUT /todos/:id
  // tslint:disable-next-line:ban-types variable-name typedef
  async updateTodoById(id: string, is_completed: boolean) {
    console.log('Updating a todo');
    const data = {
      body: {
        item_name: id,
        is_completed
      }
    };
    const todoData = await API.post('todosapi', '/todos', data);
    console.log(todoData);
  }

  // Simulate GET /todos
  async getAllTodos(): Promise<Todo[]> {
    console.log('Getting all todos');
    this.todos = [];
    const todoData = await API.get('todosapi', '/todos', []);
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < todoData.data.Items.length; i++) {
      const id = i;
      const title = todoData.data.Items[i].item_name;
      const complete = todoData.data.Items[i].is_completed;
      const todoObject = new Todo({id, title, complete});
      this.todos.push(todoObject);
    }
    console.log(todoData.data.Items);
    return this.todos;
  }

  // Simulate GET /todos/:id
  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  // tslint:disable-next-line:typedef
  async toggleTodoComplete(todo: Todo){
    const updatedTodo = await this.updateTodoById(todo.title, !todo.complete);
  }

}
