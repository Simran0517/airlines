import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinComponent } from './checkin.component';
// import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('CheckinComponent', () => {
  let component: CheckinComponent;
  let fixture: ComponentFixture<CheckinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckinComponent ],
      imports: [RouterTestingModule,HttpClientTestingModule, HttpTestingController] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
