import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Todo } from 'src/app/models/todo.model';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss'],
})
export class CreateTodoComponent implements OnInit {
  todoGroup: FormGroup = this.fb.group({});
isEditMode: boolean = false;
currentTodo = {}
  constructor(
    private fb: FormBuilder,
    private todoService: TodoService,
    public translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    
    this.activatedRoute.data.subscribe((data) => {
      console.log("data", data)
      this.activatedRoute.snapshot.paramMap.get('id') || '';

      if(data.currentTodo){
        this.isEditMode = true
        this.currentTodo = data.currentTodo;
        (this.currentTodo as Todo).id = this.activatedRoute.snapshot.paramMap.get('id') || '';
        console.log("currentTodo", this.currentTodo)
      }

    });

    console.log("ac", this.activatedRoute)
    this.initForm();
  }
  initForm() {
    console.log("this.currentTodo ", this.currentTodo )
    this.todoGroup = this.fb.group({
      name: this.fb.control((this.currentTodo as Todo)?.name || '', Validators.required),
    });
  }
  onSubmit() {
    console.log('val', this.todoGroup.value);
    if(this.isEditMode){
      const updatedTodo = {
        id: (this.currentTodo as Todo).id,
       name: this.todoGroup.value.name
      }
      console.log("updatedTodo", updatedTodo)
      this.todoService.updateTodo(updatedTodo).subscribe(res => {
        console.log("updated successfully")
        this.router.navigate(["/"]);
      })
    }else{
      this.todoService.createTodo(this.todoGroup.value).subscribe((res) => {
        this.router.navigate(["/"]);
        console.log('ressss', res);
        
      });

    }
  }
}
