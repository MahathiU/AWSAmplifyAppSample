import { Component, ChangeDetectorRef } from '@angular/core';
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import {TodoDataService} from './todo-data.service';
import {Todo} from './todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {
  title = 'amplify-angular-auth';
  user: CognitoUserInterface | undefined;
  authState: AuthState;

  newTodo: Todo = new Todo();

  constructor(private ref: ChangeDetectorRef, private todoDataService: TodoDataService) {}

  addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.todoDataService.getAllTodos();
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
    this.todoDataService.getAllTodos();
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.title);
    this.todoDataService.getAllTodos();
  }

  // tslint:disable-next-line:typedef
  get todos() {
    return this.todoDataService.todos;
  }

  // tslint:disable-next-line:use-lifecycle-interface typedef
  ngOnInit() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.ref.detectChanges();
    });
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    return onAuthUIStateChange;
  }
}
