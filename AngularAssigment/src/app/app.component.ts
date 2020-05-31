import { Component } from '@angular/core';
import { TaskType } from './task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Component101';
  taskTypes = [ TaskType.UpcomingTasks, TaskType.CompletedTasks];
}
