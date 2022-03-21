import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginattemptpasswordComponent } from './loginattemptpassword.component';

describe('LoginattemptpasswordComponent', () => {
  let component: LoginattemptpasswordComponent;
  let fixture: ComponentFixture<LoginattemptpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginattemptpasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginattemptpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
