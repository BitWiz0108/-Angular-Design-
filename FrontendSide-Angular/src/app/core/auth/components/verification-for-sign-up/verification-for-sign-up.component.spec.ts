import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationForSignUpComponent } from './verification-for-sign-up.component';

describe('VerificationForSignUpComponent', () => {
  let component: VerificationForSignUpComponent;
  let fixture: ComponentFixture<VerificationForSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerificationForSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationForSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
