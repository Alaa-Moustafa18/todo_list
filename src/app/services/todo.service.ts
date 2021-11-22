import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleErrorService } from '../core/handle-error.service';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  baseUrl = 'https://my-project-1533632353158-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private handleError: HandleErrorService
  ) {}
  getTodos(): Observable<Todo[]> {
    return this.http
      .get<Todo[]>(`${this.baseUrl}/todos.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
  getTodo(id: string): Observable<Todo> {
    return this.http
      .get<Todo>(`${this.baseUrl}/todos/${id}.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
  createTodo(todo: Todo): Observable<Todo> {
    return this.http
      .post<Todo>(`${this.baseUrl}/todos.json`, todo)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }

  updateTodo(todo: Todo) {
    return this.http
      .put<Todo>(`${this.baseUrl}/todos/${todo.id}.json`, todo)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
  deleteTodo(todo: Todo) {
    return this.http
      .delete<Todo>(`${this.baseUrl}/todos/${todo.id}.json`)
      .pipe(catchError((err) => this.handleError.errorHandler(err)));
  }
}
