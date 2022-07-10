import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionActionComponent } from './question-action.component';

describe('QuestionActionComponent', () => {
  let component: QuestionActionComponent;
  let fixture: ComponentFixture<QuestionActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionActionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
