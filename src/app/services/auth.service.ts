import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private cookieService: CookieService,
    private http: HttpClient
  ) {}

  login(email: string, password: string) {
    return this.http.post('/api/login', { email, password }, {
      withCredentials: true
    }).pipe(
      tap((response: any) => {
        this.cookieService.set('userEmail', response.user.email);
        this.cookieService.set('isAuthenticated', 'true');
      })
    );
  }

  logout() {
    this.cookieService.delete('userEmail');
    this.cookieService.delete('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return this.cookieService.check('isAuthenticated');
  }

  getUserEmail(): string {
    return this.cookieService.get('userEmail') || '';
  }
}
