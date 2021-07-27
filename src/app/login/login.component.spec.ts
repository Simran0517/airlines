import { ComponentFixture, TestBed } from '@angular/core/testing';
import{ SocialAuthService} from 'angularx-social-login'
import { LoginComponent } from './login.component';
import {RouterTestingModule} from '@angular/router/testing';
import { from } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule], 
      declarations: [ LoginComponent ],
      providers:[SocialAuthService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
