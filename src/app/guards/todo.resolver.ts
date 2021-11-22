import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Injectable({
  providedIn: 'root',
})
export class TodoResolver implements Resolve<Todo> {
  constructor(private todoService: TodoService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Todo> {
    const todoId = route.paramMap.get('id');
    return todoId
      ? this.todoService
          .getTodo(todoId)
          .pipe(catchError((err) => throwError(err)))
      : EMPTY;
  }
}
