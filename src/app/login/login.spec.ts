import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authService: AuthService
  let router: Router

  const authServiceMock = {
    isAuthenticated() {},
    login() {}
  }
  const routerMock = {
    navigate() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.loginForm.get('email')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should login successfully and navigate to dashboard', () => {
    component.loginForm.patchValue({
      email: 'test@test.com',
      password: 'password123'
    });
    spyOn(router, 'navigate');
    spyOn(authService, 'login').and.returnValue(of({ message: 'Success' }));

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@test.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
    expect(component.loading()).toBe(false);
  });

  it('should set loading state during login process', () => {
    component.loginForm.patchValue({
      email: 'test@test.com',
      password: 'password123'
    });
    spyOn(authService, 'login').and.returnValue(of({ message: 'Success' }));
    
    expect(component.loading()).toBe(false);
    
    component.onSubmit();
    
    expect(component.loading()).toBe(false);
  });

  it('should redirect to dashboard if already authenticated', () => {
    spyOn(authService, 'isAuthenticated').and.returnValue(true);
    spyOn(router, 'navigate');
    const newFixture = TestBed.createComponent(Login);
    newFixture.detectChanges();
    
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
