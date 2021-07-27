import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFlightComponent } from './selected-flight.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SelectedFlightComponent', () => {
  let component: SelectedFlightComponent;
  let fixture: ComponentFixture<SelectedFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ SelectedFlightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
