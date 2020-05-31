import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() public task: Task;
  @Input() public isCheckboxVisible?= true;
  @Output() public selected = new EventEmitter();
  constructor() { }
 
  onSelected(task: Task) {
    this.selected.emit(task);
  }
}
