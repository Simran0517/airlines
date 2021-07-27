import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerDetailsComponent } from './passenger-details.component';
import {RouterTestingModule} from '@angular/router/testing';
describe('PassengerDetailsComponent', () => {
  let component: PassengerDetailsComponent;
  let fixture: ComponentFixture<PassengerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [ PassengerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
