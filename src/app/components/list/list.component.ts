import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  todoList: any[] = [];
  selectedTodos: string[] = [];
  filterKeyword: string = '';

  constructor(private todoservice: TodoService) {}

  ngOnInit(): void {
    this.todoservice
      .getTodos()
      .pipe(
        map((res) => {
          const listData = [];
          for (const key in res) {
            listData.push({ ...res[key], id: key });
          }
          return listData;
        })
      )
      .subscribe((resultData) => {
        this.todoList = resultData;
      });
  }

  handleChange(event: Event, todo: Todo) {
    this.selectedTodos.push((event.target as HTMLInputElement).value);   
    this.todoservice.deleteTodo(todo).subscribe((res) => {
      console.log('deleted Successfully');
    });
  }
}

