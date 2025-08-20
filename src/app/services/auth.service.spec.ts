import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let httpMock: HttpTestingController;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set', 'delete', 'check', 'get']);

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CookieService, useValue: cookieServiceSpy }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should login successfully and set cookies', () => {
    const email = 'test@test.com';
    const password = 'password123';
    const mockResponse = { user: { email: 'test@test.com' } };

    authService.login(email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
      expect(cookieService.set).toHaveBeenCalledWith('userEmail', 'test@test.com');
      expect(cookieService.set).toHaveBeenCalledWith('isAuthenticated', 'true');
    });

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });
    expect(req.request.withCredentials).toBe(true);

    req.flush(mockResponse);
  });

  it('should handle login error', () => {
    const email = 'test@test.com';
    const password = 'wrongpassword';
    const errorResponse = { message: 'Invalid credentials' };

    authService.login(email, password).subscribe({
      next: () => fail('Expected an error'),
      error: (error) => {
        expect(error.error).toEqual(errorResponse);
        expect(cookieService.set).not.toHaveBeenCalled();
      }
    });

    const req = httpMock.expectOne('/api/login');
    req.flush(errorResponse, { status: 401, statusText: 'Unauthorized' });
  });

  it('should logout and delete cookies', () => {
    authService.logout();

    expect(cookieService.delete).toHaveBeenCalledWith('userEmail');
    expect(cookieService.delete).toHaveBeenCalledWith('isAuthenticated');
  });

  it('should return authentication status from cookies', () => {
    cookieService.check.and.returnValue(true);

    const result = authService.isAuthenticated();

    expect(cookieService.check).toHaveBeenCalledWith('isAuthenticated');
    expect(result).toBe(true);
  });

  it('should return user email from cookies', () => {
    const testEmail = 'test@test.com';
    cookieService.get.and.returnValue(testEmail);

    const result = authService.getUserEmail();

    expect(cookieService.get).toHaveBeenCalledWith('userEmail');
    expect(result).toBe(testEmail);
  });

  it('should return empty string when no email in cookies', () => {
    cookieService.get.and.returnValue('');

    const result = authService.getUserEmail();

    expect(result).toBe('');
  });
});