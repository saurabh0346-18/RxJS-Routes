import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-todo-list',
  standalone: false,
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: { id: number; text: string; completed: boolean }[] = [];
  newTodo: string = '';
  searchQuery: string = '';

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.todos = this.localStorageService.getTodos();
  }

  addTodo(): void {
    if (this.newTodo.trim()) {
      const newTodo = {
        id: Date.now(),
        text: this.newTodo,
        completed: false,
      };
      this.todos.push(newTodo);
      this.localStorageService.saveTodos(this.todos);
      this.newTodo = '';
    }
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.localStorageService.saveTodos(this.todos);
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.localStorageService.saveTodos(this.todos);
    }
  }

  onSearch(query: string): void {
    this.searchQuery = query;
  }
}
