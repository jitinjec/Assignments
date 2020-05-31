import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../service/task.service';
import { Task, TaskType } from '../task';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.css']
})
export class TaskContainerComponent implements OnInit {
  @Input() title;
  @Input() taskTypes: string[];
  constructor(private taskService: TaskService) { }
  taskList: Task[];
  isCheckboxVisible: boolean;
  selectedTask: string;
  addFormGroup = new FormGroup({
    task: new FormControl(null, Validators.required)
  });
  ngOnInit() {
    this.taskService.getTask().subscribe((taksList) => {
      this.taskList = taksList.filter(task => !task.isCompleted);
    });
    this.isCheckboxVisible = true;
    this.selectedTask = this.taskTypes ? this.taskTypes[0] : null;
  }
  onTaskChanged(taskType: string) {
    this.selectedTask = taskType;
    switch (taskType) {
      case TaskType.UpcomingTasks:
        this.isCheckboxVisible = true;
        this.taskList = this.taskService.taskList.filter(task => !task.isCompleted);
        break;
      case TaskType.CompletedTasks:
        this.isCheckboxVisible = false;
        this.taskList = this.taskService.taskList.filter(task => task.isCompleted);
    }
  }
  addTask() {
    this.taskService.addTask({ id: Math.random(), name: this.addFormGroup.get('task').value, isCompleted: false });
    this.addFormGroup.reset();
    this.taskList = this.taskService.taskList.filter(task => !task.isCompleted);
  }
  onSelected(task) {
    const currentTask = this.taskService.taskList.find(x => x.id === task.id);
    currentTask.isCompleted = true;
    this.taskList = this.taskService.taskList.filter(x => !x.isCompleted);
  }

}
