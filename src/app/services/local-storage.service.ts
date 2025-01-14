import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',  // for seperate instances we can use 'any'
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'todos';

  getTodos(): any[] {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
  }

  saveTodos(todos: any[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
  }
}
