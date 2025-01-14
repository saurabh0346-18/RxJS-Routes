import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { LocalStorageService } from './services/local-storage.service';
import { HighlightDirective } from './directives/highlight.directive';  // Ensure correct path
import { FilterPipe } from './pipes/filter.pipe'; 
import { CommonModule } from '@angular/common'; // Ensure correct path

@NgModule({
  declarations: [
    AppComponent,
    TodoListComponent,
    TodoItemComponent,
    SearchBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule, 
    FilterPipe, 
    HighlightDirective,
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
