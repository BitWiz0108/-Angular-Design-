import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerActionComponent } from './answer-action.component';

describe('AnswerActionComponent', () => {
  let component: AnswerActionComponent;
  let fixture: ComponentFixture<AnswerActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswerActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
