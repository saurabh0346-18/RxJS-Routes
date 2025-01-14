import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-item',
  standalone: false,
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: { id: number; text: string; completed: boolean };
  @Output() delete = new EventEmitter<number>();
  @Output() toggle = new EventEmitter<number>();
}
