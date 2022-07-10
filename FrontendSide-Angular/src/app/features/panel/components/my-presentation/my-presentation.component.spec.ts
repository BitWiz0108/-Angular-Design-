import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPresentationComponent } from './my-presentation.component';

describe('MyPresentationComponent', () => {
  let component: MyPresentationComponent;
  let fixture: ComponentFixture<MyPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
