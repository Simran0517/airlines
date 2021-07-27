import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';

import { PassengerServicesComponent } from './passenger-services.component';
import {RouterTestingModule} from '@angular/router/testing';
describe('PassengerServicesComponent', () => {
  let component: PassengerServicesComponent;
  let fixture: ComponentFixture<PassengerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ PassengerServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
