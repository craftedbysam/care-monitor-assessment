import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dashboard } from './dashboard';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

describe('Dashboard', () => {
  let component: Dashboard;
  let fixture: ComponentFixture<Dashboard>;
  let authService: AuthService;
  let router: Router;

  const authServiceMock = {
    logout() {},
    getUserEmail() { return ''; }
  }
  const routerMock = {
    navigate() {}
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dashboard],
      providers: [
        { provide: ActivatedRoute, useValue: {} },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dashboard);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create component', () => {
    spyOn(authService, 'getUserEmail').and.returnValue('test@test.com');
    expect(component).toBeTruthy();
  });

  it('should initialize email from auth service on component creation', () => {
    spyOn(authService, 'getUserEmail').and.returnValue('test@test.com');
    const newFixture = TestBed.createComponent(Dashboard);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();
    
    expect(authService.getUserEmail).toHaveBeenCalled();
    expect(newComponent.email).toBe('test@test.com');
  });

  it('should handle empty email from auth service', () => {
    spyOn(authService, 'getUserEmail').and.returnValue('');
    fixture.detectChanges();
    
    expect(component.email).toBe('');
  });

  it('should logout and navigate to login page', () => {
    spyOn(authService, 'getUserEmail').and.returnValue('test@test.com');
    spyOn(router, 'navigate');
    spyOn(authService, 'logout');
    fixture.detectChanges();
    
    component.logout();
    
    expect(authService.logout).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should have logout button that calls logout method', () => {
    spyOn(authService, 'getUserEmail').and.returnValue('test@test.com');
    spyOn(component, 'logout');
    fixture.detectChanges();
    
    const logoutButton = fixture.nativeElement.querySelector('button[color="warn"]');
    logoutButton.click();
    
    expect(component.logout).toHaveBeenCalled();
  });
});
