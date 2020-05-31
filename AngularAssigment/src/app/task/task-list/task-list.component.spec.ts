import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    component.task = { id: 1, name: 'Add test', isCompleted : false};
    fixture.detectChanges();
    debugElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have text rendered as 'Add test'`, () => {
    const element = debugElement.nativeElement;
    expect(element.querySelector('span').textContent).toContain('Add test');
  });

  it(`should rendered checkbox as unchecked`, () => {
    expect(debugElement.query(By.css('input')).properties.checked).toBeFalsy();
  });

  it(`should not rendered checkbox when 'isCheckboxVisible' is set to false`, () => {
    component.isCheckboxVisible = false;
    fixture.detectChanges();
    expect(debugElement.query(By.css('input'))).toBeNull();
  });

  it(`should call onSelected method when checkbox checked`, () => {
    spyOn(component, 'onSelected');

    const input = debugElement.query(By.css('input'));
    input.triggerEventHandler('click', {});
    expect(component.onSelected).toHaveBeenCalledWith(component.task);
  });
});
