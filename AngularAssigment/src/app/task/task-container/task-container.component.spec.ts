import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskContainerComponent } from './task-container.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../service/task.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

fdescribe('TaskContainerComponent', () => {
  let component: TaskContainerComponent;
  let fixture: ComponentFixture<TaskContainerComponent>;
  const stubTaskList = [
    {
      id: 1,
      name: ' Buy groceries',
      isCompleted: false
    },
    {
      id: 2,
      name: 'Read Angular- componets 101',
      isCompleted: false
    },
    {
      id: 3,
      name: 'Read other blog post',
      isCompleted: false
    },
    {
      id: 4,
      name: 'Clean house',
      isCompleted: false
    },
    {
      id: 5,
      name: 'Go for a run',
      isCompleted: false
    }
  ];
  // const fakeTaskService = {
  //   getTask: () => {
  //     return of(taskList);
  //   }
  // };
  let fakeTaskService;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('TaskService', ['getTask', 'addTask']);

    TestBed.configureTestingModule({
      declarations: [TaskContainerComponent, TaskListComponent],
      imports: [ReactiveFormsModule, FormsModule, HttpClientModule],
      providers: [
        { provide: TaskService, useValue: spy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskContainerComponent);
    component = fixture.componentInstance;
    fakeTaskService = fixture.debugElement.injector.get(TaskService) as jasmine.SpyObj<TaskService>;
    fakeTaskService.getTask.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should set title as ' Angular-Component101'`, () => {
    component.title = 'Angular-Component101';
    fixture.detectChanges();

    expect(fixture.debugElement.query(By.css('.header')).nativeElement.textContent)
        .toContain('Angular-Component101');
  });

  it(`should render as task type`, () => {
    component.taskTypes = ['Upcoming Task', 'Completed Task'];
    fixture.detectChanges();

    expect(fixture.debugElement.queryAll(By.css('a')).length).toBe(component.taskTypes.length);
  });


  it('should render 5 app-taks-list component', () => {
    fakeTaskService.getTask.and.returnValue(of(stubTaskList));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.taskList.length).toBe(5);
    expect(fixture.debugElement.queryAll(By.directive(TaskListComponent)).length).toBe(5);
  });

  it('should addTask method of service and set form control value to null', () => {
    const taskCtrl = component.addFormGroup.get('task');
    taskCtrl.setValue('Test Task');
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.btn')).nativeElement;
    btn.click();
    expect(fakeTaskService.getTask).toHaveBeenCalled();
    expect(taskCtrl.value).toBeNull();
  });
});
