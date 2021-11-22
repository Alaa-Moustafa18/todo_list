import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTodoComponent } from './components/create-todo/create-todo.component';
import { ListComponent } from './components/list/list.component';
import { TodoResolver } from './guards/todo.resolver';

const routes: Routes = [
  { path: '', component: ListComponent},
  { path: 'create', component: CreateTodoComponent},
  { path: 'todo/:id', component: CreateTodoComponent, resolve: { currentTodo: TodoResolver}},
  { path: '**', component: ListComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
