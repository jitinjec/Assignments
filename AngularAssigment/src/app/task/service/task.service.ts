import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Task } from '../task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = '../../../assets/data/task.json';
  public taskList: Task[];
  constructor(private httpClient: HttpClient) { }

  getTask(): Observable<Task[]> {

    return this.httpClient.get<Task[]>(this.url).pipe(
      tap((taskList) => {
        this.taskList = taskList;
      })
    );

  }
  addTask(task: Task) {
    this.taskList.push(task);
  }
  getCompletedTask() {
    this.taskList.filter(task => task.isCompleted);
  }
  getUpcomingTask() {
    this.taskList.filter(task => !task.isCompleted);
  }
  updateTask(taskList) {
    this.taskList = taskList;
  }
}
