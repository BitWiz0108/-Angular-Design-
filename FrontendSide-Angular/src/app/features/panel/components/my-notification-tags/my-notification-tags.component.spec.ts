import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyNotificationTagsComponent } from './my-notification-tags.component';

describe('MyNotificationTagsComponent', () => {
  let component: MyNotificationTagsComponent;
  let fixture: ComponentFixture<MyNotificationTagsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyNotificationTagsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyNotificationTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
