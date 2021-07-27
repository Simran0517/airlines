import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirlineStaffComponent } from './airline-staff.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthService } from 'angularx-social-login';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AirlineStaffComponent', () => {
  let component: AirlineStaffComponent;
  let fixture: ComponentFixture<AirlineStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirlineStaffComponent ],
      imports:[HttpClientTestingModule,RouterTestingModule],
      providers:[SocialAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirlineStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
