import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Todo } from './todo.model';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
  standalone: false,
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  todosSubject = new BehaviorSubject<Todo[]>([]);
  searchTerm = '';
  searchSubject = new Subject<string>();
  filter: 'all' | 'completed' | 'pending' = 'all';
  darkMode = false;

  // Form inputs
  newTaskText = '';
  newTaskDescription = '';
  newTaskPriority: 'low' | 'medium' | 'high' = 'low';
  newTaskDueDate = '';

  constructor() {}

  ngOnInit(): void {
    const savedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    this.todos = savedTodos;
    this.todosSubject.next(this.todos);

    // Handle search input with debounce
    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.searchTerm = term;
      this.filterTodos();
    });

    this.todosSubject.subscribe((todos) => {
      this.todos = todos;
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }

  addTodo() {
    if (!this.newTaskText.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: this.newTaskText,
      description: this.newTaskDescription,
      priority: this.newTaskPriority,
      dueDate: this.newTaskDueDate,
      completed: false,
    };

    this.todosSubject.next([...this.todos, newTodo]);
    this.resetForm();
  }

  resetForm() {
    this.newTaskText = '';
    this.newTaskDescription = '';
    this.newTaskPriority = 'low';
    this.newTaskDueDate = '';
  }

  toggleTodoCompletion(id: number) {
    this.todosSubject.next(
      this.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number) {
    this.todosSubject.next(this.todos.filter((todo) => todo.id !== id));
  }

  getFilteredTodos(): Todo[] {
    if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.completed);
    } else if (this.filter === 'pending') {
      return this.todos.filter((todo) => !todo.completed);
    }
    return this.todos;
  }

  sortTodos(criteria: 'priority' | 'dueDate') {
    if (criteria === 'priority') {
      this.todosSubject.next(
        [...this.todos].sort(
          (a, b) => this.getPriorityValue(b.priority) - this.getPriorityValue(a.priority)
        )
      );
    } else if (criteria === 'dueDate') {
      this.todosSubject.next(
        [...this.todos].sort(
          (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        )
      );
    }
  }

  getPriorityValue(priority: 'low' | 'medium' | 'high'): number {
    return priority === 'high' ? 3 : priority === 'medium' ? 2 : 1;
  }

  bulkComplete() {
    this.todosSubject.next(
      this.todos.map((todo) =>
        todo.selected ? { ...todo, completed: true } : todo
      )
    );
  }

  bulkDelete() {
    this.todosSubject.next(this.todos.filter((todo) => !todo.selected));
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark', this.darkMode);
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.searchSubject.next(searchValue);
  }
  
  filterTodos() {
    this.todosSubject.next(
      this.todos.filter((todo) =>
        todo.text.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }
  
}
